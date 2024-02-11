document.addEventListener("DOMContentLoaded", function () {
  const pantalla = document.querySelector(".pantalla");
  const botonesNumeros = document.querySelectorAll(".numero");
  const botonSumar = document.querySelector(".sumar");
  const botonRestar = document.querySelector(".restar");
  const botonMultiplicar = document.querySelector(".multiplicar");
  const botonDividir = document.querySelector(".dividir");
  const botonPorcentaje = document.querySelector(".porcentaje");
  const botonBorrar = document.querySelector(".borrar");
  const botonBorrarTodo = document.querySelector(".borrartodo");
  const botonIgual = document.querySelector(".igual");

  let operacionActual = "";
  let operacionAnterior = "";
  let operacion = undefined;

  botonesNumeros.forEach((boton) => {
    boton.addEventListener("click", () => agregarNumero(boton.textContent));
  });

  botonSumar.addEventListener("click", () => seleccionarOperacion("+"));
  botonRestar.addEventListener("click", () => seleccionarOperacion("-"));
  botonMultiplicar.addEventListener("click", () => seleccionarOperacion("*"));
  botonDividir.addEventListener("click", () => seleccionarOperacion("/"));
  botonPorcentaje.addEventListener("click", () => seleccionarOperacion("%"));

  botonIgual.addEventListener("click", () => {
    calcular();
    actualizarPantalla();
  });

  botonBorrar.addEventListener("click", borrar);
  botonBorrarTodo.addEventListener("click", borrarTodo);

  function agregarNumero(numero) {
    if (numero === "." && operacionActual.includes(".")) return;
    operacionActual = operacionActual.toString() + numero.toString();
    actualizarPantalla();
  }

  function seleccionarOperacion(op) {
    if (operacionActual === "") return;
    if (operacionAnterior !== "") {
      calcular();
    }
    operacion = op;
    operacionAnterior = operacionActual;
    operacionActual = "";
  }

  function calcular() {
    let calculo;
    const anterior = parseFloat(operacionAnterior);
    const actual = parseFloat(operacionActual);
    if (isNaN(anterior) || isNaN(actual)) return;
    switch (operacion) {
      case "+":
        calculo = anterior + actual;
        break;
      case "-":
        calculo = anterior - actual;
        break;
      case "*":
        calculo = anterior * actual;
        break;
      case "/":
        calculo = anterior / actual;
        break;
      case "%":
        calculo = anterior % actual;
        break;
      default:
        return;
    }
    operacionActual = calculo;
    operacion = undefined;
    operacionAnterior = "";
  }

  function actualizarPantalla() {
    pantalla.innerText = operacionActual;
  }

  function borrar() {
    operacionActual = operacionActual.toString().slice(0, -1);
    actualizarPantalla();
  }

  function borrarTodo() {
    operacionActual = "";
    operacionAnterior = "";
    operacion = undefined;
    actualizarPantalla();
  }
});
