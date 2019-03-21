const User = require('../Entity/User');

module.exports = (socket, globalData) => {

  // Add user to the list with an user name.
  socket.on('add user', (username) => {
    if (!socket.user) {
      ++globalData.nbUsers;
      socket.user = new User(username, socket);
      console.log(`New user ${socket.id}: ${socket.user.userName}`);
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
