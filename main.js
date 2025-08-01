"use strict";

import { Plant } from "./plant.js";
import {
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
} from "./validation.js";

// Growth Tracker
const plantData = new Map();

document
  .getElementById("plant-growth-form")
  .addEventListener("submit", validateForm);

// Handle file upload and parse the CSV content
function handleFileUpload(file, callback) {
  if (file === null || file === undefined) return;

  plantData.clear();

  const reader = new FileReader();
  reader.onload = function (e) {
    const csvContent = e.target.result;
    console.log("Raw CSV Content:", csvContent);

    parseCsv(csvContent);

    const chart = document.getElementById("plant-growth-chart");
    const initialChart = document.getElementById("initial-chart");

    const initialChartBgColor = window
      .getComputedStyle(initialChart)
      .getPropertyValue("background-color");

    chart.style.setProperty("background-color", initialChartBgColor);

    if (callback) callback();
  };
  reader.readAsText(file);
}

// Validate form input and trigger file upload
function validateForm(event) {
  event.preventDefault();

  const fileInput = document.getElementById("csv-file");
  const fileError = document.getElementById("file-error");
  const file = fileInput.files[0];

  if (!file || file.name.split(".").pop().toLowerCase() !== "csv") {
    fileError.style.display = "inline";
  } else {
    fileError.style.display = "none";
    handleFileUpload(file, updateVisualisation);
  }
}

// Parse the CSV content and populate plant data
function parseCsv(csvContent) {
  const lines = csvContent.split("\n").map((line) => line.trim());
  console.log("Parsed Lines:", lines);

  lines.slice(1).forEach((line, index) => {
    if (!line) return;

    const values = line.split(",").map((value) => value.trim());
    console.log(`Line ${index + 2} Values:`, values);

    const plantName = values[0];
    const month = parseInt(values[1], 10);
    const leafCount = parseInt(values[2], 10);

    if (!plantData.has(plantName)) {
      const color = getGreenShade();
      plantData.set(plantName, new Plant(plantName, color));
    }
    plantData.get(plantName).addData(month, leafCount);
  });

  console.log("Parsed plant data:", plantData);
}

// Update the visualisation based on the plant data
function updateVisualisation() {
  const canvas = document.getElementById("plant-growth-chart");

  const context = canvas.getContext("2d");

  const initialChart = document.getElementById("initial-chart");
  initialChart.style.display = "none";

  $("#plant-growth-chart").show();
  $("#growth-rates-container").show();

  clearCanvas(context, canvas);

  const { maxLeafCount, maxMonth } = getMaxValues();
  drawAxes(context, canvas, maxMonth, maxLeafCount);
  drawData(context, maxMonth, maxLeafCount);

  displayGrowthRates();
}

// Clear the canvas
function clearCanvas(context, canvas) {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

// Get the maximum leaf count and month from the plant data
function getMaxValues() {
  let maxLeafCount = 0;
  let maxMonth = 0;

  plantData.forEach((plant) => {
    plant.getData().forEach(({ month, leafCount }) => {
      if (leafCount > maxLeafCount) maxLeafCount = leafCount;
      if (month > maxMonth) maxMonth = month;
    });
  });

  return { maxLeafCount, maxMonth };
}

// Draw axes on the canvas
function drawAxes(context, canvas, maxMonth, maxLeafCount) {
  const width = canvas.width;
  const height = canvas.height;

  context.beginPath();
  context.moveTo(40, height - 50);
  context.lineTo(width - 50, height - 50);
  context.strokeStyle = "black";
  context.lineWidth = 1;
  context.stroke();

  context.beginPath();
  context.moveTo(50, height - 40);
  context.lineTo(50, 20);
  context.strokeStyle = "black";
  context.lineWidth = 1;
  context.stroke();

  const xInterval = (width - 100) / (maxMonth + 1);
  for (let i = 0; i <= maxMonth; i++) {
    const x = 50 + i * xInterval;
    context.fillStyle = "black";
    context.fillText(i.toString(), x, height - 30);
  }

  context.fillText("Month", width / 2, height - 10);

  for (let i = 0; i <= maxLeafCount + 5; i += 5) {
    const y = height - 50 - (i * (height - 60)) / (maxLeafCount + 5);
    context.fillStyle = "black";
    context.fillText(i.toString(), 20, y + 5);
  }

  context.save();
  context.translate(10, height / 2);
  context.rotate(-Math.PI / 2);
  context.fillText("Number of Leaves", 0, 0);
  context.restore();
}

let timeoutIds = [];

// Draw plant growth data on the canvas
function drawData(context, maxMonth, maxLeafCount) {
  const canvas = document.getElementById("plant-growth-chart");
  const width = canvas.width;
  const height = canvas.height;
  const xInterval = (width - 100) / (maxMonth + 1);

  const legendContainer = document.getElementById("legend-container");
  legendContainer.innerHTML = "";

  timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
  timeoutIds = [];

  plantData.forEach((plant) => {
    const dataPoints = plant.getData();
    const color = plant.getColor();
    let startX = 50;
    let startY =
      height -
      50 -
      (dataPoints[0].leafCount * (height - 60)) / (maxLeafCount + 5);

    const legendItem = createLegendItem(plant.getName(), color);
    legendContainer.appendChild(legendItem);

    dataPoints.forEach(({ month, leafCount }, i) => {
      if (month === 0) return; // Skip drawing for month 0

      const timeoutId = setTimeout(() => {
        const x = 50 + month * xInterval;
        const y =
          height - 50 - (leafCount * (height - 60)) / (maxLeafCount + 5);

        if (i !== 0) {
          context.beginPath();
          context.moveTo(startX, startY);
          context.lineTo(x, y);
          context.strokeStyle = color;
          context.lineWidth = 2;
          context.stroke();
        }

        const isAbove = i % 2 === 0;
        drawLeaf(context, x, y, color, isAbove);

        startX = x;
        startY = y;
      }, 1000 * i);

      timeoutIds.push(timeoutId);
    });

    const lastDataPoint = dataPoints[dataPoints.length - 1];
    const x = 50 + lastDataPoint.month * xInterval;
    const y =
      height -
      50 -
      (lastDataPoint.leafCount * (height - 60)) / (maxLeafCount + 5);
    context.fillStyle = color;
    context.fillText(plant.getName(), x + 10, y);
  });
}

// Create a legend item for plant data
function createLegendItem(plantName, color) {
  const legendItem = document.createElement("div");
  legendItem.classList.add("legend-item");
  legendItem.style.marginBottom = "5px";

  const colorBox = document.createElement("span");
  colorBox.style.width = "20px";
  colorBox.style.height = "20px";
  colorBox.style.backgroundColor = color;
  colorBox.style.marginRight = "8px";

  const labelText = document.createElement("span");
  labelText.textContent = plantName;

  legendItem.appendChild(colorBox);
  legendItem.appendChild(labelText);

  return legendItem;
}

// Draw a leaf shape on the canvas
function drawLeaf(context, x, y, color, isAbove) {
  const offset = isAbove ? -40 : 0;

  context.beginPath();
  context.moveTo(x, y + offset);

  context.bezierCurveTo(
    x - 20,
    y + 20 + offset,
    x - 20,
    y + 20 + offset,
    x,
    y + 40 + offset
  );
  context.bezierCurveTo(
    x + 20,
    y + 20 + offset,
    x + 20,
    y + 20 + offset,
    x,
    y + offset
  );

  context.fillStyle = color;
  context.fill();
  context.strokeStyle = color;
  context.stroke();
}

// Generate a random green shade
function getGreenShade() {
  const greenComponent = Math.floor(Math.random() * (256 - 100) + 100);
  const redComponent = Math.floor(Math.random() * 100);
  const blueComponent = Math.floor(Math.random() * 100);

  const redHex = redComponent.toString(16).padStart(2, "0");
  const greenHex = greenComponent.toString(16).padStart(2, "0");
  const blueHex = blueComponent.toString(16).padStart(2, "0");

  return `#${redHex}${greenHex}${blueHex}`;
}

// Display growth rates of plants
function displayGrowthRates() {
  const growthRatesContainer = document.getElementById(
    "growth-rates-container"
  );

  growthRatesContainer.innerHTML = "";

  plantData.forEach((plant) => {
    const growthRate = plant.getGrowthRate();
    const growthRateItemHTML = `<div>Your<b> ${plant.getName()}</b> is growing at a rate of <b>${growthRate.toFixed(
      2
    )} leaves per month</b></div>`;
    growthRatesContainer.innerHTML += growthRateItemHTML;
  });
}

// Growth Rate Calculator

// Polyfill
$(function () {
  // Create a new input element to check if the browser supports date input type
  var input = document.createElement("input");
  input.setAttribute("type", "date");

  // If the browser does not support date input type, initialise jQuery datepicker
  if (input.type === "text") {
    $('input[type="date"]').datepicker({
      dateFormat: "yy-mm-dd",
    });
  }
});

// Add event listener for form submission to handle growth rate calculation
document
  .getElementById("growth-rate-form")
  .addEventListener("submit", handleGrowthRateForm);

// Handle the form submission for calculating growth rate
function handleGrowthRateForm(event) {
  event.preventDefault();

  // Validate input fields
  validatePlantName();
  validateStartDate();
  validateEndDate();
  validateStartLeaves();
  validateEndLeaves();

  // If all inputs are valid, calculate the growth rate
  if (
    plantNameValid.valid &&
    startDateValid.valid &&
    endDateValid.valid &&
    startLeavesValid.valid &&
    endLeavesValid.valid
  ) {
    const plantName = document.getElementById("plant-name").value.trim();
    const startDate = new Date(document.getElementById("start-date").value);
    const endDate = new Date(document.getElementById("end-date").value);
    const startLeaves = parseInt(
      document.getElementById("start-leaves").value,
      10
    );
    const endLeaves = parseInt(document.getElementById("end-leaves").value, 10);

    try {
      const growthRate = calculateGrowthRate(
        startLeaves,
        endLeaves,
        startDate,
        endDate
      );

      if (growthRate !== undefined) {
        displayGrowthRate(plantName, growthRate);
      }
    } catch (error) {
      console.error("Error calculating growth rate:", error.message);
      alert("Error calculating growth rate. " + error.message);
    }
  }
}

// Validate that the end date is after the start date
function validateDates(startDate, endDate) {
  const differenceInTime = endDate.getTime() - startDate.getTime();
  if (differenceInTime <= 0) {
    throw new Error("End date must be after start date.");
  }
  return differenceInTime;
}

// Calculate the growth rate based on the given inputs
function calculateGrowthRate(startLeaves, endLeaves, startDate, endDate) {
  const differenceInTime = validateDates(startDate, endDate);
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  const numberOfMonths = differenceInDays / 30;

  return (endLeaves - startLeaves) / numberOfMonths;
}

// Display the calculated growth rate on the page
function displayGrowthRate(plantName, growthRate) {
  const resultContainer = document.getElementById("result-container");
  resultContainer.innerHTML = `<p>Your <b>${plantName}</b> is growing at a rate of <b>${growthRate.toFixed(
    2
  )} leaves per month 🪴</b></p>`;
}

// Set minimum and maximum dates for date input fields
function setMinimumAndMaximumDates() {
  const minDate = "1950-01-01";
  const today = new Date().toISOString().split("T")[0];

  document.getElementById("start-date").setAttribute("min", minDate);
  document.getElementById("end-date").setAttribute("min", minDate);

  document.getElementById("start-date").setAttribute("max", today);
  document.getElementById("end-date").setAttribute("max", today);
}

// Initialise date input fields with min and max values when the document is loaded
document.addEventListener("DOMContentLoaded", setMinimumAndMaximumDates);

// Canvas animation

// Initialise text animation on the canvas when the document is loaded
document.addEventListener("DOMContentLoaded", () => {
  animateText("🌱 6CO₂ + 6H₂O + ☀️ → C₆H₁₂O₆ + 6O₂ 🪴");
});

// Animate text on the canvas
function animateText(text) {
  const canvas = document.getElementById("text-animation-canvas");
  const context = canvas.getContext("2d");

  let x = canvas.width;
  const y = canvas.height / 2;
  const speed = 3;

  // Get text size based on the canvas width
  function getTextSize() {
    return canvas.width / 14;
  }

  // Get the width of the text based on the specified font size
  function getTextWidth(text, size) {
    context.font = `${size}px Quicksand`;
    return context.measureText(text).width;
  }

  // Update the canvas every 20 ms to animate the text
  setInterval(() => {
    const textSize = getTextSize();
    const textWidth = getTextWidth(text, textSize);

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.save();
    context.translate(x, y);
    context.font = `${textSize}px Quicksand`;
    context.fillStyle = "white";
    context.fillText(text, 0, 0);

    context.restore();

    x -= speed;
    if (x < -textWidth) {
      x = canvas.width;
    }
  }, 20);
}

// Adjust the size of the canvas based on its parent element
function adjustCanvasSize() {
  const canvas = document.getElementById("text-animation-canvas");
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = 250;
}

// Add event listeners to adjust the canvas size when the window is resized or loaded
window.addEventListener("resize", adjustCanvasSize);
window.addEventListener("load", adjustCanvasSize);

// Initialise elements and event handlers when the document is ready
$(document).ready(function () {
  const initialCanvas = document.getElementById("initial-chart");
  const initialContext = initialCanvas.getContext("2d");
  initialContext.font = "24px Quicksand";
  initialContext.fillStyle = "black";
  initialContext.textAlign = "center";
  initialContext.fillText(
    "Growth data will be displayed here",
    initialCanvas.width / 2,
    initialCanvas.height / 2
  );

  $("#plant-growth-chart").hide();
  $("#growth-rates-container").hide();

  const $projectC = $("#project-c");

  // Change cursor to a seedling image on mouseover
  $projectC.mouseover(function () {
    $(this).css("cursor", "url(seedling.png), auto");
  });

  // Revert cursor to default on mouseout
  $projectC.mouseout(function () {
    $(this).css("cursor", "default");
  });

  // Change background color of the plant name input field on focus
  $("#plant-name")
    .focus(function () {
      $(this).css("background-color", "#f9f7dc");
    })
    .blur(function () {
      $(this).css("background-color", "");
    });

  // Append initial growth rate message to result container
  $("#result-container").append(
    "<div>Growth rate will be displayed here 🌱</div>"
  );

  // Clear the form and reset the result container when the clear button is clicked
  $("#clear-button").click(function () {
    $("#growth-rate-form")[0].reset();

    $(".error").text("");

    $("#result-container").children().remove();

    $("#result-container").append(
      "<div>Growth rate will be displayed here 🌱</div>"
    );
  });
});

// Change the colour of result-container
let resultContainer = document.getElementById("result-container");
resultContainer.classList.add("resultContainer");

let styleSheet = document.createElement("style");
document.head.appendChild(styleSheet);

let sheet = styleSheet.sheet;
sheet.insertRule(
  ".resultContainer { background-color:rgb(187, 209, 155); }",
  0
);

// Toggle dark mode
function setUpDarkModeEventHandler() {
  // Asides variable defined in setUpDarkModeEventHandler scope
  const asides = document.querySelectorAll("aside"); 
  function toggleDarkMode() {
    asides.forEach((aside) => {
      // Using aside variable within toggleDarkMode scope
      aside.classList.toggle("dark-mode"); 
    });

    // Update button text based on mode
    if (asides[0].classList.contains("dark-mode")) {
      this.textContent = "Switch to Light Mode";
    } else {
      this.textContent = "Switch to Dark Mode";
    }
  }
  document
    .getElementById("toggle-dark-mode")
    // The toggleDarkMode scope uses the asides variable, but aside is defined in setUpDarkModeEventHandler scope
    .addEventListener("click", toggleDarkMode); 
  console.dir(toggleDarkMode);
  // A closure is added to the toggleDarkMode function that stores a copy of the asides variable
}

setUpDarkModeEventHandler();

