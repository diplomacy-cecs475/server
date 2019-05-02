const Room = require('../Entity/Room');
let utils = require('../Tools/utils');

module.exports = (socket, globalData) => {
  // If admin, can delegate the role to another player.
  socket.on('start game', (req) => {
    if (socket.user && socket.room && socket.user.admin) {
      if (socket.room.users.length >= 2) {
        socket.room.startGame();
        utils.sendAllRoom(globalData);
        utils.startGameRoomEvent(socket.room);
        socket.emit('start game:response', {code: req.code, success: true, response: socket.room.toResult()});
        console.log("[Start Game] User " + socket.user.userName + " starts the game of the room " + socket.room.name);
      } else {
        socket.emit('start game:response', {code: req.code, success: false, response: 'Not enough users.'});
        console.error("[Start Game] Room " + socket.room.name + " cannot start because of the number of user.");
      }
    } else {
      socket.emit('start game:response', {code: req.code, success: false, response: 'You do not have enough rights.'});
      console.error("[Start Game] User " + socket.id + " does not have enough rights to start the game.");
    }
  });

  socket.on('send orders', (req) => {
    if (socket.user && socket.room && socket.room.started) {
      socket.user.orders = req.orders;
      socket.emit('send orders:response', {code: req.code, success: true, response: 'Orders saved.'});
      console.log("[Send orders] User " + socket.user.userName + " has sent his orders: " + req.orders);
      utils.ordersSentEvent(socket.room);
      let userHasNotSentOrders = socket.room.users.find((user) => {
        return user.orders === null;
      });
      if (!userHasNotSentOrders) {
        console.log("[Send orders] Everyone has sent their orders. Running the end round.");
        socket.room.map.executeOrders();
        socket.room.plusRoundNumber();
        utils.roundEvent(socket.room);
      }
    } else {
      socket.emit('send orders:response', {code: req.code, success: false, response: 'Room or user not ready to send orders.'});
      console.error("[Send Orders] User " + socket.id + " has not enough rights or the game has not started.");
    }
  });

  socket.on('end round', (req) => {
    if (socket.user && socket.room && socket.user.admin && socket.room.started) {
      console.log("[End round] User " + socket.user.userName + " requested the end of the round.");
      socket.room.map.executeOrders();
      socket.room.plusRoundNumber();
      socket.emit('end round:response', {code: req.code, success: true, response: 'Round finished.'});
      utils.roundEvent(socket.room);
    } else {
      socket.emit('end round:response', {code: req.code, success: false, response: 'You do not have enough rights.'});
      console.error("[End Round] User " + socket.id + " does not have enough rights to end the round of the game.");
    }
  });
};
