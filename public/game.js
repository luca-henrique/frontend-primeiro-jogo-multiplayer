export default function createGame() {
  const state = {
    players: {},
    fruits: {},
    screen: {width: 10, height: 10},
  };

  const observers = [];

  function start() {
    const timeAddFruit = 2000;
    setInterval(addFruit, timeAddFruit);
  }

  function subscribe(observerFunction) {
    observers.push(observerFunction);
  }

  function notifyAll(command) {
    for (const observerFunction of observers) {
      observerFunction(command);
    }
  }

  function addPlayer(command) {
    const playerId = command.playerId;
    const playerX =
      'playerX' in command
        ? command.playerX
        : Math.floor(Math.random() * state.screen.width);
    const playerY =
      'playerY' in command
        ? command.playerY
        : Math.floor(Math.random() * state.screen.height);

    state.players[playerId] = {
      x: playerX,
      y: playerY,
    };

    notifyAll({type: 'add-player', playerId, playerX, playerY});
  }

  function setState(newState) {
    Object.assign(state, newState);
  }

  function removePlayer(command) {
    const playerId = command.playerId;

    notifyAll({type: 'remove-player', playerId});

    delete state.players[playerId];
  }

  function addFruit(command) {
    const fruitId = command
      ? command.fruitI
      : Math.floor(Math.random() * 10000);

    const fruitX = command
      ? command.fruitX
      : Math.floor(Math.random() * state.screen.width);
    const fruitY = command
      ? command.fruitY
      : Math.floor(Math.random() * state.screen.height);

    state.fruits[fruitId] = {
      x: fruitX,
      y: fruitY,
    };

    notifyAll({
      type: 'add-fruit',
      fruitId,
      fruitX,
      fruitY,
    });
  }

  function removeFruit(command) {
    const fruitId = command.fruitId;

    notifyAll({type: 'remove-fruit', fruitId});

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
    notifyAll(command);

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
    subscribe,
    start,
  };
}
