const User = require('../Entity/User');

module.exports = (socket, globalData) => {

  // Add user to the list with an user name.
  socket.on('add user', (username) => {
    if (!socket.user) {
      ++globalData.nbUsers;
      socket.user = new User(username, socket);
      socket.emit('add user:response', socket.user.toResult());
      console.log(`New user ${socket.id}: ${socket.user.userName}`);
    }
  });

  // If admin, can kick other player.
  socket.on('kick user', (username) => {
    if (socket.user && socket.room && socket.user.admin) {
      let userTarget = socket.room.users.find(function (user) {
        return user.username === username;
      });
      if (userTarget) {
        userTarget.socket.emit('kicked');
        userTarget.socket.room = null;
        socket.room.removeUser(username);
        socket.emit('kick user:response', socket.room.toResult());
      }
    }
  });

  // If admin, can delegate the role to another player.
  socket.on('delegate role', (username) => {
    if (socket.user && socket.room && socket.user.admin) {
      let userTarget = socket.room.users.find(function (user) {
        return user.username === username;
      });
      if (userTarget) {
        userTarget.socket.emit('delegated', socket.room.toResult());
        userTarget.socket.user.admin = true;
        socket.user.admin = false;
        socket.emit('delegate role:response', socket.room.toResult());
      }
    }
  });

  // Client disconnect
  socket.on('disconnect', () => {
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
  });
};
