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
  },

  ordersSentEvent(room) {
    let userList = [];
    room.users.forEach(function (user) {
      userList.push(user.toResult());
    });

    room.users.forEach(function (user) {
      user.socket.emit('orders sent:event', userList);
    });
  },

  roundEvent(room) {
    room.users.forEach(function (user) {
      user.socket.emit('round:event', room.toResult());
    });
  }
};
