const {placeList, startingPosition} = require("./PlaceConstant");

/**
 * Map object.
 */
class Map {
  constructor() {
    this._territotyList = [];
    placeList.forEach((place) => {
      this._territotyList.add(new Territory(place.key, place.fullName, place.country, place.type));
    });
  }

  get territoties() {
    return this._territotyList;
  }

  toResult() {
    let territories = [];
    this._territotyList.forEach((territory) => {
      territories.add(territory.toResult());
    });
    return {
      map: territories
    }
  }
}
