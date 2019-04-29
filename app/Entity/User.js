const LENGTH_TOKEN = 10;

/**
 * User object.
 */
class User {
  constructor(userName, socket) {
    this._userName = userName;
    this._admin = false;
    this._socket = socket;
    this._tokenId = User.generateTokenId();
    this._country = null;
  }

  /**
   * Get the socket id.
   * @returns {socket}
   */
  get socket() {
    return this._socket;
  }

  /**
   * Generates a random token of size LENGTH_TOKEN using numbers 0-9 and letters a-z.
   * @returns {string}
   */
  static generateTokenId() {
    return Math.random().toString(36).substr(2, LENGTH_TOKEN);
  }

  /**
   * Set the socket to the user.
   * @param socket the socket id.
   */
  set socket(socket) {
    this._socket = socket;
  }

  /**
   * Get the country name.
   * @returns {string}
   */
  get country() {
    return this._country;
  }

  /**
   * Set the country.
   * @param pCountry
   */
  set country(pCountry) {
    this._country = pCountry;
  }

  /**
   * Get true if the user is admin.
   * @returns {boolean}
   */
  get admin() {
    return this._admin;
  }

  /**
   * Set the role.
   * @param pAdmin
   */
  set admin(pAdmin) {
    this._admin = pAdmin;
  }

  /**
   * Get the token id.
   * @returns {string|*}
   */
  get tokenId() {
    return this._tokenId;
  }

  /**
   * Get the user name.
   * @returns {string}
   */
  get userName() {
    return this._userName;
  }

  /**
   * Set the user name.
   * @param userName
   */
  set userName(userName) {
    this._userName = userName;
    console.log("User name set to " + userName);
  }

  toResult() {
    return {
      username: this._userName,
      admin: this._admin,
      tokenId: this._tokenId,
      country: this._country
    };
  }
}

module.exports = User;
