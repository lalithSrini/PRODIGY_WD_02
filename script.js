let startTime;
let elapsedTime = 0;
let timerInterval;

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    displayTime(elapsedTime);
  }, 10);
  toggleButtons(true);
}

function pause() {
  clearInterval(timerInterval);
  toggleButtons(false);
}

function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  displayTime(elapsedTime);
  document.getElementById("laps").innerHTML = "";
  toggleButtons(false);
}

function lap() {
  const lapTime = elapsedTime;
  const li = document.createElement("li");
  li.innerText = formatTime(lapTime);
  document.getElementById("laps").appendChild(li);
}

function displayTime(time) {
  const formattedTime = formatTime(time);
  document.getElementById("display").innerText = formattedTime;
}

function formatTime(time) {
  let ms = time % 1000;
  time = (time - ms) / 1000;
  let secs = time % 60;
  time = (time - secs) / 60;
  let mins = time % 60;
  let hrs = (time - mins) / 60;

  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}.${pad(ms, 3)}`;
}

function pad(num, size = 2) {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

function toggleButtons(running) {
  document.getElementById("startStop").innerText = running ? "Stop" : "Start";
  document.getElementById("pauseResume").innerText = running ? "Pause" : "Resume";
  document.getElementById("lap").disabled = !running;
}

document.getElementById("startStop").addEventListener("click", function () {
  if (timerInterval) {
    pause();
  } else {
    start();
  }
});

document.getElementById("reset").addEventListener("click", function () {
  reset();
});

document.getElementById("lap").addEventListener("click", function () {
  lap();
});
