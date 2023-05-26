const intervalIdArr = [];
const counter = document.getElementById("d-day-counter");
const messageContainer = document.getElementById("d-day-message");
counter.style.display = "none";
messageContainer.innerHTML = "<h2>D-Day를 입력해 주세요.</h2>";

const dateFormMaker = function () {
  const inputYear = document.querySelector("#target-year-input").value;
  const inputMonth = document.querySelector("#target-month-input").value;
  const inputDate = document.querySelector("#target-date-input").value;

  // const dateFormat = inputYear + '-' + inputMonth + '-' + inputDate;
  const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;
  return dateFormat;
};

const counterMaker = function () {
  const targetDateInput = dateFormMaker();
  const nowDate = new Date();
  const targetDate = new Date(targetDateInput).setHours(0, 0, 0, 0);
  const remain = (targetDate - nowDate) / 1000;

  if (remain <= 0) {
    counter.style.display = "none";
    messageContainer.innerHTML = "<h3>타이머가 종료되었습니다.</h3>";
    messageContainer.style.display = "flex";
    setClearInterval();
    return;
  } else if (isNaN(remain)) {
    counter.style.display = "none";
    messageContainer.innerHTML = "<h3>유효한 시간대가 아닙니다.</h3>";
    messageContainer.style.display = "flex";
    setClearInterval();
    return;
  }

  const remainObj = {
    date: Math.floor(remain / 3600 / 24),
    dateHour: Math.floor((remain / 3600) % 24),
    dateMin: Math.floor(remain / 60) % 60,
    dateSec: Math.floor(remain) % 60,
  };

  const documentArr = ["day", "hour", "min", "sec"];
  const timeKeys = Object.keys(remainObj);

  let i = 0;
  for (let tag of documentArr) {
    document.getElementById(tag).textContent = remainObj[timeKeys[i]];
    i++;
  }
};

const starter = function () {
  counter.style.display = "flex";
  messageContainer.style.display = "none";
  counterMaker();
  const intervalId = setInterval(counterMaker, 1000);
  intervalIdArr.push(intervalId);
};

const setClearInterval = function () {
  for (let i = 0; i < intervalIdArr.length; i++) {
    clearInterval(intervalIdArr[i]);
  }

  messageContainer.InnerHTML = "<h2>D-Day를 입력해 주세요.</h2>";
  messageContainer.style.display = "flex";
};
