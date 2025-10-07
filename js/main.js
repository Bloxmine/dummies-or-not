// For Dummies or Not?W
// players identify which book title is real vs fake

const realDummies = [
    "Conspiracy Theories", // 1
    "Elvis", // 2
    "Titanic", // 3
    "Cruise Vacations", // 4
    "Sex", // 5
    "Baby Massage", // 6
    "Banjo", // 7
    "Black Berry", // 8
    "Depression", // 9
    "Thermodynamics", // 10
    "Timeshare Vacations", // 11
    "String Theory", // 12
    "The Origins of the Universe", // 13
    "Overcoming Internet Addiction", // 14
    "Yoga after 50", // 15
    "Tumblr", // 16
    "TikTok", // 17
    "Jesus", // 18
    "Making Millions", // 19
    "Haircutting", // 20
    "Adulting", // 21
    "Bartending", // 22
    "Success as an Introvert", // 23
    "Car hacks and mods", // 24
    "Wii Fitness", // 25
    "Minecraft", // 26
    "Parakeets", // 27
    "Ebola", // 28
    "Space Exploration", // 29
    "Investing in an Uncertain Economy", // 30
    "Identity Theft", // 31
    "Freemasonry" // 32
];

const fakeDummies = [
    "Superman", // 1
    "Batman", // 2
    "NYC Subway", // 3
    "The Dark Web", // 4
    "Time Travel", // 5
    "Mind Reading", // 6
    "Teleportation", // 7
    "Alien Communication", // 8
    "Potion Making", // 9
    "Crystal Healing", // 10
    "Success as an Extrovert", // 11
    "Roblox", // 12
    "Ferrets", // 13
    "Piloting a plane", // 14
    "Eating Spicy Food", // 15
    "Record Collecting", // 16
    "Xhosa", // 17
    "Puppetry", // 18
    "Petanque", // 19
    "Pitbulls", // 20
    "Flipdot Displays", // 21
    "Drone Racing", // 22
    "Eating at Fast Food Restaurants", // 23
    "Living in a Van", // 24
    "Dumpster Diving", // 25
    "Metal Detecting", // 26
    "Sand Art", // 27
    "Feedpulse", // 28
    "Portflow", // 29
    "Stock Trading in China", // 30
    "Albanian Mafia", // 31
    "Antarctic Exploration" // 32
];

let score = 0;
let highScore = parseInt(localStorage.getItem('dummiesHighScore')) || 0;
let currentRealBook = null;
let gameActive = false;
let gameOver = false;

// using a shallow copy of the arrays to keep track of available books
let availableRealBooks = [...realDummies];
let availableFakeBooks = [...fakeDummies];

// DOM elements
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const book1Element = document.getElementById('book1');
const book2Element = document.getElementById('book2');
const title1Element = document.getElementById('title1');
const title2Element = document.getElementById('title2');
const feedbackElement = document.getElementById('feedback');
const feedbackTextElement = document.getElementById('feedbackText');
const nextRoundButton = document.getElementById('nextRound');

function initGame() {
    updateScoreDisplay();
    startNewRound();
}

function startNewRound() {
    if (gameOver) return;
    
    gameActive = true;
    feedbackElement.classList.add('hidden');

    book1Element.classList.remove('correct', 'incorrect', 'disabled');
    book2Element.classList.remove('correct', 'incorrect', 'disabled');

    const realBook = getRandomItemWithoutRepeat(availableRealBooks, realDummies);
    const fakeBook = getRandomItemWithoutRepeat(availableFakeBooks, fakeDummies);
    const isBook1Real = Math.random() < 0.5;
    
    if (isBook1Real) {
        title1Element.textContent = realBook;
        title2Element.textContent = fakeBook;
        currentRealBook = 'book1';
    } else {
        title1Element.textContent = fakeBook;
        title2Element.textContent = realBook;
        currentRealBook = 'book2';
    }
}

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomItemWithoutRepeat(availableArray, originalArray) {
    if (availableArray.length === 0) {
        availableArray.push(...originalArray);
    }
    
    const randomIndex = Math.floor(Math.random() * availableArray.length);
    const selectedBook = availableArray[randomIndex];
    availableArray.splice(randomIndex, 1);
    
    return selectedBook;
}

function handleBookClick(bookId) {
    if (!gameActive) return;
    
    gameActive = false;
    const isCorrect = bookId === currentRealBook;
    book1Element.classList.add('disabled');
    book2Element.classList.add('disabled');
    
    if (isCorrect) {
        score++;
        document.getElementById(bookId).classList.add('correct');
        feedbackTextElement.textContent = 'Correct! '+document.getElementById(bookId).textContent+'is a real book!';
        feedbackElement.classList.remove('hidden');
        feedbackElement.classList.add('correct');
        feedbackElement.classList.remove('incorrect');
        
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('dummiesHighScore', highScore.toString());
        }
    } else {
        document.getElementById(bookId).classList.add('incorrect');
        document.getElementById(currentRealBook).classList.add('correct');
        gameOver = true;
        showGameOverScreen();
    }
    
    updateScoreDisplay();
}

function updateScoreDisplay() {
    scoreElement.textContent = score;
    highScoreElement.textContent = highScore;
}

function getImageFileName(bookTitle) {
    // Convert book title to corresponding image filename
    const mapping = {
        'Elvis': 'elvis.jpg',
        'Sex': 'sex.jpg',
        'Baby Massage': 'baby-massage.jpg',
        'Titanic': 'titanic.jpg',
        'Conspiracy Theories': 'conspiracy-theories.jpg',
        'Cruise Vacations': 'cruise-vacations.jpg',
        'Banjo': 'banjo.jpg',
        'Black Berry': 'black-berry.jpg',
        'Depression': 'depression.jpg',
        'Thermodynamics': 'thermodynamics.jpg',
        'Timeshare Vacations': 'timeshare-vacations.jpg',
        'String Theory': 'string-theory.jpg',
        'The Origins of the Universe': 'origins-of-the-universe.jpg',
        'Overcoming Internet Addiction': 'overcoming-internet-addiction.jpg',
        'Yoga after 50': 'yoga.jpg',
        'Tumblr': 'tumblr.jpg',
        'TikTok': 'tiktok.jpg',
        'Jesus': 'jesus.jpg',
        'Making Millions': 'making-millions.jpg',
        'Haircutting': 'haircutting.jpg',
        'Adulting': 'adulting.jpg',
        'Bartending': 'bartending.jpg',
        'Success as an Introvert': 'success-as-an-introvert.jpg',
        'Car hacks and mods': 'car-hacks-and-mods.jpg',
        'Wii Fitness': 'wii-fitness.jpg',
        'Minecraft': 'minecraft.jpg',
        'Parakeets': 'parakeets.jpg',
        'Ebola': 'ebola.jpg',
        'Space Exploration': 'space-exploration.jpg',
        'Investing in an Uncertain Economy': 'investing-in-an-uncertain-economy.jpg',
        'Identity Theft': 'identity-theft.jpg',
        'Freemasonry': 'freemasonry.jpg'
    };
    return mapping[bookTitle] || null;
}

function showGameOverScreen() {
    // Hide feedback and show game over screen
    feedbackElement.classList.add('hidden');
    
    // Create game over overlay
    const overlay = document.createElement('div');
    overlay.id = 'gameOverOverlay';
    
    const gameOverContent = document.createElement('div');
    gameOverContent.id = 'gameOverContent';
    
    const realBookTitle = document.getElementById(currentRealBook === 'book1' ? 'title1' : 'title2').textContent;
    const imageFileName = getImageFileName(realBookTitle);
    
    let imageHTML = '';
    if (imageFileName) {
        imageHTML = `<img src="images/real/${imageFileName}" alt="${realBookTitle} For Dummies" class="real-book-image">`;
    }
    
    gameOverContent.innerHTML = `
        <h2>Game Over!</h2>
        <div id="finalScore">${score}</div>
        <p>The real book was: ${realBookTitle} For Dummies</p>
        ${imageHTML}
        <button id="restartButton">Play Again</button>
    `;
    
    overlay.appendChild(gameOverContent);
    document.body.appendChild(overlay);
    
    // Add restart button event listener
    document.getElementById('restartButton').addEventListener('click', restartGame);
    
    // Animate the score
    setTimeout(() => {
        document.getElementById('finalScore').classList.add('score-animate');
    }, 100);
}

function restartGame() {
    const overlay = document.getElementById('gameOverOverlay');
    if (overlay) {
        overlay.remove();
    }
    
    // Hide any existing game over content
    const gameOverContent = document.getElementById('gameOverContent');
    if (gameOverContent && gameOverContent.parentElement.id !== 'gameOverOverlay') {
        gameOverContent.classList.add('hidden');
    }
    
    // reset
    score = 0;
    gameOver = false;
    gameActive = false;
    availableRealBooks = [...realDummies];
    availableFakeBooks = [...fakeDummies];
    updateScoreDisplay();
    startNewRound();
}

book1Element.addEventListener('click', () => handleBookClick('book1'));
book2Element.addEventListener('click', () => handleBookClick('book2'));
nextRoundButton.addEventListener('click', startNewRound);

// starting game
document.addEventListener('DOMContentLoaded', initGame);