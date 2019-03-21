/**
 * User object.
 */
class User {
    constructor(userName, socket) {
        this._userName = userName;
        this._admin = false;
        this._socket = socket;
    }

    /**
     * Get the socket id.
     * @returns {socket}
     */
    get socket() {
        return this._socket;
    }

    /**
     * Set the socket to the user.
     * @param socket the socket id.
     */
    set socket(socket) {
        this._socket = socket;
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
        admin: this._admin
      };
    }
}

module.exports = User;
