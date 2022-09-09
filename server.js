import express from 'express';
import http from 'http';
import {Server} from 'socket.io';

import createGame from './public/game.js';

const app = express();
const server = http.createServer(app);
const socket = new Server(server);

const game = createGame();

game.subscribe((command) => {
  console.log('Emitting', command.type);
  socket.emit(command.type, command);
});

game.addFruit({fruitId: 'fruit1', fruitX: 2, fruitY: 2});

app.use(express.static('public'));

socket.on('connection', (stream) => {
  const playerId = stream.id;

  game.addPlayer({playerId});

  socket.emit('setup', game.state);

  stream.on('disconnect', (stream) => {
    console.log('aqui');
    game.removePlayer({playerId});
    console.log('removeu');
  });
});

server.listen(3000, () => {
  console.log('Opeeen');
});
