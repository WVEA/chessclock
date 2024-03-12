// script.js
let timer1 = document.getElementById('timer1');
let timer2 = document.getElementById('timer2');
let startPauseBtn = document.getElementById('startPauseBtn');
let resetBtn = document.getElementById('resetBtn');

let countdown1, countdown2;
let timer1Seconds = 5 * 60; // 5 minutes in seconds
let timer2Seconds = 5 * 60; // 5 minutes in seconds
let isTimer1Active = false;
let isTimer2Active = false;
let isGameStarted = false;

function updateDisplay() {
    timer1.textContent = `${Math.floor(timer1Seconds / 60)}:${('0' + timer1Seconds % 60).slice(-2)}`;
    timer2.textContent = `${Math.floor(timer2Seconds / 60)}:${('0' + timer2Seconds % 60).slice(-2)}`;
}

function switchTimer() {
    if (!isGameStarted) return;

    if (isTimer1Active) {
        clearInterval(countdown1);
        countdown2 = setInterval(() => {
            timer2Seconds--;
            updateDisplay();
            if (timer2Seconds <= 0) clearInterval(countdown2);
        }, 1000);
    } else {
        clearInterval(countdown2);
        countdown1 = setInterval(() => {
            timer1Seconds--;
            updateDisplay();
            if (timer1Seconds <= 0) clearInterval(countdown1);
        }, 1000);
    }
    isTimer1Active = !isTimer1Active;
    isTimer2Active = !isTimer2Active;
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        switchTimer();
    }
});

startPauseBtn.addEventListener('click', () => {
    isGameStarted = !isGameStarted;
    startPauseBtn.textContent = isGameStarted ? 'Pause' : 'Start';
    if (isGameStarted) {
        switchTimer();
    } else {
        clearInterval(countdown1);
        clearInterval(countdown2);
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(countdown1);
    clearInterval(countdown2);
    timer1Seconds = 5 * 60;
    timer2Seconds = 5 * 60;
    isTimer1Active = false;
    isTimer2Active = false;
    isGameStarted = false;
    startPauseBtn.textContent = 'Start';
    updateDisplay();
});

updateDisplay();
