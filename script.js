const form = document.getElementById("calc");
const genreMale = document.getElementById("genreMale");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const age = document.getElementById("age");
const tdee = document.querySelectorAll("input[name='tdee']");
const goal = document.getElementById("goal");
const calculator = document.getElementById("calculator");
const results = document.getElementById("results");

const resultCalories = document.getElementById("calories");
const resultCarbsCal = document.getElementById("carbs-cal");
const resultProteinsCal = document.getElementById("proteins-cal");
const resultFatsCal = document.getElementById("fats-cal");

const resultCarbsGrams = document.getElementById("carbs-grams");
const resultProteinsGrams = document.getElementById("proteins-grams");
const resultFatsGrams = document.getElementById("fats-grams");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  macroCalcs();
  toggleResults();
});


/* 
Next steps:

- Apply styles to all app!
*/


// Function tdee's selector:
function selectedTdee() {
  let result;
  for (let i of tdee) {
    i.checked
    ? result = i.value
    : null;
  }
  return result;
}

const harrisBenedict = () => {
  // Check genre and returns the BMR accordingly
  // BMR:
  const bmr = genreMale.checked
  ? 66.5 + 13.75 * weight.value.trim() + 5.003 * height.value.trim() - 6.775 * age.value.trim()
  : 665.1 + 9.563 * weight.value.trim() + 1.85 * height.value.trim() - 4.676 * age.value.trim();

  // calcs accordingly genre and tdee: (CODE REPETITION HERE!)
  switch (selectedTdee()) {
  case "sedentary":
    result = bmr * 1.3;
    break;
  case "active":
    result = bmr * 1.475;
    break;
  case "very-active":
    result = bmr * 1.8;
    break;
  case "extrem-active":
    result = bmr * 2.1;
    break;
  default: 
    result = 0;
  }
  return result;
};

const mifflin = () => {
  // Check genre and returns the BMR accordingly (different formula)
  const bmr = genreMale.checked
  ? 5 + (9.99 * weight.value.trim()) + (6.25 * height.value.trim()) - (4.92 * age.value.trim())
  : -161 + (9.99 * weight.value.trim()) + (6.25 * height.value.trim()) - (4.92 * age.value.trim());

  // calcs accordingly genre and tdee: (CODE REPETITION HERE!)
  switch (selectedTdee()) {
    case "sedentary":
      result = bmr * 1.3;
      break;
    case "active":
      result = bmr * 1.475;
      break;
    case "very-active":
      result = bmr * 1.8;
      break;
    case "extrem-active":
      result = bmr * 2.1;
      break;
    default: 
      result = 0;
    }
    return result;
};

const basicRule = () => {
  // For TDEE calcs: (the calcs here are different...)
  switch (selectedTdee()) {
    case "sedentary":
      result = 28.5 * (weight.value / 2.2);
      break;
    case "active":
      result = 33.5 * (weight.value / 2.2);
      break;
    case "very-active":
      result = 39.5 * (weight.value / 2.2);
      break;
    case "extrem-active":
      result = 0;
      break;
    default: 
      result = 0;
  }
  return result;
}

// Caloric daily needs according goal
const caloricDailyNeeds = () => {

  const adjustedAverageTdee = 
  selectedTdee() === "extrem-active"
  ? (harrisBenedict() + mifflin()) / 2
  : (harrisBenedict() + mifflin() + basicRule())/3;

  switch (goal.value) {
    case "gain-weight":
      result = adjustedAverageTdee + (adjustedAverageTdee * 0.1);
      break;
    case "keep-the-same":
      result = adjustedAverageTdee;
      break;
    case "loose-weight":
      result = adjustedAverageTdee - (adjustedAverageTdee * 0.1);
      break;
    default:
      result = "Please select a goal first!!!";
  }

  resultCalories.textContent = `calorías diarias: ${result.toFixed()} kcal`;

  return result;
}

// Macro calculations:
const macroCalcs = () => {
  const fatGrams = 1 * weight.value;
  const fatCal = fatGrams * 9;
  const proteinGrams = 1.8 * weight.value;
  const proteinCal = 4 * proteinGrams;
  const carbCal = caloricDailyNeeds() - (proteinCal + fatCal);
  const carbGrams = carbCal / 4;

  // input the results into HTML:
  resultCarbsCal.textContent = `${carbCal.toFixed()} kcal`;
  resultCarbsGrams.textContent = `${carbGrams.toFixed()} gramos`

  resultProteinsCal.textContent = `${proteinCal.toFixed()} kcal`;
  resultProteinsGrams.textContent = `${proteinGrams.toFixed()} gramos`;

  resultFatsCal.textContent = `${fatCal.toFixed()} kcal`;
  resultFatsGrams.textContent = `${fatGrams.toFixed()} gramos`;
}

const toggleResults = () => {
  calculator.classList.toggle("hidden");
  results.classList.toggle("hidden");
}