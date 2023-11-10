let session = {
  alarmTime: 25,
};

let timer;
let isRunning = false;

$("#display-time").text(`${session.alarmTime}:00`);

//Set Session
const setSession = (session) => {
  $("#display-time").text(`
   ${session.alarmTime} min`);
};

// Add and decrease Time
$("#add-time").click(function () {
  session.alarmTime++;
  setSession(session);
});

$("#decrease-time").click(function () {
  session.alarmTime--;
  setSession(session);
});

//Format Time
function manageTime(session) {
  seconds = session.alarmTime * 60 - 1;
  remainedSeconds = seconds % 60;
  remainedMinutes = Math.floor(seconds / 60);
  return remainedMinutes, remainedSeconds;
}

// Start countdown timer
$("#start-btn").click(() => {
  startTimer(session);
});
const startTimer = (session) => {
  manageTime(session);
  let timeLeft = session.alarmTime * 60;
  timer = setInterval(() => {
    timeLeft--;
    if (timeLeft >= 0) {
      second = timeLeft % 60;
      minute = Math.floor(timeLeft / 60);
      $("#display-time").text(
        `${minute < 10 ? "0" + minute : minute} : ${
          second < 10 ? "0" + second : second
        }`
      );
    } else {
      clearInterval(timer);
    }
  }, 100);
};

// Reset Timer Function
const resetTimer = () => {
  $("#display-time").text(session.alarmTime);
  clearInterval(timer);
};

const start = () => { 
  isRunning = true;
  startTimer(session.alarmTime);
  startBtn.style.display = "none";
  resetBtn.style.display = "flex";
};

const reset = () => {
  startBtn.style.display = "flex";
  resetBtn.style.display = "none";
  isRunning = false;
  clearInterval(timer);
  Screen.classList.remove("changeColor");
  Screen.textContent = `${session.alarmTime}:00`;
};
