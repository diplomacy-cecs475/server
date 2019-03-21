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

**disconnect**

**create room ‘room name’ ‘public’ ‘password’**

- Room name: string
- Public: true if anyone can join the room.
- Password: string if public = false or null

Emit : {cmd: 'joinRoom', res: socket.room.toResult()}


**join room ‘token’ ‘password’**

- Token: String must be the exact unique token of the room.
- Password: If the room is private, string. Or null if the room is public.

Emit: {cmd: 'joinRoom', res: socket.room.toResult()}

**list room**

Emit: {cmd: 'listRoom', res: roomList}

**msg to ‘username’ ‘msg’**

- Username: String must be the user in the same room.
- Msg: String contains the message to send.

Emit to the user: {cmd: 'msgPriv', res: {userFrom: socket.user.userName, msg: msg}}

**msg global ‘msg’**

- Msg: String contains the message to send.

Emit to the user: {cmd: 'msgGlobal', res: {userFrom: socket.user.userName, msg: msg}}

## Authors
- Frederic Oddou
- Morgan Simon
- Kelvin Pham
- Antoine Gannat
- Zita Cheng
- Eric Park