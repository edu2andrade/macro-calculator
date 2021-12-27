const form = document.getElementById("calc");
const sexoMasc = document.getElementById("sexo-masc");
const peso = document.getElementById("peso");
const altura = document.getElementById("altura");
const edad = document.getElementById("edad");

const BodyMassRatio = () => {
  sexoMasc.checked
    ? 66.5 + 13.75 * peso.value + 5.003 * altura.value - 6.775 * edad.value
    : 665.1 + 9.563 * peso.value + 1.85 * altura.value - 4.676 * edad.value;
  // Verifica o sexo e imprime o BMR na tela (testa com console.log primeiro) dá undefined...
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  BodyMassRatio();
  console.log("testes --> ", sexoMasc.checked);
  console.log(BodyMassRatio());
});
