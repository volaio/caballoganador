const boardElement = document.getElementById('board');
const estado = document.getElementById('estado');
const game = new Chess();

const board = Chessboard('board', {
  draggable: true,
  position: 'start',
  onDrop: onDrop
});

function onDrop(source, target) {
  const move = game.move({
    from: source,
    to: target,
    promotion: 'q' // siempre coronamos reina
  });

  if (move === null) return 'snapback';

  updateEstado();

  setTimeout(() => {
    if (!game.game_over()) {
      const movimientoIA = generarMovimientoIA();
      game.move(movimientoIA);
      board.position(game.fen());
      updateEstado();
    }
  }, 500);
}

function generarMovimientoIA() {
  // IA básica: elige movimientos legales aleatorios, pero prioriza capturas
  const movimientos = game.moves({ verbose: true });

  const capturas = movimientos.filter(m => m.flags.includes('c'));
  if (capturas.length > 0) {
    return capturas[Math.floor(Math.random() * capturas.length)];
  }

  // Si no hay captura, elige aleatorio
  return movimientos[Math.floor(Math.random() * movimientos.length)];
}

function updateEstado() {
  if (game.in_checkmate()) {
    estado.textContent = 'Jaque mate. ¡Fin del juego!';
  } else if (game.in_draw()) {
    estado.textContent = 'Tablas.';
  } else if (game.in_check()) {
    estado.textContent = '¡Estás en jaque!';
  } else {
    estado.textContent = `Turno de: ${game.turn() === 'w' ? 'Blancas (Vos)' : 'Negras (Bot)'}`;
  }
}
