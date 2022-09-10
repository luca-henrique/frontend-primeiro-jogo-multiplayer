import express from 'express';
import http from 'http';
import {Server} from 'socket.io';

import createGame from './public/game.js';

const app = express();
const server = http.createServer(app);
const socket = new Server(server);

const game = createGame();

game.subscribe((command) => {
  socket.emit(command.type, command);
});

app.use(express.static('public'));

socket.on('connection', (stream) => {
  const playerId = stream.id;

  game.addPlayer({playerId});

  socket.emit('setup', game.state);

  stream.on('disconnect', () => {
    game.removePlayer({playerId});
  });

  stream.on('move-player', (command) => {
    command.playerId = playerId;
    command.type = 'move-player';
    game.movePlayer(command);
  });
});

server.listen(3000, () => {
  console.log('Opeeen');
});
