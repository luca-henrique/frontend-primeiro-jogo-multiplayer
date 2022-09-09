export default function createGame() {
  const state = {
    players: {},
    fruits: {},
    screen: {width: 10, height: 10},
  };

  function addPlayer(command) {
    const playerId = command.playerId;
    const playerX = command.playerX;
    const playerY = command.playerY;

    state.players[playerId] = {
      x: playerX,
      y: playerY,
    };
  }

  function setState(newState) {
    Object.assign(state, newState);
  }

  function removePlayer() {
    const playerId = command.playerId;

    delete state.players[playerId];
  }

  function addFruit(command) {
    const fruitId = command.fruitId;
    const fruitX = command.fruitX;
    const fruitY = command.fruitY;

    state.fruits[fruitId] = {
      x: fruitX,
      y: fruitY,
    };
  }

  function removeFruit(command) {
    const fruitId = command.fruitId;

    delete state.fruits[fruitId];
  }

  const acceptedMoves = {
    ArrowUp(player) {
      if (player.y - 1 >= 0) {
        player.y = player.y - 1;
      }
    },
    ArrowRight(player) {
      if (player.x + 1 < state.screen.height) {
        player.x = player.x + 1;
      }
    },
    ArrowDown(player) {
      if (player.y + 1 < state.screen.height) {
        player.y = player.y + 1;
      }
    },
    ArrowLeft(player) {
      if (player.x - 1 >= 0) {
        player.x = player.x - 1;
      }
    },
  };

  function movePlayer(command) {
    const keyPressed = command.keyPressed;
    const player = state.players[command.playerId];
    const playerId = command.playerId;
    const moveFunction = acceptedMoves[keyPressed];

    if (player && moveFunction) {
      moveFunction(player);
      checkForFruitCollision(playerId);
    }
    return;
  }

  function checkForFruitCollision(playerId) {
    const player = state.players[playerId];

    for (const fruitId in state.fruits) {
      const fruit = state.fruits[fruitId];

      if (player.x === fruit.x && player.y === fruit.y) {
        removeFruit({fruitId});
      }
    }
  }

  return {
    movePlayer,
    state,
    addPlayer,
    removePlayer,
    addFruit,
    removeFruit,
    checkForFruitCollision,
    setState,
  };
}
