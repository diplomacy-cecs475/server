# Server
Nodejs: https://nodejs.org

## Running
```
npm install
npm start
```

## Deploy
```
docker build -t diplomacy-server .
docker run -p 4000:4000 -d diplomacy-server:latest 
```

## Usage
**add user ‘username’**

- Username: string

- socket.emit('add user:response', {success: true, response: socket.user.toResult()});
- socket.emit('add user:response', {success: false, response: 'Username already exists.'});

**reconnect user 'tokenId'**

- TokenId: string

- socket.emit('reconnect user:response', {success: true, response: socket.user.toResult()});
- socket.emit('reconnect user:response', {success: false, response: 'Token does not exists.'});

**kick user 'username'**

- Username: String must be the user in the same room.

- userTarget.socket.emit('kicked');
- socket.emit('kick user:response', {success: true, response: socket.room.toResult()});
- socket.emit('kick user:response', {success: false, response: 'No user found.'});
- socket.emit('kick user:response', {success: false, response: 'You do not have enough right.'});

**delegate role 'username'**

- Username: String must be the user in the same room.

- socket.emit('delegate role:response', {success: true, response: socket.room.toResult()});
- socket.emit('delegate user:response', {success: false, response: 'No user found.'});
- socket.emit('delegate user:response', {success: false, response: 'You do not have enough right.'});

**disconnect**

**create room ‘room name’ ‘public’ ‘password’**

- Room name: string
- Public: true if anyone can join the room.
- Password: string if public = false or null

- socket.emit('create room:response', {success: true, response: socket.room.toResult()});
- socket.emit('create room:response', {success: false, response: 'You are already in a room.'});
- socket.emit('create room:response', {success: false, response: 'You are not logged in.'});

**join room ‘token’ ‘password’**

- Token: String must be the exact unique token of the room.
- Password: If the room is private, string. Or null if the room is public.

- socket.emit('join room:response', {success: true, response: socket.room.toResult()});
- socket.emit('join room:response', {success: false, response: 'Room ' + token + ' does not exists.'});
- socket.emit('join room:response', {success: false, response: 'Bad password or room already started.'});

**list room**

- socket.emit('list room:response', {success: true, response: roomList});

**msg to ‘username’ ‘msg’**

- Username: String must be the user in the same room.
- Msg: String contains the message to send.

userTarget.socket.emit('msgPriv', {userFrom: socket.user.userName, msg: msg});

**msg global ‘msg’**

- Msg: String contains the message to send.

user.socket.emit('msgGlobal', {userFrom: socket.user.userName, msg: msg});

## Authors
- Frederic Oddou
- Morgan Simon
- Kelvin Pham
- Antoine Gannat
- Zita Cheng
- Eric Park