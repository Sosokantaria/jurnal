const addDays = document.getElementById("adddays");
const removeDays = document.getElementById("removeDays");
const totalDays = document.getElementById("totalDays");
const totalStudents = document.getElementById("totalStudents");
const missedLessons = document.getElementById("missedLessons");
const averageMark = document.getElementById("averageMark");
const tdParent = document.querySelectorAll(".tdParent");
const thParent = document.querySelector(".thParent");
const bottomAverages = document.querySelectorAll(".averageBottom");

totalStudents.innerHTML = tdParent.length;
let totalDaysArrayLength = 0;
let fildTdEllementsSum = 0;
let dateCount = 0;
let startDate;

addDays.addEventListener("click", () => {
  const thItem = document.createElement("th");
  thItem.className = "th-child";
  const getCalendarDays = addDate(startDate, dateCount + 1);
  thItem.innerHTML = `${getCalendarDays[thParent.childElementCount - 2]}`;
  thParent.appendChild(thItem);
  let counter = 0;
  tdParent.forEach((tdParent) => {
    const tdItem = document.createElement("td");
    tdItem.innerHTML = "0";
    tdItem.id = counter;
    counter++;
    tdItem.classList.add( "td-child") 
    tdParent.appendChild(tdItem);
  });
  dateCount++;
  totalDaysArrayLength++;
  calcTotalDays();
  calcMissedLessons();
  calcAverage();
});

tdParent.forEach((clickedTd) => {
  clickedTd.addEventListener("click", (event) => {
    if (event.target.classList.contains( "td-child")) {
      const tdInput = prompt();
      if (tdInput !== "" && tdInput !== null) {
        if (tdInput >= 0 && tdInput <= 5) {
          event.target.innerHTML = tdInput;
          event.target.style.backgroundColor = "green";
          event.target.classList.add("active")
        } else if (5 <= tdInput && tdInput <= 100) {
          event.target.innerHTML = 5;
          event.target.style.backgroundColor = "green";
          event.target.classList.add("active")
        } else if (tdInput > 100) {
          event.target.innerHTML = 0;
          return alert("enter smoler number");
        } else if (tdInput !== Number || tdInput < 0) {
          return alert("enter positive number");
        }
      }
    }
    calcMissedLessons();
    calcAverageMark();
    calcAverage();
  });
});

removeDays.addEventListener("click", () => {
  if (totalDaysArrayLength > 0) {
    totalDaysArrayLength--;
    thParent.lastChild.remove();
    tdParent.forEach((tdElement) => {
      tdElement.lastChild.remove();
    });
    calcTotalDays();
    calcMissedLessons();
    calcAverageMark();
    calcAverage();
  }
});

function calcTotalDays() {
  return (totalDays.innerHTML = totalDaysArrayLength);
}

function calcMissedLessons() {
  let missedLess = 0;
  const allTdEllement = document.querySelectorAll(".td-child");
  const allActiveEllements=document.querySelectorAll(".active")
  missedLessons.innerHTML = allTdEllement.length-allActiveEllements.length;
}

function calcAverageMark() {
  if (totalDaysArrayLength > 0) {
    let tdEllementsSum = 0;
    const allTdEllement = document.querySelectorAll(".td-child");
    allTdEllement.forEach((tdchild) => {
      tdEllementsSum += Number(tdchild.innerHTML);
    });
    averageMark.innerHTML = (tdEllementsSum / allTdEllement.length).toFixed(2);
  }
  if (totalDaysArrayLength === 0) {
    averageMark.innerHTML = 0;
  }
}

function calcAverage() {
  const table = document.querySelector("table");
  let sumOfTdRows = 0;
  let index = 0;
  while (index < bottomAverages.length) {
    for (let i = 0; i < totalDaysArrayLength; i++) {
      sumOfTdRows += Number(table.rows[index + 1].cells[i + 2].innerHTML);
      bottomAverages[index].innerHTML = (sumOfTdRows / totalDaysArrayLength).toFixed(2);
    }
    sumOfTdRows = 0;
    index++;
  }
  if (totalDaysArrayLength === 0) {
    bottomAverages.forEach((averege) => {
      averege.innerHTML = "0.00";
    });
  }
}

function addDate(startDate = new Date("2022-12-05"), num) {
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const result = [];
  let currentDate = new Date(startDate);
  let i = 0;
  while (i < num) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) {
      result.push([
        weekday[currentDate.getDay()],
        currentDate.getDate(),
        months[currentDate.getMonth()],
      ]);
      i++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return result;
}
