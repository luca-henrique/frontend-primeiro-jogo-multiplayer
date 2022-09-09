import express from 'express';
import http from 'http';
import {Server} from 'socket.io';

import createGame from './public/game.js';

const app = express();
const server = http.createServer(app);
const socket = new Server(server);

const game = createGame();

game.addPlayer({playerId: 'player1', playerX: 0, playerY: 0});
game.addFruit({fruitId: 'fruit1', fruitX: 2, fruitY: 2});

console.log(game.state);

app.use(express.static('public'));

socket.on('connection', (stream) => {
  const playerId = stream.id;
  console.log('someone connected!' + playerId);

  socket.emit('setup', game.state);
});

server.listen(3000, () => {
  console.log('Opeeen');
});
