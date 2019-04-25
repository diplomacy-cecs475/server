const User = require('../Entity/User');
let utils = require('../Tools/utils');

module.exports = (socket, globalData) => {

  // Add user to the list with an user name.
  socket.on('add user', (req) => {
    if (!socket.user) {
      let userByUsername = globalData.listUsers.find(function (user) {
        return user.username === req.username;
      });
      if (!userByUsername) {
        ++globalData.nbUsers;
        socket.user = new User(req.username, socket);
        socket.emit('add user:response', {code: req.code, success: true, response: socket.user.toResult()});
        console.log(`[Add User] New user ${socket.id}: ${socket.user.userName}.`);
        globalData.listUsers.push(socket.user);
      } else {
        socket.emit('add user:response', {code: req.code, success: false, response: 'Username already exists.'});
        console.error("[Add User] Socket " + socket.id + " wanted to user the username " + req.username + " but it is already existing.");
      }
    } else {
      socket.emit('add user:response', {code: req.code, success: true, response: socket.user.toResult()});
      console.log("[Add User] Socket " + socket.id + " used this command but he is already logged in as " + socket.user.userName + ".");
    }
  });

  // Reconnect user if the socket has disconnected.
  socket.on('reconnect user', (req) => {
    let userByToken = globalData.listUsers.find(function (user) {
      return user.tokenId === req.tokenId;
    });
    if (userByToken) {
      socket.room = userByToken.socket.room;
      socket.user = userByToken;
      userByToken.socket = socket;
      socket.emit('reconnect user:response', {code: req.code, success: true, response: socket.user.toResult()});
      console.log(`[Reconnect user] User ${socket.id}: ${socket.user.userName} reconnected.`);
    } else {
      socket.emit('reconnect user:response', {code: req.code, success: false, response: 'Token does not exists.'});
      console.error("[Reconnect user] User " + socket.id + " want to reconnect with token " + req.tokenId  + " but it did not exists.");
    }
  });

  // If admin, can kick other player.
  socket.on('kick user', (req) => {
    if (socket.user && socket.room && socket.user.admin) {
      let userTarget = socket.room.users.find(function (user) {
        return user.username === req.username;
      });
      if (userTarget) {
        userTarget.socket.emit('kicked');
        userTarget.socket.room = null;
        socket.room.removeUser(req.username);
        socket.emit('kick user:response', {code: req.code, success: true, response: socket.room.toResult()});
        utils.sendAllRoom(globalData);
        console.log("[Kick User] User admin " + socket.user.userName + " from the room " + socket.room.name + " kicked the user " + userTarget.userName + ".");
      } else {
        socket.emit('kick user:response', {code: req.code, success: false, response: 'No user found.'});
        console.error("[Kick User] User admin " + socket.user.userName + " from the room " + socket.room.name + " want to kick the user " + req.username + " but he was not found.");
      }
    } else {
      socket.emit('kick user:response', {code: req.code, success: false, response: 'You do not have enough rights.'});
      console.error("[Kick User] User " + socket.id + " does not have enough rights to kick a player.");
    }
  });

  // Client disconnect
  socket.on('disconnect', () => {
    /*
    if (socket.user) {
      if (socket.room) {
        // If the room has only one user, we are removing the room.
        if (socket.room.users.length === 1) {
          let roomIdx = globalData.roomList.indexOf(socket.room);
          if (roomIdx !== -1) {
            globalData.roomList.splice(roomIdx, 1);
          }
        } else if (socket.user.admin) {
          // TODO: Set the next user to admin.
        }
      }
      --globalData.nbUsers;
      console.log(`Logout   ${socket.id}: ${socket.user.userName}`);
    }
  */
  });
};
