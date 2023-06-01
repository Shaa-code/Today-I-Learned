const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const savedTodoList = JSON.parse(localStorage.getItem("saved-items"));

const createTodo = function (storageData) {
  let todoContents = todoInput.value;

  if (storageData) {
    todoContents = storageData.contents;
  }

  const newLi = document.createElement("li");
  const newSpan = document.createElement("span");
  const newBtn = document.createElement("button");

  newBtn.addEventListener("click", () => {
    newLi.classList.toggle("complete");
    saveItemsFn();
  });

  newLi.addEventListener("dblclick", () => {
    newLi.remove();
    saveItemsFn();
  });

  if (storageData && storageData.complete === true) {
    newLi.classList.add("complete");
  }

  newSpan.textContent = todoContents;
  newLi.appendChild(newBtn);
  newLi.appendChild(newSpan);
  todoList.appendChild(newLi);

  todoInput.value = "";
  saveItemsFn();
};

const checkInput = function () {
  if (window.event.keyCode === 13 && todoInput.value.trim() !== "") {
    createTodo();
  }
};

const deleteAll = function () {
  const liList = document.querySelectorAll("li");
  for (let i = 0; i < liList.length; i++) {
    liList[i].remove();
  }
  saveItemsFn();
};

const saveItemsFn = function () {
  let saveItems = [];
  for (let i = 0; i < todoList.children.length; i++) {
    const todoObj = {
      contents: todoList.children[i].querySelector("span").textContent,
      complete: todoList.children[i].classList.contains("complete"),
    };
    saveItems.push(todoObj);
  }

  // if (saveItems.length === 0) {
  //   localStorage.removeItem("saved-items");
  // } else {
  //   localStorage.setItem("saved-items", JSON.stringify(saveItems));
  // }

  saveItems.length === 0
    ? localStorage.removeItem("saved-items")
    : localStorage.setItem("saved-items", JSON.stringify(saveItems));
};

if (savedTodoList) {
  for (let i = 0; i < savedTodoList.length; i++) {
    createTodo(savedTodoList[i]);
  }
}

const askForLocation = function () {
  navigator.geolocation.getCurrentPosition(accessToGeo, (err) => {
    console.log(err);
  });
};

const weatherDataActive = function ({ location, weather }) {
  const weatherMainList = [
    "Clear",
    "Clouds",
    "Drizzle",
    "Rain",
    "Snow",
    "Thunderstorm",
  ];
  weather = weatherMainList.includes(weather) ? weather : "Fog";

  const locationNameTag = document.getElementById("location-name-tag");
  locationNameTag.textContent = location;
  document.body.style.backgroundImage = `url(./img/${weather}.jpg)`;

  if (
    !savedWeatherData ||
    savedWeatherData.location !== location ||
    savedWeatherData.weather !== weather
  ) {
    localStorage.setItem(
      "saved-weather",
      JSON.stringify({ location, weather })
    );
  }
};

const weatherSearch = function ({ latitude, longitude }) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=419c399cda692250000b76339fa7e466`
  )
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((json) => {
      const weatherData = {
        location: json.name,
        weather: json.weather[0].main,
      };
      weatherDataActive(weatherData);
    })
    .catch((err) => {
      console.error(err);
    });
};

const accessToGeo = function ({ coords }) {
  const { latitude, longitude } = coords;
  //Shorthand Property
  const positionObj = {
    latitude,
    longitude,
  };

  weatherSearch(positionObj);
};

askForLocation();

const promiseTest = function () {
  return new Promise((resolver, reject) => {
    setTimeout(() => {
      resolver("success");
    }, 1000);
  });
};

promiseTest().then((res) => {
  console.log(res);
});

let arr = [1, 2, 3, 4, 5];
console.log(...arr);
