module.exports = (socket, globalData) => {

  // Send a private message to someone on the room.
  socket.on('msg to', (req) => {
    if (socket.user) {
      let userTarget = socket.room.users.find(function (user) {
        return user.username === req.username;
      });
      if (userTarget) {
        userTarget.socket.emit('msgPriv', {userFrom: socket.user.userName, msg: req.msg});
      }
    }
  });

  // Send a message to all the users in the channel.
  socket.on('msg global', (req) => {
    if (socket.user) {
      socket.room.users.forEach(function(user) {
        if (user !== socket.user) {
          user.socket.emit('msgGlobal', {userFrom: socket.user.userName, msg: req.msg});
        }
      });
    }
  });
};
