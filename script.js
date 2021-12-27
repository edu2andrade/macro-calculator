const form = document.getElementById("calc");
const sexoMasc = document.getElementById("sexo-masc");
const peso = document.getElementById("peso");
const altura = document.getElementById("altura");
const edad = document.getElementById("edad");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Harris -->", HarrisBenedict());
  console.log("Mifflin -->", Mifflin());
  console.log("average -->", (HarrisBenedict() + Mifflin())/2)
});

const HarrisBenedict = () => {
  // Check genre and returns the BMR accordingly
  const result = sexoMasc.checked
  ? 66.5 + 13.75 * peso.value.trim() + 5.003 * altura.value.trim() - 6.775 * edad.value.trim()
  : 665.1 + 9.563 * peso.value.trim() + 1.85 * altura.value.trim() - 4.676 * edad.value.trim();

  return result;
};

const  Mifflin = () => {
  // Check genre and returns the BMR accordingly (different formula)
  const result = sexoMasc.checked
  ? 5 + (9.99 * peso.value.trim()) + (6.25 * altura.value.trim()) - (4.92 * edad.value.trim())
  : -161 + (9.99 * peso.value.trim()) + (6.25 * altura.value.trim()) - (4.92 * edad.value.trim());

  return result;
}