const Room = require('../Entity/Room');

module.exports = (socket, globalData) => {

  // Create Room
  socket.on('create room', (name, publicVisibility, password) => {
    if (socket.user) {
      socket.user.admin = true;

      socket.room = new Room(name);
      socket.room.addUser(socket.user);
      socket.room.public = publicVisibility;
      socket.room.password = password;

      globalData.roomList.push(socket.room);
    }
    console.log(globalData.roomList);
  });
}
