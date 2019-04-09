const User = require('../Entity/User');

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
        socket.emit('add user:response', {success: true, response: socket.user.toResult()});
        console.log(`New user ${socket.id}: ${socket.user.userName}.`);
        globalData.listUsers.push(socket.user);
      } else {
        socket.emit('add user:response', {success: false, response: 'Username already exists.'});
      }
    } else {
      socket.emit('add user:response', {success: true, response: socket.user.toResult()});
    }
  });

  // Reconnect user if the socket has disconnected.
  socket.on('reconnect user', (req) => {
    let userByToken = globalData.listUsers.find(function (user) {
      return user.tokenId === req.tokenId;
    });
    if (userByToken) {
      userByToken.socket = socket;
      socket.user = userByToken;
      socket.emit('reconnect user:response', {success: true, response: socket.user.toResult()});
      console.log(`User ${socket.id}: ${socket.user.userName} reconnected.`);
    } else {
      socket.emit('reconnect user:response', {success: false, response: 'Token does not exists.'});
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
        socket.emit('kick user:response', {success: true, response: socket.room.toResult()});
      } else {
        socket.emit('kick user:response', {success: false, response: 'No user found.'});
      }
    } else {
      socket.emit('kick user:response', {success: false, response: 'You do not have enough right.'});
    }
  });

  // If admin, can delegate the role to another player.
  socket.on('delegate role', (req) => {
    if (socket.user && socket.room && socket.user.admin) {
      let userTarget = socket.room.users.find(function (user) {
        return user.username === req.username;
      });
      if (userTarget) {
        userTarget.socket.emit('delegated', socket.room.toResult());
        userTarget.socket.user.admin = true;
        socket.user.admin = false;
        socket.emit('delegate role:response', {success: true, response: socket.room.toResult()});
      } else {
        socket.emit('delegate user:response', {success: false, response: 'No user found.'});
      }
    } else {
      socket.emit('delegate user:response', {success: false, response: 'You do not have enough right.'});
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
