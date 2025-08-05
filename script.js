function iniciarCarrera() {
  const apuesta = parseFloat(document.getElementById('apuesta').value);
  const caballoElegido = parseInt(document.getElementById('caballo').value);
  const resultado = document.getElementById('resultado');

  if (!apuesta || apuesta <= 0 || caballoElegido < 1 || caballoElegido > 4) {
    resultado.textContent = "Ingresá un caballo del 1 al 4 y una apuesta válida.";
    return;
  }

  resultado.textContent = "🏁 ¡La carrera ha comenzado!";
  const posiciones = [];

  for (let i = 1; i <= 4; i++) {
    const avance = Math.random() * 80 + 20; // % de avance aleatorio entre 20% y 100%
    posiciones.push({ caballo: i, avance });
    document.getElementById(`caballo${i}`).style.left = '0%'; // Reinicio
  }

  posiciones.sort((a, b) => b.avance - a.avance); // orden descendente por avance

  setTimeout(() => {
    posiciones.forEach((p, idx) => {
      document.getElementById(`caballo${p.caballo}`).style.left = `${p.avance}%`;
    });

    const ganador = posiciones[0].caballo;

    setTimeout(() => {
      if (ganador === caballoElegido) {
        resultado.textContent = `🎉 ¡Ganaste! El caballo ${ganador} llegó primero. Te llevás $${apuesta * 2}`;
      } else {
        resultado.textContent = `💸 Perdés. Ganó el caballo ${ganador}. Mejor suerte la próxima.`;
      }
    }, 1500);
  }, 100);
}
