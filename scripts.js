let countdown;
const timerDisplay = document.querySelector('.timer');
const playButton = document.querySelector('.play');
const pauseButton = document.querySelector('.pause');
const resetButton = document.querySelector('.reset');
const activityDisplay = document.querySelector('.activity');
const tomatoCounters = document.querySelectorAll('.counter');

let workTime = 25;
let shortBreakTime = 5;
let longBreakTime = 30;
let isBreak = false;
let numPomodoros = 0;

let secondsLeft;

function timer(seconds) {

    displayTimeLeft(seconds);

    countdown = setInterval(() => {

        secondsLeft = secondsLeft - 1;
        // check if we should stop it!
        if(secondsLeft < 0) {
          switchActivity();
          return;
        }
        // display it
        displayTimeLeft(secondsLeft);
      }, 250);
}

function switchActivity() {
  console.log("SWITCHING ACTIVITY!");
  clearInterval(countdown);
  isBreak = !isBreak;
  let newTime; 

  if(numPomodoros >= 4) {
    console.log("FINISHED!");
    numPomodoros = 0;
    isBreak = true;
    
    // Start longer break time
    newTime = longBreakTime * 60;
  
  } else {
    if(isBreak) {
      console.log("STARTING SHORT BREAK ");
      // Start short break
      newTime = shortBreakTime * 60;
      
    } else {
      console.log("STARTING WORK TIME ");
      numPomodoros = numPomodoros + 1;
      newTime = workTime * 60;
    }
  }

  let i = 0;
  tomatoCounters.forEach(counter => {
    if(i < numPomodoros) {
      counter.classList.add('complete-pomodoro');
      console.log("ADDING COMPLETE POMODORO");
    }
    i = i + 1;
  });

  isBreak ? activityDisplay.textContent = 'Break' : activityDisplay.textContent = 'Work';
  secondsLeft = newTime;
  timer(newTime);

}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
    
  }

  function startTimer() {
    const seconds = workTime * 60;
    if(!secondsLeft) secondsLeft = seconds;
    timer(secondsLeft);
  }

  function pauseTimer() {
    clearInterval(countdown);
  }

  function resetTimer() {
    clearInterval(countdown);
    const seconds = workTime * 60;
    isBreak = false;
    secondsLeft = seconds;
    displayTimeLeft(seconds);
  }

  playButton.addEventListener('click', startTimer);
  pauseButton.addEventListener('click', pauseTimer);
  resetButton.addEventListener('click', resetTimer);

  document.settingsForm.addEventListener('submit', function(e) {
    e.preventDefault();

    workTime = this.workMins.value;
    shortBreakTime = this.shortBreakMins.value;
    longBreakTime = this.longBreakMins.value;

    displayTimeLeft(workTime * 60);
    secondsLeft = workTime * 60;
    

    // const mins = this.minutes.value;
    // console.log(mins);
    // timer(mins * 60);
    // this.reset();
  });