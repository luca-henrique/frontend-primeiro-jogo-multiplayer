function player(playerId, playerX, playerY) {
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
}
