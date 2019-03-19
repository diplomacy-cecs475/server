const User = require('../Entity/User');

module.exports = (socket, globalData) => {

  // when the client emits 'add user', this listens and executes
  socket.on('add user', (username) => {
    if (socket.user) return;
    ++globalData.nbUsers;
    socket.user = new User(username);
    socket.emit('login', {
      nbUsers: globalData.nbUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.user.userName,
      nbUsers: globalData.nbUsers
    });
    console.log(`New user ${socket.id}: ${socket.user.userName}`);
    console.log(globalData.roomList);
  });

  // Client disconnect
  socket.on('disconnect', () => {
    if (socket.user) {
      if (socket.room) {
        // If the room has only one user, we are removing the room.
        if (socket.room.users.length === 1) {
          var roomIdx = globalData.roomList.indexOf(socket.room);
          if (roomIdx !== -1) {
            globalData.roomList.splice(roomIdx, 1);
          }
          console.log(globalData.roomList);
        } else if (socket.user.admin) {
          // TODO: Set the next user to admin.
        }
      }
      --globalData.nbUsers;
      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.user.userName,
        nbUsers: globalData.nbUsers
      });
      console.log(`Logout   ${socket.id}: ${socket.user.userName}`);
    }
  });
}
