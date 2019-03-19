/**
 * User object.
 */
class User {
    constructor(userName) {
        this._userName = userName;
        this._admin = false;
    }

    /**
     * Get the socket id.
     * @returns {string}
     */
    get socketId() {
        return this._socketId;
    }

    /**
     * Set the socket id to the user.
     * @param socketId the socket id.
     */
    set socketId(socketId) {
        this._socketId = socketId;
        console.log("New Socket id is: " + value);
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
}

module.exports = User;
