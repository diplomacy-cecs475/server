const express = require('express');
const http = require('http');
const socket = require('socket.io');
const morgan = require('morgan');
const path = require('path');

const app = express();
const server = http.Server(app);
const io = socket(server);
const router = express.Router();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')));

router.use('/auth', require('./api/routes/AuthRoutes'));

app.use('/api', router);

server.listen(port, () => console.log(`Server running on port ${port}`));
