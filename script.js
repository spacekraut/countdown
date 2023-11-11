let session = {
  alarmTime: 25,
  isRunning: false,
};
let { alarmTime } = session;
let timer;

// Sound variable

$("#display-time").text(`${alarmTime}:00`);

//Set Session
const setSession = (session) => {
  $("#display-time").text(`
   ${alarmTime}:00`);
};
// Add and decrease Time
$("#add-time").click(() => {
  if (!isRunning) {
    session.alarmTime++;
    setSession(session);
  }
});

$("#decrease-time").click(() => {
  if (!isRunning && alarmTime > 1) {
    alarmTime--;
    setSession(session);
  }
});

//Format Time
const manageTime = (session) => {
  seconds = alarmTime * 60 - 1;
  remainedSeconds = seconds % 60;
  remainedMinutes = Math.floor(seconds / 60);
  return remainedMinutes, remainedSeconds;
};

// Toggle Buttons Hide/Show Reset/Start
const toggleButtons = (startBtn, resetBtn, isRunning) => {
  startBtn.toggle(!isRunning);
  resetBtn.toggle(isRunning);
};

$("#start-btn").click(() => {
  isRunning = true;
  toggleButtons($("#start-btn"), $("#reset-btn"), isRunning);
  startTimer(session);
});

$("#reset-btn").click(() => {
  $(".container").removeClass("changeColor");
  toggleButtons($("#start-btn"), $("#reset-btn"), false);
  isRunning = false;
  clearInterval(timer);
  $("#display-time").text(`${alarmTime}:00`);
  $("audio#audio")[0].pause();
});

//Animation CSS
const animationContainer = () => {
  const container = $(".container");
  container.css("animation", `changeColor ${alarmTime * 60}s linear`);
  container.addClass("changeColor");
};

//Start Timer
const startTimer = (session) => {
  animationContainer();
  manageTime(session);
  let timeLeft = alarmTime * 60;
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
      $("audio#audio")[0].play();
    }
  }, 1000);
};
