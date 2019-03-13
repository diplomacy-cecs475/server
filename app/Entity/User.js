/**
 * A user can be a simple player or an admin.
 * @type {{PLAYER: number, ADMIN: number}}
 */
const roleUserEnum = {
  PLAYER: 1,
  ADMIN: 2,
};

/**
 * User object.
 */
class User {
    constructor(userName) {
        this._userName = userName;
        this._role = roleUserEnum.PLAYER;
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
     * Get the role.
     * @returns {number|*}
     */
    get role() {
        return this._role;
    }

    /**
     * Set the role.
     * @param role
     */
    set role(role) {
        if (role === roleUserEnum.PLAYER || role === roleUserEnum.ADMIN) {
            this._role = role;
            console.log("Role " + role + " defined to the user.");
        } else {
            throw "Role does not exist.";
        }
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
