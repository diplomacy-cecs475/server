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

```js
socket.emit('add user:response', {success: true, response: socket.user.toResult()});
socket.emit('add user:response', {success: false, response: 'Username already exists.'});
```

**reconnect user 'tokenId'**

- TokenId: string

```js
socket.emit('reconnect user:response', {success: true, response: socket.user.toResult()});
socket.emit('reconnect user:response', {success: false, response: 'Token does not exists.'});
```

**kick user 'username'**

- Username: String must be the user in the same room.

```js
userTarget.socket.emit('kicked');
socket.emit('kick user:response', {success: true, response: socket.room.toResult()});
socket.emit('kick user:response', {success: false, response: 'No user found.'});
socket.emit('kick user:response', {success: false, response: 'You do not have enough right.'});
this.sendAll(globalData, 'update room:event', roomList);
```

**delegate role 'username'**

- Username: String must be the user in the same room.

```js
socket.emit('delegate role:response', {success: true, response: socket.room.toResult()});
socket.emit('delegate user:response', {success: false, response: 'No user found.'});
socket.emit('delegate user:response', {success: false, response: 'You do not have enough right.'});
this.sendAll(globalData, 'update room:event', roomList);
```

**disconnect**

**create room ‘room name’ ‘public’ ‘password’ 'time' 'nbUsersMax'**

- Room name: string
- Public: true if anyone can join the room.
- Password: string if public = false or null
- Time: integer time for each round.
- NbUsersMax: integer number of users max.

```js
socket.emit('create room:response', {success: true, response: socket.room.toResult()});
socket.emit('create room:response', {success: false, response: 'You are already in a room.'});
socket.emit('create room:response', {success: false, response: 'You are not logged in.'});
this.sendAll(globalData, 'update room:event', roomList);
```

**join room ‘token’ ‘password’**

- Token: String must be the exact unique token of the room.
- Password: If the room is private, string. Or null if the room is public.

```js
socket.emit('join room:response', {success: true, response: socket.room.toResult()});
socket.emit('join room:response', {success: false, response: 'Room ' + token + ' does not exists.'});
socket.emit('join room:response', {success: false, response: 'Bad password or room already started.'});
this.sendAll(globalData, 'update room:event', roomList);

```

**leave room**

```js
socket.emit('leave room:response', {success: true, response: "You were removed."});
socket.emit('leave room:response', {success: false, response: "You are not logged in or not in a room."});
this.sendAll(globalData, 'update room:event', roomList);
```

**list room**

```js
socket.emit('list room:response', {success: true, response: roomList});
```


**get room 'tokenId'**

- TokenId: String must be the exact unique token of the room.

```js
socket.emit('get room:response', {success: false, response: 'Room not found.'});
socket.emit('get room:response', {success: true, response: room.toResult()});
```

**msg to ‘username’ ‘msg’**

- Username: String must be the user in the same room.
- Msg: String contains the message to send.

```js
userTarget.socket.emit('msgPriv', {userFrom: socket.user.userName, msg: msg});
```

**msg global ‘msg’**

- Msg: String contains the message to send.

```js
user.socket.emit('msgGlobal', {userFrom: socket.user.userName, msg: msg});
```

**start game**

```js
socket.emit('start game:response', {code: req.code, success: true, response: socket.room.toResult()});
socket.emit('start game:response', {code: req.code, success: false, response: 'Not enough users.'});
socket.emit('start game:response', {code: req.code, success: false, response: 'You do not have enough rights.'});
user.socket.emit('start game:event', room.toResult()); // All users inside the room.
```

**send orders 'orders'**

- Orders: [{from: key, to: key, type: convoy/attack/support}, {...}]

```js
socket.emit('send orders:response', {code: req.code, success: true, response: 'Orders saved.'});
socket.emit('send orders:response', {code: req.code, success: false, response: 'Room or user not ready to send orders.'});
user.socket.emit('orders sent:event', userList); // All users inside the room.
```

## Authors
- Frederic Oddou
- Morgan Simon
- Kelvin Pham
- Antoine Gannat
- Zita Cheng
- Eric Park