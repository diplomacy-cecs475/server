require('@google-cloud/debug-agent').start();
const express = require('express');
const http = require('http');
const socket = require('socket.io');
const morgan = require('morgan');
const path = require('path');

const app = express();
const server = http.Server(app);
const io = socket(server);
const port = process.env.PORT || 4042;

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/static', express.static(__dirname + '/build/static'));
app.use('/images', express.static(__dirname + '/build/images'));
app.use('/res', express.static(__dirname + '/build/res'));


app.get('*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

server.listen(port, () => console.log(`Server running on port ${port}`));

var globalData = {
  roomList: [],
  listUsers: [],
  nbUsers: 0
};

io.on('connection', (socket) => {
  // Socket events
  require('./app/sockets')(socket, globalData);
});
