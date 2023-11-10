let session = {
  alarmTime: 1,
};

let timer;
let isRunning = false;
// Sound variable

$("#display-time").text(`${session.alarmTime}:00`);

//Set Session
const setSession = (session) => {
  $("#display-time").text(`
   ${session.alarmTime} min`);
};

// Add and decrease Time
$("#add-time").click(() => {
  if (!isRunning) {
    session.alarmTime++;
    setSession(session);
  }
});

$("#decrease-time").click(() => {
  if (!isRunning && session.alarmTime > 1) {
    session.alarmTime--;
    setSession(session);
  }
});

//Format Time
const manageTime = (session) => {
  seconds = session.alarmTime * 60 - 1;
  remainedSeconds = seconds % 60;
  remainedMinutes = Math.floor(seconds / 60);
  return remainedMinutes, remainedSeconds;
};

// Toggle Buttons Hide/Show Reset/Start
$("#start-btn").click(() => {
  isRunning = true;
  $("#start-btn").hide("slow");
  $("#reset-btn").show("slow");
  startTimer(session);
});
$("#reset-btn").click(() => {
  $(".container").removeClass("changeColor");
  $("#reset-btn").hide("slow");
  $("#start-btn").show("slow");
  isRunning = false;
  clearInterval(timer);
  $("#display-time").text(`${session.alarmTime}:00`);
  $("audio#audio")[0].pause();
});

//Start Timer
const startTimer = (session) => {
  $(".container").addClass("changeColor");
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
      $("audio#audio")[0].play();
    }
  }, 1000);
};
