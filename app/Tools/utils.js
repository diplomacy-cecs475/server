module.exports = {
  sendAll(globalData, route, data) {
    globalData.listUsers.forEach((user) => {
      user.socket.emit(route, data);
    });
  },

  sendAllRoom(globalData) {
    let roomList = [];
    globalData.roomList.forEach(function (room) {
      roomList.push(room.toResult());
    });
    this.sendAll(globalData, 'update room:event', roomList);
  },

  startGameRoomEvent(room) {
    room.users.forEach(function (user) {
      user.socket.emit('start game:event', room.toResult());
    });
  }
};
