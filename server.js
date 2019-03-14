const express = require('express');
const http = require('http');
const socket = require('socket.io');
const morgan = require('morgan');
const path = require('path');

const app = express();
const server = http.Server(app);
const io = socket(server);
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.status(200).send('Server root');
});

server.listen(port, () => console.log(`Server running on port ${port}`));

var nbUsers = 0;

io.on('connection', (socket) => {
  var addedUser = false;

  // when the client emits 'add user', this listens and executes
  socket.on('add user', (username) => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++nbUsers;
    addedUser = true;
    socket.emit('login', {
      nbUsers: nbUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      nbUsers: nbUsers
    });
  });

  socket.on('disconnect', () => {
    if (addedUser) {
      --nbUsers;
      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        nbUsers: nbUsers
      });
    }
  });
});
