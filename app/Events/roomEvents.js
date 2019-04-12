const Room = require('../Entity/Room');

module.exports = (socket, globalData) => {

  // Create Room
  socket.on('create room', (req) => {
    if (socket.user) {
      if (!socket.room) {
        socket.user.admin = true;

        socket.room = new Room(req.name);
        socket.room.addUser(socket.user);
        socket.room.public = req.publicVisibility;
        socket.room.password = req.password;
        socket.room.timer = req.time;
        socket.room.nbUsersMax = req.nbUsersMax;

        globalData.roomList.push(socket.room);
        socket.emit('create room:response', {success: true, response: socket.room.toResult()});
        console.log("User " + socket.user.userName + " created the room " + socket.room.name + " and set public to " + req.publicVisibility + " with token " + socket.room.tokenId + ".");
      } else {
        socket.emit('create room:response', {success: false, response: 'You are already in a room.'});
      }
    } else {
      socket.emit('create room:response', {success: false, response: 'You are not logged in.'});
    }
  });

  // Join Room if the user has been created and he is not already in a room.
  socket.on('join room', (req) => {
    if (socket.user && !socket.room) {
      let room = globalData.roomList.find((roomFind) => {
        return roomFind.tokenId === req.token;
      });
      if (room && (room.public || room.password === req.password) && room.started === false) {
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
        console.log("Room " + req.token + " does not exists");
        console.log(globalData.roomList);
        socket.emit('join room:response', {success: false, response: 'Room ' + req.token + ' does not exists.'});
      } else {
        socket.emit('join room:response', {success: false, response: 'Bad password or room already started.'});
      }
    } else {
      socket.emit('join room:response', {success: false, response: 'You are already in a room or not logged in.'});
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

  // Leave room
  socket.on('leave room', () => {
    if (socket.user && socket.room) {
      socket.room.removeUser(socket.user);
      socket.room = null;
      socket.user.admin = false;
      socket.emit('leave room:response', {success: true, response: "You were removed."});
    } else {
      socket.emit('leave room:response', {success: false, response: "You are not logged in or not in a room."});
    }
  });

  // Get special Room
  socket.on('get room', (req) => {
    let room = globalData.roomList.find((roomFind) => {
      return roomFind.tokenId === req.tokenId;
    });
    if (room === null) {
      socket.emit('get room:response', {success: false, response: 'Room not found.'});
    } else {
      socket.emit('get room:response', {success: true, response: room.toResult()});
    }
  });

};
