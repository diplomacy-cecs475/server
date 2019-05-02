const {placeList, startingPosition} = require("./PlaceConstant");
const Territory = require("./Territory");

/**
 * MapGame object.
 */
class MapGame {
  constructor(users) {
    this._users = users;
    this._territotyList = [];
    placeList.forEach((place) => {
      this._territotyList.push(new Territory(place.key, place.fullName, place.country, place.type));
    });
    this.giveTerritoryToUsers(users);
  }

  giveTerritoryToUsers() {
    let myStartingPosition = startingPosition.slice(0);

    this._users.forEach((user) => {
      let rand = Math.floor(Math.random() % myStartingPosition.length);
      let item = myStartingPosition[rand];
      myStartingPosition.splice(rand, 1);
      user.country = item.country;
      console.log("Room " + user.socket.room.name + " - Player " + user.userName + " got the country " + item.country);
      item.city.forEach((city) => {
        console.log("Room " + user.socket.room.name + " - Player " + user.userName + " got the country " + item.country + " with the city " + city.key);
        this.setUserToTerritory(city.key, user.userName, city.army, city.fleet);
      });
    });
  }

  setUserToTerritory(territoryKey, user, army, fleet) {
    this._territotyList.forEach((territory) => {
      if (territory.key === territoryKey) {
        territory.user = user;
        territory.fleet = fleet;
        territory.army = army;
      }
    });
  }

  getTerritoryInfo(territoryKey) {
    return this._territotyList.find((territory) => {
      if (territory.key === territoryKey) {
        return territory;
      }
    });
  }

  executeOrders() {
    this._users.forEach((user) => {
      if (user.orders !== null) {
        user.orders.forEach((order) => {
          let territoryFromInfo = this.getTerritoryInfo(order.from);
          let territoryToInfo = this.getTerritoryInfo(order.to);
          if (!territoryFromInfo || !territoryToInfo || territoryFromInfo.user !== user.userName) {
            return ;
          }
          switch (order.type) {
            case 'attack':
              if (territoryFromInfo.units.army) {
                console.log("[Attack] User " + user.userName + " from " + territoryFromInfo.key + " attacked " + territoryToInfo.key);
                territoryToInfo.user = user.userName;
                territoryFromInfo.army = false;
                territoryToInfo.army = true;
              } else {
                console.error("[Attack] User " + user.userName + " from " + territoryFromInfo.key + " attacked " + territoryToInfo.key + " but he has no army in the territory.");
              }
              break;

            case 'support':
              console.log("[Support] User " + user.userName + " from " + territoryFromInfo.key + " attacked " + territoryToInfo.key);
              break;

            case 'convoy':
              if (territoryFromInfo.units.fleet) {
                console.log("[Convoy] User " + user.userName + " from " + territoryFromInfo.key + " attacked " + territoryToInfo.key);
                territoryToInfo.user = user.userName;
                territoryFromInfo.fleet = false;
                territoryToInfo.fleet = true;
              } else {
                console.error("[Convoy] User " + user.userName + " from " + territoryFromInfo.key + " attacked " + territoryToInfo.key + " but he has no fleet in the territory.");
              }
              break;
          }
        });
        user.orders = null;
      }
    });
  }

  get territoties() {
    return this._territotyList;
  }

  toResult() {
    let territories = [];
    this._territotyList.forEach((territory) => {
      territories.push(territory.toResult());
    });
    return territories;
  }
}

module.exports = MapGame;
