const express = require('express');
const http = require('http');
const socket = require('socket.io');
const morgan = require('morgan');
const path = require('path');

const app = express();
const server = http.Server(app);
const io = socket(server);
const port = process.env.PORT || 4000;

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/static', express.static(__dirname + '/static'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

server.listen(port, () => console.log(`Server running on port ${port}`));

var globalData = {
  roomList: [],
  nbUsers: 0
};

io.on('connection', (socket) => {
  // Socket events
  require('./app/sockets')(socket, globalData);
});
