const Room = require('../Entity/Room');

module.exports = (socket, globalData) => {

  // Create Room
  socket.on('create room', (name, publicVisibility, password) => {
    if (socket.user) {
      if (!socket.room) {
        socket.user.admin = true;

        socket.room = new Room(name);
        socket.room.addUser(socket.user);
        socket.room.public = publicVisibility;
        socket.room.password = password;

        globalData.roomList.push(socket.room);
        socket.emit('create room:response', {success: true, response: socket.room.toResult()});
        console.log("User " + socket.user.userName + " created the room " + socket.room.name + " and set public to " + publicVisibility + " with token " + socket.room.tokenId + ".");
      } else {
        socket.emit('create room:response', {success: false, response: 'You are already in a room.'});
      }
    } else {
      socket.emit('create room:response', {success: false, response: 'You are not logged in.'});
    }
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
          socket.emit('join room:response', {success: true, response: socket.room.toResult()});
          console.log("User " + socket.user.userName + " joined the room " + socket.room.name + ".");
        }
        catch (e) {
          console.log(e);
          socket.emit('join room:response', {success: false, response: e});
        }
      } else if (!room) {
        console.log("Room " + token + " does not exists");
        console.log(globalData.roomList);
        socket.emit('join room:response', {success: false, response: 'Room ' + token + ' does not exists.'});
      } else {
        socket.emit('join room:response', {success: false, response: 'Bad password or room already started.'});
      }
    }
  });

  // Create Room
  socket.on('list room', () => {
    let roomList = [];
    globalData.roomList.forEach(function (room) {
      roomList.push(room.toResult());
    });
    socket.emit('list room:response', {success: true, response: roomList});
  });
};
