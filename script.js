//Initial variables
let alarmTime = 25;
let timer;
let isRunning = false;

// Render Default Time at Screen
$("#display-time").text(`${alarmTime}:00`);

//Set Session
const setSession = () => {
  $("#display-time").text(`
   ${alarmTime}:00`);
};
// Update Time to Display
const updateTime = () => {
  $("#display-time").text(
    `${remainedMinutes < 10 ? "0" + remainedMinutes : remainedMinutes} : ${
      remainedSeconds < 10 ? "0" + remainedSeconds : remainedSeconds
    }`
  );
};

//Handle Click Increase Time Btn
$("#add-time").click(() => {
  if (!isRunning) {
    alarmTime++;
    setSession(alarmTime);
  }
});
//Handle Click Decrease Time Btn
$("#decrease-time").click(() => {
  if (!isRunning && alarmTime > 1) {
    alarmTime--;
    setSession(alarmTime);
  }
});

//Manage Time
const manageTime = () => {
  remainingSeconds = alarmTime * 60 - 1;
  remainingMinutes = Math.floor(remainingSeconds / 60);
  remainingSeconds %= 60;
  return remainingMinutes, remainingSeconds;
};

// Toggle Buttons Hide/Show Reset/Start
const toggleButtons = (startBtn, resetBtn, isRunning) => {
  startBtn.toggle(!isRunning);
  resetBtn.toggle(isRunning);
};

$("#start-btn").click(() => {
  isRunning = true;
  toggleButtons($("#start-btn"), $("#reset-btn"), isRunning);
  setAnimation();
  startTimer(alarmTime);
});

$("#reset-btn").click(() => {
  $(".container").removeClass("changeColor");
  toggleButtons($("#start-btn"), $("#reset-btn"), false);
  isRunning = false;
  clearInterval(timer);
  $("#display-time").text(`${alarmTime}:00`);
  $("audio#audio")[0].pause();
});

// Handle Animation for container (CSS)
const setAnimation = () => {
  if (isRunning) {
    $(".container").css("animation-duration", `${alarmTime * 60}s`);
    $(".container").addClass("changeColor"); // Add the class to start the animation
  }
};

// Start Timer
const startTimer = (alarmTime) => {
  manageTime(alarmTime);
  let timeLeft = alarmTime * 60;
  timer = setInterval(() => {
    timeLeft--;
    if (timeLeft >= 0) {
      remainedSeconds = timeLeft % 60;
      remainedMinutes = Math.floor(timeLeft / 60);
      updateTime();
    } else {
      clearInterval(timer);
      $("audio#audio")[0].play();
      $(".container").toggleClass("changeColor");
    }
  }, 1000);
};
