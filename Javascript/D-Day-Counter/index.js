const consoleTool = () =>{
    console.log("실행");
}

const dateFormMaker = function() {

    const inputYear = document.querySelector('#target-year-input').value;
    const inputMonth = document.querySelector('#target-month-input').value;
    const inputDate = document.querySelector('#target-date-input').value;

    // const dateFormat = inputYear + '-' + inputMonth + '-' + inputDate;
    const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;

    return dateFormat;
}

const counterMaker = function(){

    const targetDateInput = dateFormMaker();
    console.log(targetDateInput);
    const nowDate = new Date();
    const targetDate = new Date();
    const remain = (targetDate - nowDate) / 1000;

    const date = Math.floor(remain / 3600 / 24);
    const dateHour = Math.floor(remain / 3600 % 24);
    const dateMin = Math.floor(remain / 60) % 60;
    const dateSec = Math.floor(remain) % 60;

    console.log(dateHour);
    console.log(dateMin);
    console.log(dateSec);

}