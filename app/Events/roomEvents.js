const Room = require('../Entity/Room');
let utils = require('../Tools/utils');

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
        socket.emit('create room:response', {code: req.code, success: true, response: socket.room.toResult()});
        utils.sendAllRoom(globalData);
        console.log("[Create Room] User " + socket.user.userName + " created the room " + socket.room.name + " and set public to " + req.publicVisibility + " with token " + socket.room.tokenId + ".");
      } else {
        socket.emit('create room:response', {code: req.code, success: false, response: 'You are already in a room.'});
        console.error("[Create Room] User " + socket.user.userName + " is already in the room " + socket.room.name + ".");
      }
    } else {
      socket.emit('create room:response', {code: req.code, success: false, response: 'You are not logged in.'});
      console.error("[Create Room] User " + socket.id + " did not command 'add user'.");
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
          socket.emit('join room:response', {code: req.code, success: true, response: socket.room.toResult()});
          utils.sendAllRoom(globalData);
          console.log("[Join Room] User " + socket.user.userName + " joined the room " + socket.room.name + ".");
        }
        catch (e) {
          socket.emit('join room:response', {code: req.code, success: false, response: e});
          console.error("[Join Room] User " + socket.user.userName + "wants to join the room " + room.name + " but fails because: " + e);
        }
      } else if (!room) {
        socket.emit('join room:response', {code: req.code, success: false, response: 'Room ' + req.token + ' does not exists.'});
        console.error("[Join Room] User " + socket.user.userName + " tried to enter in the room " + req.token + " but the room does not exists.");
      } else {
        socket.emit('join room:response', {code: req.code, success: false, response: 'Bad password or room already started.'});
        console.error("[Join Room] User " + socket.user.userName + " tried to enter in the room " + req.token + " but the password does not match or the room has already started.");
      }
    } else if (!socket.user) {
      socket.emit('join room:response', {code: req.code, success: false, response: "You are not logged in or not in a room."});
      console.error("[Join room] User " + socket.id + " did not command 'add user'.");
    } else if (socket.room) {
      socket.emit('join room:response', {code: req.code, success: false, response: "You are already in a room."});
      console.error("[Join room] User " + socket.user.userName + " is already in the room " + socket.room.name + ".");
    }
  });

  // Create Room
  socket.on('list room', (req) => {
    let roomList = [];
    globalData.roomList.forEach(function (room) {
      roomList.push(room.toResult());
    });
    socket.emit('list room:response', {code: req.code, success: true, response: roomList});
    console.log("[List Room] Socket " + socket.id + " asked for the list of room.");
  });

  // Leave room
  socket.on('leave room', (req) => {
    if (socket.user && socket.room) {
      let currentRoom = socket.room;
      console.log("[Leave room] User " + socket.user.userName + " left the room " + socket.room.name + ".");
      socket.room.removeUser(socket.user);
      socket.room = null;
      socket.user.admin = false;
      socket.emit('leave room:response', {code: req.code, success: true, response: "You were removed."});
      if (currentRoom.users.length === 0) {
        console.log("[Leave room] After " + socket.user.userName + " left the game, we must remove the room " + currentRoom.name + " because there is no more user inside.");
        let roomIdx = globalData.roomList.findIndex((obj) => {
          return obj === currentRoom;
        });
        if (roomIdx !== -1) {
          globalData.roomList.splice(roomIdx, 1);
        }
      }
      utils.sendAllRoom(globalData);
    } else if (!socket.user) {
      socket.emit('leave room:response', {code: req.code, success: false, response: "You are not logged in or not in a room."});
      console.error("[Leave room] User " + socket.id + " did not command 'add user'.");
    } else if (!socket.room) {
      socket.emit('leave room:response', {code: req.code, success: false, response: "You are not in a room."});
      console.error("[Leave room] User " + socket.user.userName + " is not on a room.");
    }
  });

  // Get special Room
  socket.on('get room', (req) => {
    let room = globalData.roomList.find((roomFind) => {
      return roomFind.tokenId === req.token;
    });
    if (!room) {
      socket.emit('get room:response', {code: req.code, success: false, response: 'Room not found.'});
      console.error("[Get Room] Room with id " + req.token + " does not exists.");
    } else {
      socket.emit('get room:response', {code: req.code, success: true, response: room.toResult()});
      console.log("[Get Room] Send the room id:" + req.token + " " + room.toResult());
    }
  });

  // If admin, can delegate the role to another player.
  socket.on('delegate role', (req) => {
    if (socket.user && socket.room && socket.user.admin) {
      let userTarget = socket.room.users.find(function (user) {
        return user.username === req.username;
      });
      if (userTarget) {
        userTarget.socket.emit('delegated', socket.room.toResult());
        userTarget.socket.user.admin = true;
        socket.user.admin = false;
        socket.emit('delegate role:response', {code: req.code, success: true, response: socket.room.toResult()});
        utils.sendAllRoom(globalData);
        console.log("[Delegate Role] User " + socket.user.userName + " delegate his admin role to " + userTarget.userName + " in the room " + socket.room.name + ".");
      } else {
        socket.emit('delegate user:response', {code: req.code, success: false, response: 'No user found.'});
        console.error("[Delegate Role] User " + socket.user.userName + " cannot delegate his role to a user '" + req.username + "' who is not inside the room " + socket.room.name + ".");
      }
    } else {
      socket.emit('delegate user:response', {code: req.code, success: false, response: 'You do not have enough rights.'});
      console.error("[Delegate User] User " + socket.id + " does not have enough rights to delegate his role.");
    }
  });
};
