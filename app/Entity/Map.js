/**
 * Room object.
 */
class Map {
  constructor(position, user, troop) {
    this._position = position;
    this._user = user;
    this._troop = troop;
  }
  /**
   * returns position of territory
   */

  get position() {
    return this._position;
  }
  /**
   *changes the user who owns the territory
   */
  set user(user) {
    this._user = user;
  }
  /**
   * returns user who owns territory
   */
  get user() {
    return this._user;
  }
  /**
   *sets troop type as fleet or army depending on the territory or null if territory has no troop here.
   */
  set troop(troop) {
    this._troop = troop;
  }
  /**
   * returns troop type
   */
  get troop() {
    return this._troop;
  }
}
