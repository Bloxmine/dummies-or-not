// For Dummies or Not?W
// players identify which book title is real vs fake

const realDummies = [
    "Accounting",
    "Elvis",
    "Titanic",
    "Wine",
    "Sex",
    "Baby Massage",
    "Golf",
    "Black Berry",
    "Depression",
    "Thermodynamics",
    "Timeshare Vacations",
    "String Theory",
    "The Origins of the Universe",
    "Cooking",
    "Yoga",
    "Tumblr",
    "TikTok",
    "Jesus",
    "Investing",
    "Programming",
    "Spanish",
    "Marketing",
    "Success as an Introvert",
    "Car hacks and mods",
    "Wii Fitness",
    "Minecraft",
    "Parakeets",
];

const fakeDummies = [
    "Superman",
    "Batman",
    "NYC Subway",
    "The Dark Web",
    "Time Travel",
    "Mind Reading",
    "Teleportation",
    "Alien Communication",
    "Potion Making",
    "Crystal Healing",
    "Sucess as an Extrovert",
    "Roblox",
    "Ferrets",
    "Piloting a plane",
    "Eating Spicy Food",
    "Record Collecting",
    "Xhosa",
    "Puppetry",
];

let score = 0;
let highScore = parseInt(localStorage.getItem('dummiesHighScore')) || 0;
let currentRealBook = null;
let gameActive = false;

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
    gameActive = true;
    feedbackElement.classList.add('hidden');

    book1Element.classList.remove('correct', 'incorrect', 'disabled');
    book2Element.classList.remove('correct', 'incorrect', 'disabled');

    const realBook = getRandomItem(realDummies);
    const fakeBook = getRandomItem(fakeDummies);
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

function handleBookClick(bookId) {
    if (!gameActive) return;
    
    gameActive = false;
    const isCorrect = bookId === currentRealBook;
    book1Element.classList.add('disabled');
    book2Element.classList.add('disabled');
    
    if (isCorrect) {
        score++;
        document.getElementById(bookId).classList.add('correct');
        feedbackTextElement.textContent = 'Correct! '+document.getElementById(bookId).textContent+' is a real "For Dummies" book!';
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
        feedbackTextElement.textContent = `Wrong! ${document.getElementById(currentRealBook === 'book1' ? 'title1' : 'title2').textContent} was the real book. Score reset!`;
        feedbackElement.classList.remove('hidden');
        feedbackElement.classList.add('incorrect');
        feedbackElement.classList.remove('correct');
        score = 0;
    }
    
    updateScoreDisplay();
}

function updateScoreDisplay() {
    scoreElement.textContent = score;
    highScoreElement.textContent = highScore;
}

book1Element.addEventListener('click', () => handleBookClick('book1'));
book2Element.addEventListener('click', () => handleBookClick('book2'));
nextRoundButton.addEventListener('click', startNewRound);

// starting game
document.addEventListener('DOMContentLoaded', initGame);