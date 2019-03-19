const MAX_USER_PER_ROOM = 7;
const LENGTH_TOKEN = 5;

/**
 * Room object.
 */
class Room {
  constructor(name) {
    this._tokenId = Room.generateTokenId();
    this._users = [];
    this._map = [];
    this._public = true;
    this._password = null;
    this._roundNumber = 0;
    this._name = name;
  }

  destructor() {
    delete this._tokenId;
    delete this._users;
    delete this._map;
    delete this._visibility;
    delete this._password;
    delete this._roundNumber;
  }

  /**
   * Add a round number.
   */
  plusRoundNumber() {
    this._roundNumber += 1;
  }

  /**
   * Get the round number.
   * @returns {number}
   */
  get roundNumber() {
    return this._roundNumber;
  }

  /**
   * Get the name of the room.
   * @returns {string}
   */
  get name() {
    return this._name;
  }

  /**
   * Set the name.
   * @param name
   */
  set name(name) {
    this._name = name;
  }

  /**
   * Get the password to enter in this room if the visibility is private.
   * @returns {string}
   */
  get password() {
    return this._password;
  }

  /**
   * Set the password.
   * @param password
   */
  set password(password) {
    this._password = password;
  }

  /**
   * Get the visibility, public or private room.
   * @returns {boolean}
   */
  get public() {
    return this._public;
  }

  /**
   * Set the visibility.
   * Throw if the visibility does not exists.
   * @param pPublic true if the room will be public.
   */
  set public(pPublic) {
    this._public = pPublic;
  }

  /**
   * Get token id.
   * @returns {string|*}
   */
  get tokenId() {
    return this._tokenId;
  }

  /**
   * Generates a random token of size LENGTH_TOKEN using numbers 0-9 and letters a-z.
   * @returns {string}
   */
  static generateTokenId() {
    return Math.random().toString(36).substr(2, LENGTH_TOKEN).toUpperCase();
  }

  /**
   * Get all users.
   * @returns {Array}
   */
  get users() {
    return this._users;
  }

  /**
   * Add an user already initialized.
   * Throw if there is too many user inside the room.
   * @param user the user.
   */
  addUser(user) {
    if (this._users.length >= MAX_USER_PER_ROOM) {
      throw "Too many user in this room.";
    }
    this._users.push(user);
  }

  removeUser(username) {
    // TODO: Remove user by username.
    // If the user is admin, we need to pass the role to someone else.
    // If no user, throw an error.
    if (username === roleUserEnum.ADMIN) {
      this._users.splice(list.indexOf(username), 1);
      this._users[0] = roleUserEnum.ADMIN;
    }
    else if (!this._users.includes(username)) {
      throw "User does not exist";
    }
    else {
      this._users.splice(list.indexOf(username), 1);
    }
  }

  /**
   * Get the user admin.
   * @returns {User}
   */
  getAdminUser() {
    return this._users.find(function (user) {
      return user.admin === true;
    });
  }
}


module.exports = Room;
