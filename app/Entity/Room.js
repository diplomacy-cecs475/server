const MAX_USER_PER_ROOM = 7;
const LENGTH_TOKEN = 5;

/**
 * Room object.
 */
class Room {
  constructor(name) {
    this._tokenId = Room.generateTokenId();
    this._users = [];
    this._nbUsersMax = MAX_USER_PER_ROOM;
    this._map = [];
    this._public = true;
    this._password = null;
    this._roundNumber = 0;
    this._name = name;
    this._timer = 15;
    this._started = false;
  }

  get started() {
    return this._started;
  }

  start() {
    this._started = true;
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
   * @param pPublic true if the room will be public.
   */
  set public(pPublic) {
    this._public = pPublic;
  }

  /**
   * Get the number of users max to the room.
   * @returns {int}
   */
  get nbUsersMax() {
    return this._nbUsersMax;
  }

  /**
   * Set the number of users max.
   * @param nbUsersMax integer.
   */
  set nbUsersMax(nbUsersMax) {
    this._nbUsersMax = nbUsersMax;
  }

  /**
   * Get the time of each round.
   * @returns {int}
   */
  get timer() {
    return this._timer;
  }

  /**
   * Set the time for each round.
   * @param time integer.
   */
  set timer(time) {
    this._timer = time;
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
    if (this._users.length >= this._nbUsersMax) {
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

  toResult() {
    let users = [];
    this._users.forEach(function (user) {
      users.push(user.toResult())
    });

    return {
      name: this._name,
      tokenId: this._tokenId,
      roundNumber: this._roundNumber,
      started: this._started,
      nbUsersMax: this._nbUsersMax,
      admin: this.getAdminUser().toResult(),
      public: this._public,
      timer: this._timer,
      users: users,
    };
  }
}


module.exports = Room;
