module.exports = (socket, globalData) => {

  // Send a private message to someone on the room.
  socket.on('msg to', (username, msg) => {
    if (socket.user) {
      let userTarget = socket.room.users.find(function (user) {
        return user.username === username;
      });
      if (userTarget) {
        userTarget.socket.emit('msgPriv', {userFrom: socket.user.userName, msg: msg});
      }
    }
  });

  // Send a message to all the users in the channel.
  socket.on('msg global', (msg) => {
    if (socket.user) {
      socket.room.users.forEach(function(user) {
        if (user !== socket.user) {
          user.socket.emit('msgGlobal', {userFrom: socket.user.userName, msg: msg});
        }
      });
    }
  });
};
