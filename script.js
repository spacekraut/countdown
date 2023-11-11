let alarmTime= 25
let timer;
let isRunning= false
// Sound variable

$("#display-time").text(`${alarmTime}:00`);

//Set Session
const setSession = (alarmTime) => {
  $("#display-time").text(`
   ${alarmTime}:00`);
};
// Add and decrease Time
$("#add-time").click(() => {
  if (!isRunning) {
   
    alarmTime++;
    setSession(alarmTime);
  }
});

$("#decrease-time").click(() => {
  if (!isRunning && alarmTime > 1) {
    alarmTime--;
    setSession(alarmTime);
  }
});

//Format Time
const manageTime = (alarmTime) => {
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
  startTimer(alarmTime);
});

$("#reset-btn").click(() => {
  $(".container").toggleClass("changeColor");
  toggleButtons($("#start-btn"), $("#reset-btn"), false);
  isRunning = false;
  clearInterval(timer);
  $("#display-time").text(`${alarmTime}:00`);
  $("audio#audio")[0].pause();
});




const startTimer = (alarmTime) =>{

  manageTime(alarmTime);
  let timeLeft = alarmTime * 60;
  
   //Animation
  $(".container").css("animation-duration", `${alarmTime * 60}s`);
  $(".container").toggleClass("changeColor");
  
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
      $(".container").toggleClass("changeColor");
    }
  }, 1000);
};
