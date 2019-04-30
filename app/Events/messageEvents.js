module.exports = (socket, globalData) => {

  // Send a private message to someone on the room.
  socket.on('msg to', (req) => {
    if (socket.user && socket.room && socket.room.users) {
      let userTarget = socket.room.users.find((user) => {
        return user.userName === req.username;
      });
      if (userTarget) {
        userTarget.socket.emit('msgPriv', {userFrom: socket.user.userName, msg: req.msg});
        console.log("[Msg priv] " + socket.user.userName + " sent a message to " + req.username + ": " + req.msg);
      } else {
        console.error("[Msg priv] " + socket.user.userName + " try to send a message to user " + req.username + " but he does not exists.");
      }
    } else {
      console.error("[Msg priv] " + socket.id + " tried to send a message to user " + req.username + " but there is a problem with the room or user.");
    }
  });

  // Send a message to all the users in the channel.
  socket.on('msg global', (req) => {
    if (socket.user && socket.room && socket.room.users) {
      socket.room.users.forEach((user) => {
        if (user !== socket.user) {
          user.socket.emit('msgGlobal', {userFrom: socket.user.userName, msg: req.msg});
          console.log("[Msg global] " + socket.user.userName + " sent a message to room " + socket.room.name  + ": " + req.msg);
        }
      });
    } else {
      console.error("[Msg priv] " + socket.id + " tried to send a message to user " + req.username + " but there is a problem with the room or user.");
    }
  });
};
