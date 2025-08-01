const plantWateringMap = new Map();

let plantsToRemindToWaterArray = [];

const wateringRemindersListDiv = document.getElementById(
  "watering-reminders-list"
);

function renderDefaultMsg() {
  if (plantsToRemindToWaterArray.length == 0) {
    wateringRemindersListDiv.innerHTML = `
      <div id='reminders-placeholder'>
        <p id="reminders-placeholder-message"><strong>No reminders yet. Add your first watering reminder to keep your plants happy 🌱</strong></p>
      </div>`;
  }
}

const hasDefaultMsg = function () {
  const foundDefaultMsg = document.querySelector(
    "#watering-reminders-list #reminders-placeholder #reminders-placeholder-message"
  );
  if (foundDefaultMsg) {
    return true;
  }
  return false;
};

function clearDefaultMsg() {
  if (hasDefaultMsg()) {
    document
      .querySelector("#watering-reminders-list #reminders-placeholder")
      .remove();
  }
}

renderDefaultMsg();

function addPlantToMap(map, plantName, wateringInterval, imageUrl) {
  map.set(plantName, { wateringInterval, imageUrl });
}

addPlantToMap(
  plantWateringMap,
  "monstera",
  7,
  "https://images.pexels.com/photos/5858235/pexels-photo-5858235.jpeg?auto=compress&cs=tinysrgb&w=600"
);

addPlantToMap(
  plantWateringMap,
  "fiddle leaf fig",
  7,
  "https://images.unsplash.com/photo-1643819131782-474a409da244?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
);

addPlantToMap(
  plantWateringMap,
  "peace lily",
  5,
  "https://images.pexels.com/photos/12531511/pexels-photo-12531511.jpeg?auto=compress&cs=tinysrgb&w=800"
);

addPlantToMap(
  plantWateringMap,
  "golden pothos",
  10,
  "https://images.unsplash.com/photo-1595524147656-eb5d0a63e9a9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fHBvdGhvc3xlbnwwfHwwfHx8MA%3D%3D"
);

addPlantToMap(
  plantWateringMap,
  "heartleaf philodendron",
  7,
  "https://images.unsplash.com/photo-1611211233623-1b1e2162633f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTc1fHxwaGlsb2RlbmRyb24lMjBoZWFydGxlYWZ8ZW58MHx8MHx8fDA%3D"
);

addPlantToMap(
  plantWateringMap,
  "thai constellation",
  7,
  "https://images.pexels.com/photos/7193562/pexels-photo-7193562.jpeg?auto=compress&cs=tinysrgb&w=800e"
);

addPlantToMap(
  plantWateringMap,
  "string of pearls",
  14,
  "https://images.pexels.com/photos/12367419/pexels-photo-12367419.jpeg?auto=compress&cs=tinysrgb&w=800"
);

addPlantToMap(
  plantWateringMap,
  "raindrop peperomia",
  7,
  "https://images.pexels.com/photos/27818968/pexels-photo-27818968/free-photo-of-peperomia-polybotrya.jpeg?auto=compress&cs=tinysrgb&w=800"
);

addPlantToMap(
  plantWateringMap,
  "snake plant",
  14,
  "https://images.unsplash.com/photo-1611211232932-da3113c5b960?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhvdXNlcGxhbnR8ZW58MHx8MHx8fDA%3D"
);

addPlantToMap(
  plantWateringMap,
  "string of hearts",
  14,
  "https://images.unsplash.com/photo-1604396809760-940bda567881?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI0fHxpbmRvb3IlMjBwbGFudHxlbnwwfHwwfHx8MA%3D%3D"
);

addPlantToMap(
  plantWateringMap,
  "satin pothos",
  10,
  "https://images.unsplash.com/photo-1646355943389-259af793f21f?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
);

addPlantToMap(
  plantWateringMap,
  "dwarf umbrella tree",
  7,
  "https://images.pexels.com/photos/2624677/pexels-photo-2624677.jpeg?auto=compress&cs=tinysrgb&w=1200"
);

addPlantToMap(
  plantWateringMap,
  "polka dot begonia",
  7,
  "https://images.pexels.com/photos/9387470/pexels-photo-9387470.jpeg?auto=compress&cs=tinysrgb&w=800"
);

addPlantToMap(
  plantWateringMap,
  "green velvet alocasia",
  7,
  "https://images.pexels.com/photos/27745130/pexels-photo-27745130/free-photo-of-a-large-green-plant-with-white-leaves.jpeg?auto=compress&cs=tinysrgb&w=800"
);

addPlantToMap(
  plantWateringMap,
  "marble queen pothos",
  10,
  "https://images.unsplash.com/photo-1599224473702-3e955ef70efe?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTF8fHBvdGhvc3xlbnwwfHwwfHx8MA%3D%3D"
);

addPlantToMap(
  plantWateringMap,
  "anthurium clarinervium",
  7,
  "https://images.pexels.com/photos/4953083/pexels-photo-4953083.jpeg?auto=compress&cs=tinysrgb&w=1200"
);

function countPlantsInMap(map) {
  let plantCount = 0;
  for (let plant in Object.fromEntries(map)) {
    plantCount += 1;
  }
  console.warn(`There are ${plantCount} plants in the map.`);
}

countPlantsInMap(plantWateringMap);

function populatePlantDatalist(map) {
  const plantDatalist = document.getElementById("plant-datalist");
  for (const [plantName] of map) {
    const optionElement = document.createElement("option");
    optionElement.value = capitalisePlantName(plantName);
    plantDatalist.appendChild(optionElement);
  }
}

populatePlantDatalist(plantWateringMap);

function addPlantReminder(plantName) {
  const plantDetails = plantWateringMap.get(plantName);
  const wateringInterval = plantDetails.wateringInterval;
  const imageUrl = plantDetails.imageUrl;

  const nextWateringDate = calculateNextWateringDate(wateringInterval);
  const capitalisedPlantName = capitalisePlantName(plantName);
  const reminderMessage = createReminderMessage(
    capitalisedPlantName,
    wateringInterval,
    nextWateringDate
  );

  const reminderElementDiv = createReminderElement(
    capitalisedPlantName,
    reminderMessage,
    imageUrl
  );

  insertReminderElement(reminderElementDiv);
}

function calculateNextWateringDate(wateringInterval) {
  const today = new Date();
  const nextWateringDate = new Date(today);
  nextWateringDate.setDate(today.getDate() + wateringInterval);
  return nextWateringDate;
}

function createReminderMessage(plantName, wateringInterval, nextWateringDate) {
  return `<p style="line-height: 1.7;">Your <strong>${plantName}</strong> needs watering every <strong>${wateringInterval} days</strong> <br>
          Next watering: <strong>${nextWateringDate.toDateString()}</strong>`;
}

function createReminderElement(plantName, message, imageUrl) {
  const reminderElementDiv = document.createElement("div");
  const reminderElementP = document.createElement("p");
  reminderElementP.innerHTML = message;

  const plantImage = document.createElement("img");
  plantImage.src = imageUrl;
  plantImage.alt = plantName;
  plantImage.classList.add("plant-reminder-image");

  reminderElementDiv.appendChild(plantImage);
  reminderElementDiv.appendChild(reminderElementP);

  return reminderElementDiv;
}

function insertReminderElement(reminderElementDiv) {
  wateringRemindersListDiv.insertBefore(
    reminderElementDiv,
    wateringRemindersListDiv.firstChild
  );
}

function renderPlantWateringReminders() {
  let i = 0;
  while (i < plantsToRemindToWaterArray.length) {
    const plantNameArrayElement = plantsToRemindToWaterArray[i];
    const plantReminderExists = Array.from(
      wateringRemindersListDiv.children
    ).find((child) =>
      child.textContent
        .toLowerCase()
        .includes(plantNameArrayElement.toLowerCase())
    );
    if (!plantReminderExists) {
      addPlantReminder(plantNameArrayElement);
    }
    i++;
  }
}

function capitalisePlantName(name) {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function handleFormSubmit(event) {
  event.preventDefault();

  clearDefaultMsg();

  const plantNameInputElement = document.getElementById("plant-name-input");
  const plantNameInputValue = plantNameInputElement.value.trim().toLowerCase();

  if (plantWateringMap.has(plantNameInputValue)) {
    const plantIndex = plantsToRemindToWaterArray.indexOf(plantNameInputValue);

    if (plantIndex !== -1) {
      showPlantAlert(plantNameInputValue, true);
    } else {
      plantsToRemindToWaterArray.push(plantNameInputValue);
      renderPlantWateringReminders();
    }
  } else {
    showPlantAlert(plantNameInputValue, false);
  }

  plantNameInputElement.value = "";
}

function showPlantAlert(plantNameInputValue, isInWateringSchedule) {
  if (isInWateringSchedule) {
    window.alert(
      `"${capitalisePlantName(
        plantNameInputValue
      )}" is already in the watering schedule.`
    );
  } else {
    window.alert(
      `Watering reminder is not available for "${plantNameInputValue}". Please try another plant.`
    );
  }
}

function handleClearReminders(event) {
  event.preventDefault();
  wateringRemindersListDiv.innerHTML = "";
  plantsToRemindToWaterArray = [];
  renderDefaultMsg();
}

function compareNextWateringDates(a, b, plantWateringMap) {
  const today = new Date();
  const aNextWateringDate = new Date(today);
  aNextWateringDate.setDate(
    today.getDate() + plantWateringMap.get(a).wateringInterval
  );

  const bNextWateringDate = new Date(today);
  bNextWateringDate.setDate(
    today.getDate() + plantWateringMap.get(b).wateringInterval
  );

  return bNextWateringDate - aNextWateringDate;
}

function handleSortReminders(event) {
  event.preventDefault();

  if (!hasDefaultMsg()) {
    wateringRemindersListDiv.innerHTML = "";

    let sortedplantsToRemindToWaterArray = plantsToRemindToWaterArray.sort(
      (a, b) => compareNextWateringDates(a, b, plantWateringMap)
    );

    let i = 0;
    while (i < sortedplantsToRemindToWaterArray.length) {
      const plantsToRemindToWaterArrayElement = plantsToRemindToWaterArray[i];
      addPlantReminder(plantsToRemindToWaterArrayElement);
      i++;
    }
  }
}

document
  .getElementById("watering-reminders-form")
  .addEventListener("submit", handleFormSubmit, false);

document
  .getElementById("clear-reminders-btn")
  .addEventListener("click", handleClearReminders);

document
  .getElementById("sort-reminders-btn")
  .addEventListener("click", handleSortReminders);

