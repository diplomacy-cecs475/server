const {placeList, startingPosition} = require("./PlaceConstant");
const Territory = require("./Territory");

/**
 * MapGame object.
 */
class MapGame {
  constructor(users) {
    this._territotyList = [];
    placeList.forEach((place) => {
      this._territotyList.push(new Territory(place.key, place.fullName, place.country, place.type));
    });
    this.giveTerritoryToUsers(users);
  }

  giveTerritoryToUsers(users) {
    let myStartingPosition = startingPosition.slice(0);

    users.forEach((user) => {
      let rand = Math.floor(Math.random() % myStartingPosition.length);
      let item = myStartingPosition[rand];
      myStartingPosition.splice(rand, 1);
      user.country = item.country;
      console.log("Room " + user.socket.room.name + " - Player " + user.userName + " got the country " + item.country);
      item.city.forEach((city) => {
        console.log("Room " + user.socket.room.name + " - Player " + user.userName + " got the country " + item.country + " with the city " + city);
        this.setUserToTerritory(city, user.userName, true, false);
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
