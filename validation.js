"use strict";

const plantNameValid = { valid: false };
const startDateValid = { valid: false };
const endDateValid = { valid: false };
const startLeavesValid = { valid: false };
const endLeavesValid = { valid: false };

function validatePlantName() {
  const plantName = document.getElementById("plant-name").value.trim();
  const plantNameError = document.getElementById("plant-name-error");
  const regex = /^[a-zA-Z\s]*$/;

  if (plantName.length < 3 || !regex.test(plantName)) {
    plantNameError.textContent =
      "Plant name must be at least 3 characters long and contain only letters and spaces.";
    plantNameValid.valid = false;
  } else {
    plantNameError.textContent = "";
    plantNameValid.valid = true;
  }
}

function validateStartDate() {
  const startDate = document.getElementById("start-date").value;
  const startDateError = document.getElementById("start-date-error");

  if (!startDate) {
    $;
    startDateError.textContent = "Please select a valid start date.";
    startDateValid.valid = false;
  } else {
    startDateError.textContent = "";
    startDateValid.valid = true;
  }
}

function validateEndDate() {
  const endDate = document.getElementById("end-date").value;
  const endDateError = document.getElementById("end-date-error");

  if (!endDate) {
    endDateError.textContent = "Please select a valid end date.";
    endDateValid.valid = false;
  } else {
    endDateError.textContent = "";
    endDateValid.valid = true;
  }
}

function validateStartLeaves() {
  const startLeaves = document.getElementById("start-leaves").value;
  const startLeavesError = document.getElementById("start-leaves-error");

  if (isNaN(startLeaves) || startLeaves < 0) {
    startLeavesError.textContent =
      "Please enter a valid number of leaves (0 or more).";
    startLeavesValid.valid = false;
  } else {
    startLeavesError.textContent = "";
    startLeavesValid.valid = true;
  }
}

function validateEndLeaves() {
  const endLeaves = document.getElementById("end-leaves").value;
  const endLeavesError = document.getElementById("end-leaves-error");

  if (isNaN(endLeaves) || endLeaves < 0) {
    endLeavesError.textContent =
      "Please enter a valid number of leaves (0 or more).";
    endLeavesValid.valid = false;
  } else {
    endLeavesError.textContent = "";
    endLeavesValid.valid = true;
  }
}

export {
  plantNameValid,
  startDateValid,
  endDateValid,
  startLeavesValid,
  endLeavesValid,
  validatePlantName,
  validateStartDate,
  validateEndDate,
  validateStartLeaves,
  validateEndLeaves,
};

