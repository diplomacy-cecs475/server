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
      socket.emit('create room:response', socket.room.toResult());
    }
    console.log("User " + socket.user.userName + " created the room " + socket.room.name + " and set public to " + publicVisibility + " with token " + socket.room.tokenId + ".");
  });

  // Join Room if the user has been created and he is not already in a room.
  socket.on('join room', (token, password) => {
    if (socket.user && !socket.room) {
      let room = globalData.roomList.find((roomFind) => {
        return roomFind.tokenId === token;
      });
      if (room && (room.public || room.password === password) && room.started === false) {
        try {
          room.addUser(socket.user);
          socket.room = room;
          socket.emit('join room:response', socket.room.toResult());
          console.log("User " + socket.user.userName + " joined the room " + socket.room.name + ".");
        }
        catch (e) {
          socket.emit(e);
          console.log(e);
        }
      } else if (!room) {
        console.log("Room " + token + " does not exists");
        console.log(globalData.roomList);
      }
    }
  });

  // Create Room
  socket.on('list room', () => {
    let roomList = [];
    globalData.roomList.forEach(function (room) {
      roomList.push(room.toResult());
    });
    socket.emit('list room:response', roomList);
  });
};
