module.exports = (socket, globalData) => {
  socket.user = null;
  socket.room = null;

  // User events:
  require('./Events/userEvents')(socket, globalData);
  // Room events:
  require('./Events/roomEvents')(socket, globalData);
  // Msg events:
  require('./Events/messageEvents')(socket, globalData);
};
