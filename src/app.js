// Application state
let gameState = {
    mode: 'numbers',
    inputMode: 'numbers', // 'numbers' or 'names'
    maxNumber: 10,
    timeInterval: 5,
    currentNumbers: [],
    currentIndex: 0,
    counters: {},
    timer: null,
    timeLeft: 0,
    isPaused: false,
    sessionStartTime: null,
    topics: [],
    currentTopics: [],
    showTopics: true,
    soundEnabled: true,
    animationsEnabled: true,
    names: [],
    currentNames: [],
    topicMappings: {} // Maps each number/name to its topic
};

// Sound effects
const sounds = {
    click: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmFgU7k9n1unEiBC13yO/eizEIHWq+8+OWT' +
        'AkPU6zq8LVjGAUdbo/Qz9aKvOrfkUELLnfI6trXhzwJHWi77OyfThEQUKrn77VkGAU7k9j1unEhBTGV5e2uZRgIVL7z1mEaBlOo3+OvdCAHa9Hy0G4dCFyq3OavdSAHa9Hy0G4dCFyq3OavdSAHa9Hy0G4dCFyq3OavdSAHa9Hy0G4dCFyq3OavdSAHa9Hy0G4dCFyq3OavdSAHa9Hy0G4dCFyq3OavdSAHa9Hy0G4dCFyq3OavdSAHa9Hy0G4dCFyq3OavdSAHa9Hy0G4dCFyq3OavdSAHa9Hy0G4dCFyq3OavdSAHa9Hy0G4dCFyq3OavdSAHa9Hy0G4dCFyq3OavdSAHa9Hy0G4dCFyq3OavdSAHa9Hy0G4dCFyq3OavdSAHa9Hy0G4dCFyq3OavdSAHa9Fy0G4dC' +
        'Fyq3OavdSAHa9Hy0G4dCFyq3OavdSAHa9Hy0G4dCFyq3OavdSAHa9Hy0G4dCFyq3OavdSAHa9Hy0G4dCFyq3OavdSAHa9Hy0G4dCFyq3OavdSAHa9Hy0G4dCFyq3OavdSAHa9Hy0G4dCFyq3OeufR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nMdBVuq3+OudR8GbNPz1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbdPz1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBluq3+OudR8GbNPv1nIdBQ=='),
    success: new Audio('data:audio/wav;base64,UklGRiQCAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQACAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgA==')
};

// Initialize the app
function initializeApp() {
    loadSettings();
    loadSavedData();
    updateDisplay();
}

// Mode selection
function selectMode(mode) {
    gameState.mode = mode;
    if (mode === 'numbers') {
        showPhase('setup');
    } else if (mode === 'memory') {
        showPhase('memory-setup');
    } else {
        // Placeholder for other modes
        alert(`${mode.charAt(0).toUpperCase() + mode.slice(1)} mode coming soon!`);
    }
}

// Go back to mode selection
function backToModeSelection() {
    showPhase('mode-selection');
    resetSession();
}

// Save data to localStorage
function saveData() {
    try {
        localStorage.setItem('learningHubData', JSON.stringify({
            lastSession: gameState,
            timestamp: new Date().toISOString()
        }));
    } catch (e) {
        console.log('Could not save to localStorage:', e);
    }
}

// Load data from localStorage
function loadSavedData() {
    try {
        const saved = localStorage.getItem('learningHubData');
        if (saved) {
            const data = JSON.parse(saved);
            if (data.lastSession) {
                document.getElementById('maxNumber').value = data.lastSession.maxNumber || 10;
                document.getElementById('timeInterval').value = data.lastSession.timeInterval || 5;
            }
        }
    } catch (e) {
        console.log('Could not load from localStorage:', e);
    }
}

// Load settings
function loadSettings() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    const soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
    const animationsEnabled = localStorage.getItem('animationsEnabled') !== 'false';
    
    document.body.classList.toggle('dark-mode', darkMode);
    document.getElementById('darkModeToggle').checked = darkMode;
    document.getElementById('soundToggle').checked = soundEnabled;
    document.getElementById('animationsToggle').checked = animationsEnabled;
    
    gameState.soundEnabled = soundEnabled;
    gameState.animationsEnabled = animationsEnabled;
}

// Start a new practice session
function startPractice() {
    const inputMode = document.querySelector('input[name="mode"]:checked').value;
    const interval = parseInt(document.getElementById('timeInterval').value);
    const topicsInput = document.getElementById('topicsInput').value;
    const showTopics = document.getElementById('showTopics').checked;

    if (interval < 1 || interval > 300) {
        alert('Please enter an interval between 1 and 300 seconds');
        return;
    }

    let items = [];
    let itemKeys = [];
    
    if (inputMode === 'numbers') {
        const maxNum = parseInt(document.getElementById('maxNumber').value);
        if (maxNum < 2 || maxNum > 100) {
            alert('Please enter a number between 2 and 100');
            return;
        }
        items = [...Array(maxNum)].map((_, i) => i + 1);
        itemKeys = items.map(i => i.toString());
    } else {
        // Names mode
        const namesInput = document.getElementById('namesInput').value;
        const names = namesInput.split(',').map(n => n.trim()).filter(n => n.length > 0);
        if (names.length < 2) {
            alert('Please enter at least 2 names separated by commas');
            return;
        }
        items = names;
        itemKeys = names;
    }

    // Parse topics
    const topics = topicsInput.split(',').map(t => t.trim()).filter(t => t.length > 0);
    
    // Create shuffled arrays
    const shuffledItems = shuffleArray([...items]);
    const shuffledTopics = topics.length > 0 ? shuffleArray([...topics]) : [];
    
    // Create topic mappings
    const topicMappings = {};
    if (topics.length > 0) {
        shuffledItems.forEach((item, index) => {
            const topicIndex = index % shuffledTopics.length;
            topicMappings[item] = shuffledTopics[topicIndex];
        });
    }

    // Initialize game state
    gameState = {
        ...gameState,
        inputMode: inputMode,
        maxNumber: inputMode === 'numbers' ? items.length : 0,
        timeInterval: interval,
        currentNumbers: inputMode === 'numbers' ? shuffledItems : [],
        currentNames: inputMode === 'names' ? shuffledItems : [],
        currentIndex: 0,
        counters: {},
        timer: null,
        timeLeft: interval,
        isPaused: false,
        sessionStartTime: new Date(),
        topics: topics,
        currentTopics: shuffledTopics,
        showTopics: showTopics && topics.length > 0,
        names: inputMode === 'names' ? items : [],
        topicMappings: topicMappings
    };

    // Initialize counters
    itemKeys.forEach(key => {
        gameState.counters[key] = 0;
    });

    showPhase('practice');
    updateDisplay();
    startTimer();
    saveData();
    playSound('click');
}

// Shuffle array function
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Show specific phase
function showPhase(phase) {
    document.getElementById('mode-selection').classList.toggle('hidden', phase !== 'mode-selection');
    document.getElementById('setup-phase').classList.toggle('hidden', phase !== 'setup');
    document.getElementById('practice-phase').classList.toggle('hidden', phase !== 'practice');
    document.getElementById('results-phase').classList.toggle('hidden', phase !== 'results');
    document.getElementById('memory-setup-phase').classList.toggle('hidden', phase !== 'memory-setup');
    document.getElementById('memory-game-phase').classList.toggle('hidden', phase !== 'memory-game');
    document.getElementById('memory-results-phase').classList.toggle('hidden', phase !== 'memory-results');
    
    if (gameState.animationsEnabled) {
        const activePhase = document.getElementById(phase === 'mode-selection' ? 'mode-selection' : `${phase}-phase`);
        if (activePhase) {
            activePhase.classList.add('fade-in');
        }
    }
}

// Update display elements
function updateDisplay() {
    const items = gameState.inputMode === 'numbers' ? gameState.currentNumbers : gameState.currentNames;
    if (items.length === 0) return;

    const currentItem = items[gameState.currentIndex];
    const totalItems = items.length;
    
    document.getElementById('currentNumber').textContent = currentItem;
    document.getElementById('currentIndex').textContent = gameState.currentIndex + 1;
    document.getElementById('totalNumbers').textContent = totalItems;
    document.getElementById('counterValue').textContent = gameState.counters[currentItem] || 0;
    document.getElementById('timerDisplay').textContent = gameState.timeLeft + 's';

    // Update topic display
    const topicElement = document.getElementById('currentTopic');
    if (gameState.showTopics && gameState.topicMappings[currentItem]) {
        topicElement.textContent = gameState.topicMappings[currentItem];
        topicElement.style.display = 'block';
    } else {
        topicElement.style.display = 'none';
    }

    // Add animation
    if (gameState.animationsEnabled) {
        document.getElementById('currentNumber').style.animation = 'none';
        setTimeout(() => {
            document.getElementById('currentNumber').style.animation = 'numberPulse 0.5s ease-out';
        }, 50);
    }
}

// Start the timer
function startTimer() {
    if (gameState.timer) {
        clearInterval(gameState.timer);
    }

    gameState.timer = setInterval(() => {
        if (!gameState.isPaused) {
            gameState.timeLeft--;
            document.getElementById('timerDisplay').textContent = gameState.timeLeft + 's';

            if (gameState.timeLeft <= 0) {
                nextNumber();
            }
        }
    }, 1000);
}

// Move to next number
function nextNumber() {
    gameState.currentIndex++;
    const items = gameState.inputMode === 'numbers' ? gameState.currentNumbers : gameState.currentNames;

    if (gameState.currentIndex >= items.length) {
        finishSession();
        return;
    }

    gameState.timeLeft = gameState.timeInterval;
    updateDisplay();
    saveData();
    playSound('click');
}

// Move to previous number
function previousNumber() {
    if (gameState.currentIndex > 0) {
        gameState.currentIndex--;
        gameState.timeLeft = gameState.timeInterval;
        updateDisplay();
        saveData();
        playSound('click');
    }
}

// Random jump
function randomJump() {
    const items = gameState.inputMode === 'numbers' ? gameState.currentNumbers : gameState.currentNames;
    const newIndex = Math.floor(Math.random() * items.length);
    gameState.currentIndex = newIndex;
    gameState.timeLeft = gameState.timeInterval;
    updateDisplay();
    saveData();
    playSound('click');
}

// Increment counter for current number
function incrementCounter() {
    const items = gameState.inputMode === 'numbers' ? gameState.currentNumbers : gameState.currentNames;
    const currentItem = items[gameState.currentIndex];
    gameState.counters[currentItem]++;
    document.getElementById('counterValue').textContent = gameState.counters[currentItem];

    // Add visual feedback
    const button = event.target;
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);

    saveData();
    playSound('success');
}

// Decrement counter for current number
function decrementCounter() {
    const items = gameState.inputMode === 'numbers' ? gameState.currentNumbers : gameState.currentNames;
    const currentItem = items[gameState.currentIndex];
    if (gameState.counters[currentItem] > 0) {
        gameState.counters[currentItem]--;
        document.getElementById('counterValue').textContent = gameState.counters[currentItem];

        // Add visual feedback
        const button = event.target;
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);

        saveData();
        playSound('click');
    }
}

// Pause/Resume functionality
function pauseResume() {
    gameState.isPaused = !gameState.isPaused;
    const pauseBtn = document.getElementById('pauseBtn');
    pauseBtn.textContent = gameState.isPaused ? 'Resume' : 'Pause';
    pauseBtn.classList.toggle('btn-success', gameState.isPaused);
    pauseBtn.classList.toggle('btn-secondary', !gameState.isPaused);
    playSound('click');
}

// Confirm exit
function confirmExit() {
    if (confirm('Are you sure you want to exit this session? Your progress will be saved.')) {
        finishSession();
    }
}

// Finish the session
function finishSession() {
    if (gameState.timer) {
        clearInterval(gameState.timer);
    }

    showPhase('results');
    displayResults();
    saveData();
    playSound('success');
}

// Display results
function displayResults() {
    const totalPoints = Object.values(gameState.counters).reduce((sum, count) => sum + count, 0);
    const itemCount = Object.keys(gameState.counters).length;
    const averagePoints = itemCount > 0 ? (totalPoints / itemCount).toFixed(1) : '0';
    const sessionDuration = Math.round((new Date() - gameState.sessionStartTime) / 1000 / 60);
    
    // Find most practiced item
    const sortedEntries = Object.entries(gameState.counters)
        .sort((a, b) => b[1] - a[1]);
    const mostPracticed = sortedEntries[0] || ['None', 0];

    // Summary stats
    const itemLabel = gameState.inputMode === 'numbers' ? 'Number' : 'Participant';
    const summaryHTML = `
        <div class="summary-card">
            <div class="summary-value">${totalPoints}</div>
            <div class="summary-label">Total Points</div>
        </div>
        <div class="summary-card">
            <div class="summary-value">${averagePoints}</div>
            <div class="summary-label">Average per ${itemLabel}</div>
        </div>
        <div class="summary-card">
            <div class="summary-value">${sessionDuration}m</div>
            <div class="summary-label">Session Time</div>
        </div>
        <div class="summary-card">
            <div class="summary-value">${mostPracticed[0]}</div>
            <div class="summary-label">Top Score</div>
        </div>
    `;
    document.getElementById('summaryStats').innerHTML = summaryHTML;

    // Detailed stats - sorted from highest to lowest
    const statsHTML = sortedEntries.map(([item, count]) => {
        const topic = gameState.showTopics && gameState.topicMappings[item] 
            ? `<span class="stats-topic">${gameState.topicMappings[item]}</span>` 
            : '';
        
        const displayText = gameState.inputMode === 'numbers' ? `Number ${item}` : item;
        
        return `
            <div class="stats-row">
                <span class="stats-number">${displayText}${topic}</span>
                <span class="stats-count">${count} points</span>
            </div>
        `;
    }).join('');
    
    document.getElementById('statsTable').innerHTML = statsHTML;
}

// Toggle results view (placeholder for chart view)
function toggleResultsView() {
    alert('Chart view coming soon! Currently showing table view.');
}

// Export results
function exportResults() {
    const results = Object.entries(gameState.counters)
        .sort((a, b) => b[1] - a[1])
        .map(([item, count]) => {
            const topic = gameState.showTopics && gameState.topicMappings[item] 
                ? gameState.topicMappings[item] 
                : '';
            const displayText = gameState.inputMode === 'numbers' ? `Number ${item}` : item;
            return `${displayText}${topic ? ' - ' + topic : ''}: ${count} points`;
        })
        .join('\n');
    
    const totalPoints = Object.values(gameState.counters).reduce((sum, count) => sum + count, 0);
    const modeText = gameState.inputMode === 'numbers' ? 'Number Challenge' : 'Names Challenge';
    const sessionInfo = `Session Results - ${new Date().toLocaleString()}\n` +
        `Mode: ${modeText}\n` +
        `Total Points: ${totalPoints}\n` +
        `Duration: ${Math.round((new Date() - gameState.sessionStartTime) / 1000 / 60)} minutes\n\n` +
        `Details:\n${results}`;
    
    // Create download
    const blob = new Blob([sessionInfo], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learning-hub-results-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    playSound('success');
}

// Start a new session
function startNewSession() {
    showPhase('setup');
}

// Reset session
function resetSession() {
    if (gameState.timer) {
        clearInterval(gameState.timer);
    }

    const savedMax = gameState.maxNumber;
    const savedInterval = gameState.timeInterval;

    gameState = {
        mode: 'numbers',
        inputMode: 'numbers',
        maxNumber: savedMax || 10,
        timeInterval: savedInterval || 5,
        currentNumbers: [],
        currentIndex: 0,
        counters: {},
        timer: null,
        timeLeft: 0,
        isPaused: false,
        sessionStartTime: null,
        topics: [],
        currentTopics: [],
        showTopics: true,
        soundEnabled: gameState.soundEnabled,
        animationsEnabled: gameState.animationsEnabled,
        names: [],
        currentNames: [],
        topicMappings: {}
    };

    saveData();
}

// Settings functions
function toggleSettings() {
    const panel = document.getElementById('settingsPanel');
    panel.classList.toggle('hidden');
    playSound('click');
}

function toggleDarkMode() {
    const isDark = document.getElementById('darkModeToggle').checked;
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('darkMode', isDark);
    playSound('click');
}

function toggleSound() {
    gameState.soundEnabled = document.getElementById('soundToggle').checked;
    localStorage.setItem('soundEnabled', gameState.soundEnabled);
}

function toggleAnimations() {
    gameState.animationsEnabled = document.getElementById('animationsToggle').checked;
    localStorage.setItem('animationsEnabled', gameState.animationsEnabled);
}

function clearAllData() {
    if (confirm('Are you sure you want to clear all saved data? This cannot be undone.')) {
        localStorage.clear();
        location.reload();
    }
}

// Play sound effect
function playSound(type) {
    if (gameState.soundEnabled && sounds[type]) {
        sounds[type].currentTime = 0;
        sounds[type].play().catch(e => console.log('Audio play failed:', e));
    }
}

// Close settings panel when clicking outside
document.addEventListener('click', (e) => {
    const settingsPanel = document.getElementById('settingsPanel');
    const settingsToggle = document.querySelector('.settings-toggle');
    
    if (!settingsPanel.classList.contains('hidden') && 
        !settingsPanel.contains(e.target) && 
        !settingsToggle.contains(e.target)) {
        settingsPanel.classList.add('hidden');
    }
});

// Initialize app when page loads
window.addEventListener('load', initializeApp);

// Save data when page unloads
window.addEventListener('beforeunload', saveData);

// Sound toggle event listener
document.getElementById('soundToggle').addEventListener('change', toggleSound);

// Animations toggle event listener
document.getElementById('animationsToggle').addEventListener('change', toggleAnimations);

// Toggle mode inputs
function toggleModeInputs() {
    const mode = document.querySelector('input[name="mode"]:checked').value;
    document.getElementById('numbersMode').classList.toggle('hidden', mode !== 'numbers');
    document.getElementById('namesMode').classList.toggle('hidden', mode !== 'names');
}

// Memory Game State
let memoryState = {
    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    totalPairs: 0,
    moves: 0,
    startTime: null,
    timer: null,
    gameTime: 0,
    isPaused: false,
    gridSize: 4,
    content: 'numbers',
    showTimer: true,
    showMoves: true
};

// Toggle memory game inputs
function toggleMemoryInputs() {
    const content = document.getElementById('memoryContent').value;
    document.getElementById('memoryWordsInput').classList.toggle('hidden', content !== 'words');
}

// Start memory game
function startMemoryGame() {
    const gridSize = parseInt(document.getElementById('gridSize').value);
    const content = document.getElementById('memoryContent').value;
    const showTimer = document.getElementById('showTimer').checked;
    const showMoves = document.getElementById('showMoves').checked;
    
    const pairsCount = (gridSize * gridSize) / 2;
    
    // Validate custom words if needed
    if (content === 'words') {
        const wordsInput = document.getElementById('memoryWords').value;
        const words = wordsInput.split(',').map(w => w.trim()).filter(w => w.length > 0);
        if (words.length < pairsCount) {
            alert(`Please enter at least ${pairsCount} words for a ${gridSize}x${gridSize} grid.`);
            return;
        }
    }
    
    // Initialize memory game state
    memoryState = {
        cards: [],
        flippedCards: [],
        matchedPairs: 0,
        totalPairs: pairsCount,
        moves: 0,
        startTime: new Date(),
        timer: null,
        gameTime: 0,
        isPaused: false,
        gridSize: gridSize,
        content: content,
        showTimer: showTimer,
        showMoves: showMoves
    };
    
    createMemoryCards();
    showPhase('memory-game');
    startMemoryTimer();
    updateMemoryDisplay();
    playSound('click');
}

// Create memory cards
function createMemoryCards() {
    let cardValues = [];
    const pairsCount = memoryState.totalPairs;
    
    // Generate card values based on content type
    switch (memoryState.content) {
        case 'numbers':
            for (let i = 1; i <= pairsCount; i++) {
                cardValues.push(i, i);
            }
            break;
        case 'emojis':
            const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆', '🦋', '🐛', '🐝', '🐞', '🦀', '🐙', '🐠', '🐟', '🐬', '🐳', '🌸', '🌺'];
            for (let i = 0; i < pairsCount; i++) {
                cardValues.push(emojis[i], emojis[i]);
            }
            break;
        case 'words':
            const wordsInput = document.getElementById('memoryWords').value;
            const words = wordsInput.split(',').map(w => w.trim()).filter(w => w.length > 0);
            for (let i = 0; i < pairsCount; i++) {
                cardValues.push(words[i], words[i]);
            }
            break;
        case 'math':
            const problems = [];
            for (let i = 1; i <= pairsCount; i++) {
                const a = Math.floor(Math.random() * 10) + 1;
                const b = Math.floor(Math.random() * 10) + 1;
                const result = a + b;
                problems.push([`${a}+${b}`, result]);
            }
            problems.forEach(([problem, answer]) => {
                cardValues.push(problem, answer);
            });
            break;
    }
    
    // Shuffle cards
    cardValues = shuffleArray(cardValues);
    
    // Create card objects
    memoryState.cards = cardValues.map((value, index) => ({
        id: index,
        value: value,
        isFlipped: false,
        isMatched: false
    }));
    
    renderMemoryGrid();
}

// Render memory grid
function renderMemoryGrid() {
    const grid = document.getElementById('memoryGrid');
    grid.className = `memory-grid grid-${memoryState.gridSize}`;
    
    grid.innerHTML = memoryState.cards.map(card => `
        <div class="memory-card" data-card-id="${card.id}" onclick="flipCard(${card.id})">
            <div class="card-face card-front">?</div>
            <div class="card-face card-back">${card.value}</div>
        </div>
    `).join('');
}

// Flip card
function flipCard(cardId) {
    if (memoryState.isPaused) return;
    
    const card = memoryState.cards[cardId];
    const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
    
    // Don't flip if already flipped or matched
    if (card.isFlipped || card.isMatched || memoryState.flippedCards.length >= 2) {
        return;
    }
    
    // Flip the card
    card.isFlipped = true;
    cardElement.classList.add('flipped');
    memoryState.flippedCards.push(card);
    
    playSound('click');
    
    // Check for match when two cards are flipped
    if (memoryState.flippedCards.length === 2) {
        memoryState.moves++;
        updateMemoryDisplay();
        
        setTimeout(() => {
            checkForMatch();
        }, 1000);
    }
}

// Check for match
function checkForMatch() {
    const [card1, card2] = memoryState.flippedCards;
    
    if (card1.value === card2.value) {
        // Match found
        card1.isMatched = true;
        card2.isMatched = true;
        
        const card1Element = document.querySelector(`[data-card-id="${card1.id}"]`);
        const card2Element = document.querySelector(`[data-card-id="${card2.id}"]`);
        
        card1Element.classList.add('matched');
        card2Element.classList.add('matched');
        
        memoryState.matchedPairs++;
        playSound('success');
        
        // Check if game is complete
        if (memoryState.matchedPairs === memoryState.totalPairs) {
            setTimeout(() => {
                finishMemoryGame();
            }, 500);
        }
    } else {
        // No match, flip cards back
        const card1Element = document.querySelector(`[data-card-id="${card1.id}"]`);
        const card2Element = document.querySelector(`[data-card-id="${card2.id}"]`);
        
        card1Element.classList.remove('flipped');
        card2Element.classList.remove('flipped');
        
        card1.isFlipped = false;
        card2.isFlipped = false;
    }
    
    memoryState.flippedCards = [];
    updateMemoryDisplay();
}

// Start memory timer
function startMemoryTimer() {
    if (memoryState.timer) {
        clearInterval(memoryState.timer);
    }
    
    memoryState.timer = setInterval(() => {
        if (!memoryState.isPaused) {
            memoryState.gameTime++;
            updateMemoryDisplay();
        }
    }, 1000);
}

// Update memory display
function updateMemoryDisplay() {
    document.getElementById('memoryTime').textContent = formatTime(memoryState.gameTime);
    document.getElementById('memoryMoves').textContent = memoryState.moves;
    document.getElementById('memoryFound').textContent = memoryState.matchedPairs;
    document.getElementById('memoryTotal').textContent = memoryState.totalPairs;
    
    // Show/hide stats based on settings
    document.getElementById('memoryTimer').style.display = memoryState.showTimer ? 'block' : 'none';
    document.getElementById('memoryMovesDiv').style.display = memoryState.showMoves ? 'block' : 'none';
}

// Format time as MM:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Pause memory game
function pauseMemoryGame() {
    memoryState.isPaused = !memoryState.isPaused;
    const pauseBtn = document.getElementById('memoryPauseBtn');
    pauseBtn.textContent = memoryState.isPaused ? 'Resume' : 'Pause';
    
    // Disable/enable all cards
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach(card => {
        card.classList.toggle('disabled', memoryState.isPaused);
    });
    
    playSound('click');
}

// Reset memory game
function resetMemoryGame() {
    if (confirm('Are you sure you want to start a new game?')) {
        startMemoryGame();
    }
}

// Confirm exit memory game
function confirmExitMemory() {
    if (confirm('Are you sure you want to exit this game?')) {
        if (memoryState.timer) {
            clearInterval(memoryState.timer);
        }
        backToModeSelection();
    }
}

// Finish memory game
function finishMemoryGame() {
    if (memoryState.timer) {
        clearInterval(memoryState.timer);
    }
    
    // Save score to leaderboard
    saveMemoryScore();
    
    showPhase('memory-results');
    displayMemoryResults();
    playSound('success');
}

// Display memory results
function displayMemoryResults() {
    const timeStr = formatTime(memoryState.gameTime);
    const efficiency = memoryState.totalPairs > 0 ? Math.round((memoryState.totalPairs / memoryState.moves) * 100) : 0;
    
    const summaryHTML = `
        <div class="summary-card">
            <div class="summary-value">${timeStr}</div>
            <div class="summary-label">Time</div>
        </div>
        <div class="summary-card">
            <div class="summary-value">${memoryState.moves}</div>
            <div class="summary-label">Moves</div>
        </div>
        <div class="summary-card">
            <div class="summary-value">${efficiency}%</div>
            <div class="summary-label">Efficiency</div>
        </div>
        <div class="summary-card">
            <div class="summary-value">${memoryState.gridSize}x${memoryState.gridSize}</div>
            <div class="summary-label">Grid Size</div>
        </div>
    `;
    
    document.getElementById('memorySummaryStats').innerHTML = summaryHTML;
    displayMemoryLeaderboard();
}

// Save memory score
function saveMemoryScore() {
    try {
        const scores = JSON.parse(localStorage.getItem('memoryScores') || '[]');
        const newScore = {
            time: memoryState.gameTime,
            moves: memoryState.moves,
            gridSize: memoryState.gridSize,
            content: memoryState.content,
            date: new Date().toISOString()
        };
        
        scores.push(newScore);
        scores.sort((a, b) => a.time - b.time); // Sort by time (best first)
        
        // Keep only top 10 scores
        if (scores.length > 10) {
            scores.splice(10);
        }
        
        localStorage.setItem('memoryScores', JSON.stringify(scores));
    } catch (e) {
        console.log('Could not save memory score:', e);
    }
}

// Display memory leaderboard
function displayMemoryLeaderboard() {
    try {
        const scores = JSON.parse(localStorage.getItem('memoryScores') || '[]');
        const leaderboard = document.getElementById('memoryLeaderboard');
        
        if (scores.length === 0) {
            leaderboard.innerHTML = '<p>No scores yet. Play some games to see your best times!</p>';
            return;
        }
        
        const leaderboardHTML = scores.map((score, index) => {
            const date = new Date(score.date).toLocaleDateString();
            return `
                <div class="leaderboard-entry">
                    <div>
                        <span class="leaderboard-rank">#${index + 1}</span>
                        <span class="leaderboard-time">${formatTime(score.time)}</span>
                        <small class="leaderboard-date">${date} - ${score.gridSize}x${score.gridSize} ${score.content}</small>
                    </div>
                    <div>${score.moves} moves</div>
                </div>
            `;
        }).join('');
        
        leaderboard.innerHTML = leaderboardHTML;
    } catch (e) {
        console.log('Could not load memory scores:', e);
        document.getElementById('memoryLeaderboard').innerHTML = '<p>Error loading scores.</p>';
    }
}

// Play again memory
function playAgainMemory() {
    showPhase('memory-setup');
}