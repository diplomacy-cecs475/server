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

socket.emit("add user:response", socket.user.toResult());

**disconnect**

**create room ‘room name’ ‘public’ ‘password’**

- Room name: string
- Public: true if anyone can join the room.
- Password: string if public = false or null

socket.emit("create room:response", socket.room.toResult());


**join room ‘token’ ‘password’**

- Token: String must be the exact unique token of the room.
- Password: If the room is private, string. Or null if the room is public.

socket.emit("join room:response", socket.room.toResult());

**list room**

socket.emit('list room:response', roomList);

**msg to ‘username’ ‘msg’**

- Username: String must be the user in the same room.
- Msg: String contains the message to send.

userTarget.socket.emit('msgPriv', {userFrom: socket.user.userName, msg: msg});

**msg global ‘msg’**

- Msg: String contains the message to send.

user.socket.emit('msgGlobal', {userFrom: socket.user.userName, msg: msg});

**kick user 'username'**

- Username: String must be the user in the same room.

userTarget.socket.emit('kicked');
socket.emit('kick user:response', socket.room.toResult());

**delegate role 'username'**

- Username: String must be the user in the same room.

userTarget.socket.emit('delegated', socket.room.toResult());
socket.emit('delegate role:response', socket.room.toResult());

## Authors
- Frederic Oddou
- Morgan Simon
- Kelvin Pham
- Antoine Gannat
- Zita Cheng
- Eric Park