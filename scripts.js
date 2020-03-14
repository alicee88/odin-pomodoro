let countdown;
const timerDisplay = document.querySelector('.timer');
const playButton = document.querySelector('.play');
const pauseButton = document.querySelector('.pause');
const resetButton = document.querySelector('.reset');
const activityDisplay = document.querySelector('.activity');
const tomatoCounters = document.querySelectorAll('.counter');

let workTime = 25 * 60;
let shortBreakTime = 5 * 60;
let longBreakTime = 30 * 60;
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
      }, 1000);
}

function switchActivity() {
    clearInterval(countdown);
    isBreak = !isBreak;
    let newTime; 

    if(numPomodoros >= 4) {
      numPomodoros = 0;
      isBreak = true;
      
      // Start longer break time
      newTime = longBreakTime;
    
    } else {
      if(isBreak) {
        // Start short break
        newTime = shortBreakTime;
        
      } else {
        numPomodoros = numPomodoros + 1;
        newTime = workTime;
      }
    }

    displayPomodoros();

    isBreak ? activityDisplay.textContent = 'Break' : activityDisplay.textContent = 'Work';
    secondsLeft = newTime;
    timer(newTime);

}

function displayPomodoros() {

    let i = 0;
    tomatoCounters.forEach(counter => {
      counter.classList.remove('complete-pomodoro');
      if(i < numPomodoros) {
        counter.classList.add('complete-pomodoro');
      }
      i = i + 1;
    });

}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
    
  }

  function startTimer() {
    clearInterval(countdown);

    if(!secondsLeft) secondsLeft = workTime;

    if(activityDisplay.textContent === 'Pomodoro') {
      activityDisplay.textContent = 'Work';
    }
  
    timer(secondsLeft);
  }

  function pauseTimer() {
    clearInterval(countdown);
  }

  function resetTimer() {
    clearInterval(countdown);
    isBreak = false;
    // Remember how many seconds are remaining
    secondsLeft = workTime;
    displayTimeLeft(workTime);
    numPomodoros = 0;
    tomatoCounters.forEach(counter => counter.classList.remove('complete-pomodoro'));
    activityDisplay.textContent = 'Pomodoro';
  }

  function updateSettings(work, shortBreak, longBreak) {
  
    workTime = work * 60;
    shortBreakTime = shortBreak * 60;
    longBreakTime = longBreak * 60;

    resetTimer();

  }

  playButton.addEventListener('click', startTimer);
  pauseButton.addEventListener('click', pauseTimer);
  resetButton.addEventListener('click', resetTimer);

  document.settingsForm.addEventListener('submit', function(e) {
    e.preventDefault();
    updateSettings(this.workMins.value, this.shortBreakMins.value, this.longBreakMins.value);
  });