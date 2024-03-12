let timer1 = document.getElementById('timer1');
let timer2 = document.getElementById('timer2');
let settingsBtn = document.getElementById('settingsBtn');
let modal = document.getElementById('settingsModal');
let closeBtn = document.querySelector(".close");
let applySettings = document.getElementById('applySettings');

let countdown;
let activeTimer = timer1; // Start with timer1
let timer1Seconds = 5 * 60; // Default 5 minutes
let timer2Seconds = 5 * 60; // Default 5 minutes

function updateDisplay() {
    timer1.textContent = `${Math.floor(timer1Seconds / 60)}:${('0' + timer1Seconds % 60).slice(-2)}`;
    timer2.textContent = `${Math.floor(timer2Seconds / 60)}:${('0' + timer2Seconds % 60).slice(-2)}`;
}

function switchTimer() {
    clearInterval(countdown);
    countdown = setInterval(() => {
        if (activeTimer === timer1) {
            timer1Seconds--;
            if (timer1Seconds <= 0) clearInterval(countdown);
        } else {
            timer2Seconds--;
            if (timer2Seconds <= 0) clearInterval(countdown);
        }
        updateDisplay();
    }, 1000);
    activeTimer = activeTimer === timer1 ? timer2 : timer1;
}

timer1.addEventListener('click', () => switchTimer());
timer2.addEventListener('click', () => switchTimer());

settingsBtn.onclick = () => modal.style.display = "block";
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = event => { if (event.target == modal) modal.style.display = "none"; }

applySettings.onclick = () => {
    let minutes = document.getElementById('minutes').value || 0;
    let seconds = document.getElementById('seconds').value || 0;
    timer1Seconds = timer2Seconds = parseInt(minutes) * 60 + parseInt(seconds);
    updateDisplay();
    modal.style.display = "none";
};

updateDisplay();
