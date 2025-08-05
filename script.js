let fichaSeleccionada = 10;
let saldo = 1000;
let apuesta = null;
let numeroApostado = null;

function seleccionarFicha(valor) {
  fichaSeleccionada = valor;
}

function apostar() {
  const numero = parseInt(document.getElementById("numero").value);
  if (isNaN(numero) || numero < 0 || numero > 36) {
    alert("Elegí un número entre 0 y 36");
    return;
  }

  if (saldo < fichaSeleccionada) {
    alert("Saldo insuficiente");
    return;
  }

  saldo -= fichaSeleccionada;
  apuesta = fichaSeleccionada;
  numeroApostado = numero;
  document.getElementById("saldo").textContent = saldo;
  document.getElementById("resultado").textContent = `Apostaste $${apuesta} al número ${numeroApostado}`;
}

function girar() {
  if (apuesta === null) {
    alert("Primero hacé una apuesta");
    return;
  }

  const resultado = Math.floor(Math.random() * 37);
  const grados = 360 * 10 + (resultado * (360 / 37));
  document.getElementById("wheel").style.transform = `rotate(-${grados}deg)`;

  setTimeout(() => {
    if (resultado === numeroApostado) {
      const ganancia = apuesta * 35;
      saldo += ganancia;
      document.getElementById("resultado").textContent =
        `🎉 ¡Ganaste! Salió ${resultado}. Ganás $${ganancia}`;
    } else {
      document.getElementById("resultado").textContent =
        `❌ Perdiste. Salió ${resultado}.`;
    }

    apuesta = null;
    numeroApostado = null;
    document.getElementById("saldo").textContent = saldo;
  }, 4200);
}
