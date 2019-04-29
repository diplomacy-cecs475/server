const {placeList, startingPosition} = require("./PlaceConstant");
const Territory = require("./Territory");

/**
 * MapGame object.
 */
class MapGame {
  constructor() {
    this._territotyList = [];
    placeList.forEach((place) => {
      this._territotyList.push(new Territory(place.key, place.fullName, place.country, place.type));
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
    return {
      map: territories
    }
  }
}

module.exports = MapGame;
