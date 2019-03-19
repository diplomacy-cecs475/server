const express = require('express');
const http = require('http');
const socket = require('socket.io');
const morgan = require('morgan');
const path = require('path');
const User = require('./app/Entity/User');
const Room = require('./app/Entity/Room');

const app = express();
const server = http.Server(app);
const io = socket(server);
const port = process.env.PORT || 4000;

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.status(200).send('Server root');
});

server.listen(port, () => console.log(`Server running on port ${port}`));

var roomList = [];
var nbUsers = 0;

io.on('connection', (socket) => {
  var user = null;
  var room = null;

  // when the client emits 'add user', this listens and executes
  socket.on('add user', (username) => {
    if (user) return;
    ++nbUsers;
    user = new User(username);
    socket.emit('login', {
      nbUsers: nbUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: user.userName,
      nbUsers: nbUsers
    });
    console.log(`New user ${socket.id}: ${user.userName}`);
    console.log(roomList);
  });

  socket.on('create room', (name, publicVisibility, password) => {
    if (user) {
      user.admin = true;

      room = new Room(name);
      room.addUser(user);
      room.public = publicVisibility;
      room.password = password;

      roomList.push(room);
    }
    console.log(roomList);
  });

  socket.on('disconnect', () => {
    if (user) {
      if (room) {
        // If the room has only one user, we are removing the room.
        if (room.users.length === 1) {
          var roomIdx = roomList.indexOf(room);
          if (roomIdx !== -1) {
            roomList.splice(roomIdx, 1);
          }
          console.log(roomList);
        } else if (user.admin) {
          // TODO: Set the next user to admin.
        }
      }
      --nbUsers;
      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: user.userName,
        nbUsers: nbUsers
      });
      console.log(`Logout   ${socket.id}: ${user.userName}`);
    }
  });
});
