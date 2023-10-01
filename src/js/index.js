// Fetch

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": keys.API_KEY,
    "X-RapidAPI-Host": keys.API_HOST,
    "Content-Type": "application/json",
  },
};

const cityInput = document.getElementById("city-input");
const params = { cityName: "" };

cityInput.addEventListener("change", (event) => {
  params.cityName = event.target.value;
});

const btn = document.querySelector(".btn");

const callParams = () => {
  fetch(
    `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${params.cityName}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const info = data?.current;
      const currentTemperature = info?.temp_c;

      document.querySelector(".result").innerHTML = `
      <div class='info'>
          <h1 class='city-name'> ${params.cityName} :</h1>
          <li>
            <p> <span class='degrees'> ${currentTemperature}</span>°C</p>
          </li>
      </div>
                    
                      `;
    })
    .catch((err) => console.error(err));
  cityInput.value = "";
};
btn.addEventListener("click", callParams);

// Drag&Drop

const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".swim-lane");

draggables.forEach((task) => {
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
  });
});

droppables.forEach((zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();

    const bottomTask = insertAboveTask(zone, e.clientY);
    const curTask = document.querySelector(".is-dragging");

    if (!bottomTask) {
      zone.appendChild(curTask);
    } else {
      zone.insertBefore(curTask, bottomTask);
    }
  });
});

const insertAboveTask = (zone, mouseY) => {
  const els = zone.querySelectorAll(".task:not(.is-dragging)");

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  els.forEach((task) => {
    const { top } = task.getBoundingClientRect();

    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });

  return closestTask;
};
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoLane = document.getElementById("todo-lane");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value;

  if (!value) return;

  const newTask = document.createElement("p");
  newTask.classList.add("task");
  newTask.setAttribute("draggable", "true");
  newTask.innerText = value;

  newTask.addEventListener("dragstart", () => {
    newTask.classList.add("is-dragging");
  });

  newTask.addEventListener("dragend", () => {
    newTask.classList.remove("is-dragging");
  });

  todoLane.appendChild(newTask);

  input.value = "";
});
