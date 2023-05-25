const consoleTool = () => {
  console.log("실행");
};

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
  console.log(targetDateInput);
  const nowDate = new Date();
  const targetDate = new Date(targetDateInput).setHours(0, 0, 0, 0);
  const remain = (targetDate - nowDate) / 1000;

  if (remain <= 0) {
    console.log("타이머 종료");
  } else if (isNaN(remain)) {
    console.log("유효한 시간대가 아닙니다.");
    // 만약 잘못된 날짜가 들어왔다면, 유효한 시간대가 아니다.
  }

  const date = Math.floor(remain / 3600 / 24);
  const dateHour = Math.floor((remain / 3600) % 24);
  const dateMin = Math.floor(remain / 60) % 60;
  const dateSec = Math.floor(remain) % 60;

  document.getElementById("target-selector");
  document.getElementById("target-date-input");
  document.getElementById("target-");

  console.log(dateHour);
  console.log(dateMin);
  console.log(dateSec);
};
