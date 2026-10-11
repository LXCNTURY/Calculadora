let visor = "0";
let primeiroNumero = null;
let operadorAtual = null;
let esperandoSegundo = false;

const display = document.getElementById("display");

function atualizarDisplay() {
  display.textContent = visor;
}

function digito(valor) {
  if (esperandoSegundo) {
    visor = valor === "." ? "0." : valor;
    esperandoSegundo = false;
  } else {
    if (visor === "0" && valor !== ".") {
      visor = valor;
    } else {
      if (valor === "." && visor.includes(".")) return;
      visor += valor;
    }
  }
  atualizarDisplay();
}

function limpar() {
  visor = "0";
  primeiroNumero = null;
  operadorAtual = null;
  esperandoSegundo = false;
  atualizarDisplay();
}

function apagar() {
  visor = visor.length === 1 ? "0" : visor.slice(0, -1);
  atualizarDisplay();
}

function porcento() {
  visor = (parseFloat(visor) / 100).toString();
  atualizarDisplay();
}

function operacao(op) {
  if (operadorAtual !== null && !esperandoSegundo) {
    calcular();
  }
  primeiroNumero = parseFloat(visor);
  operadorAtual = op;
  esperandoSegundo = true;
}

function calcular() {
  if (operadorAtual === null || primeiroNumero === null) return;

  const segundoNumero = parseFloat(visor);
  let resultado = 0;

  if (operadorAtual === "+") resultado = primeiroNumero + segundoNumero;
  if (operadorAtual === "-") resultado = primeiroNumero - segundoNumero;
  if (operadorAtual === "*") resultado = primeiroNumero * segundoNumero;
  if (operadorAtual === "/") {
    if (segundoNumero === 0) {
      visor = "Erro";
      atualizarDisplay();
      operadorAtual = null;
      esperandoSegundo = true;
      return;
    }
    resultado = primeiroNumero / segundoNumero;
  }

  visor = resultado.toString();
  primeiroNumero = null;
  operadorAtual = null;
  esperandoSegundo = true;
  atualizarDisplay();
}

atualizarDisplay();