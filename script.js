function iniciarCarrera() {
  const apuesta = parseFloat(document.getElementById("apuesta").value);
  const elegido = parseInt(document.getElementById("caballo").value);
  const resultado = document.getElementById("resultado");

  if (!apuesta || apuesta <= 0 || elegido < 1 || elegido > 4) {
    resultado.textContent = "Ingresá un caballo válido (1 a 4) y una apuesta mayor a 0.";
    return;
  }

  resultado.textContent = "🏁 ¡La carrera está en marcha!";

  const posiciones = [];

  // Generar avance aleatorio para cada caballo
  for (let i = 1; i <= 4; i++) {
    const avance = Math.random() * 80 + 10; // avance entre 10% y 90%
    posiciones.push({ caballo: i, avance });
    const caballoDiv = document.getElementById(`caballo${i}`);
    caballoDiv.style.left = "0%"; // reiniciar posición
  }

  // Ejecutar movimiento después de un pequeño delay
  setTimeout(() => {
    posiciones.forEach(pos => {
      const caballoDiv = document.getElementById(`caballo${pos.caballo}`);
      caballoDiv.style.left = `${pos.avance}%`;
    });

    // Ordenar quién ganó
    posiciones.sort((a, b) => b.avance - a.avance);
    const ganador = posiciones[0].caballo;

    setTimeout(() => {
      if (ganador === elegido) {
        resultado.textContent = `🎉 ¡Ganaste! El caballo ${ganador} llegó primero. Te llevás $${apuesta * 2}`;
      } else {
        resultado.textContent = `💸 Perdiste. Ganó el caballo ${ganador}. Mejor suerte la próxima.`;
      }
    }, 2200);
  }, 200);
}
