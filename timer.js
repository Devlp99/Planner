document.addEventListener('DOMContentLoaded', function() {
    let timerInterval;
    let stopwatchInterval;
let timerSeconds = 0;
let stopwatchSeconds = 0;

// Function to update the timer display
function updateTimerDisplay() {
    const hours = Math.floor(timerSeconds / 3600);
    const minutes = Math.floor((timerSeconds % 3600) / 60);
    const seconds = timerSeconds % 60;
    document.getElementById('timerDisplay').textContent = 
        String(hours).padStart(2, '0') + ':' + 
        String(minutes).padStart(2, '0') + ':' + 
        String(seconds).padStart(2, '0');
}

// Function to update the stopwatch display
function updateStopwatchDisplay() {
    const hours = Math.floor(stopwatchSeconds / 3600);
    const minutes = Math.floor((stopwatchSeconds % 3600) / 60);
    const seconds = stopwatchSeconds % 60;
    document.getElementById('stopwatchDisplay').textContent = 
        String(hours).padStart(2, '0') + ':' + 
        String(minutes).padStart(2, '0') + ':' + 
        String(seconds).padStart(2, '0');
}

// Event listener for mode selection
document.querySelectorAll('input[name="mode"]').forEach((input) => {
    input.addEventListener('change', function() {
        if (this.value === 'timer') {
            document.getElementById('timerContainer').classList.remove('hidden');
            document.getElementById('stopwatchContainer').classList.add('hidden');
            resetTimer();
        } else {
            document.getElementById('timerContainer').classList.add('hidden');
            document.getElementById('stopwatchContainer').classList.remove('hidden');
            resetStopwatch();
        }
    });
});

// Timer functionality
document.getElementById('startButton').addEventListener('click', function() {
    const inputSeconds = parseInt(document.getElementById('timerInput').value);
    if (!isNaN(inputSeconds) && inputSeconds > 0) {
        timerSeconds = inputSeconds;
        updateTimerDisplay();
        clearInterval(timerInterval); // Clear any existing interval
        timerInterval = setInterval(() => {
            if (timerSeconds > 0) {
                timerSeconds--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                alert("Time's up!");
            }
        }, 1000);
    } else {
        alert("Please enter a valid number of seconds.");
    }
});

// Stopwatch functionality
document.getElementById('stopButton').addEventListener('click', function() {
    clearInterval(timerInterval);
});

document.getElementById('stopwatchStartButton').addEventListener('click', function() {
    clearInterval(stopwatchInterval); // Clear any existing interval
    stopwatchInterval = setInterval(() => {
        stopwatchSeconds++;
        updateStopwatchDisplay();
    }, 1000);
});

document.getElementById('stopwatchStopButton').addEventListener('click', function() {
    clearInterval(stopwatchInterval);
});

document.getElementById('stopwatchResetButton').addEventListener('click', function() {
    resetStopwatch();
});

    // Reset functions
    function resetTimer() {
        clearInterval(timerInterval);
        timerSeconds = 0;
        updateTimerDisplay();
        document.getElementById('timerInput').value = '';
    }

    function resetStopwatch() {
        clearInterval(stopwatchInterval);
        stopwatchSeconds = 0;
        updateStopwatchDisplay();
    }
});
