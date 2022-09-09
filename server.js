import express from 'express';
import http from 'http';

import createGame from './public/game.js';

const app = express();
const server = http.createServer(app);

const game = createGame();

game.addPlayer({playerId: 'player1', playerX: 0, playerY: 0});
game.addFruit({fruitId: 'fruit1', fruitX: 2, fruitY: 2});

console.log(game.state);

app.use(express.static('public'));

server.listen(3000, () => {
  console.log('Opeeen');
});
