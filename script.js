const form = document.getElementById("calc");
const genreMale = document.getElementById("genreMale");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const age = document.getElementById("age");
const tdee = document.querySelectorAll("input[name='tdee']");
const goal = document.getElementById("goal");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  checkMacros();
});

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

// Function tdee's calcs: (NOT WORKING... WHY???)
/* function tdeeCalc(selectedValue, bmr) {
  switch (selectedValue) {
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
} */

const harrisBenedict = () => {
  // Check genre and returns the BMR accordingly
  // BMR:
  const bmr = genreMale.checked
  ? 66.5 + 13.75 * weight.value.trim() + 5.003 * height.value.trim() - 6.775 * age.value.trim()
  : 665.1 + 9.563 * weight.value.trim() + 1.85 * height.value.trim() - 4.676 * age.value.trim();

  // calcs accordingly genre and tdee:
  // tdeeCalc(bmr, selectedValue); (NOT WORKING...)
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

// Caloric daily needs according goal (DONE!!)
const caloricDailyNeeds = () => {

  const adjustedAverageTdee = 
  selectedTdee() === "extrem-active"
  ? (harrisBenedict() + mifflin()) / 2
  : (harrisBenedict() + mifflin() + basicRule())/3;

  console.log("goal -->", goal.value);
  console.log("adjustedTdee -->", adjustedAverageTdee);

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
  return result;
}

// Macro calculations:

function checkMacros() {
  console.log("Harris -->", harrisBenedict());
  console.log("Mifflin -->", mifflin());
  console.log("basicRule -->", basicRule());
  console.log("caloricDailyNeeds -->", caloricDailyNeeds());
}