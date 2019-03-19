const MAX_USER_PER_ROOM = 7;
const LENGTH_TOKEN = 5;

const visibilityRoomEnum = {
  PUBLIC: 1,
  PRIVATE: 2,
};

/**
 * Room object.
 */
class Room {
  constructor() {
    this._tokenId = Room.generateTokenId();
    this._users = [];
    this._map = [];
    this._visibility = visibilityRoomEnum.PUBLIC;
    this._password = null;
    this._roundNumber = 0;
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
   * @returns {number|*}
   */
  get visibility() {
    return this._visibility;
  }

  /**
   * Set the visibility.
   * Throw if the visibility does not exists.
   * @param visibility
   */
  set visibility(visibility) {
    if (visibility in visibilityRoomEnum) {
      this._visibility = visibility;
      console.log("Visibility is set to " + visibility + ".");
    } else {
      throw "Visibility does not exist.";
    }
  }

  /**
   * Get token id.
   * @returns {string|*}
   */
  get tokenId() {
    return this._tokenId;
  }

  /**
   * Generates a random token of size LENGTH_TOKEN.
   * @returns {string}
   */
  static generateTokenId() {
    //generate a random 5 char length string token using numbers 0-9 and letters a-z
    return Math.random().toString(36).substr(0, 5);
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
    if (this._users.count() >= MAX_USER_PER_ROOM) {
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
      return user === roleUserEnum.ADMIN;
    });
  }
}
