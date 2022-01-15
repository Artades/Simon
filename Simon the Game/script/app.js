let sequence = [];
let humanSequence = [];
let level = 0;

const startButton = document.querySelector('.js-start');
const info = document.querySelector('.js-info');

const tileContainer = document.querySelector('.container');
//Начать игру заново
function resetGame(text) {
    alert(text);
    sequence = [];
    humanSequence = [];
    level = 0;
    startButton.classList.remove('hidden');
    info.classList.add('hidden');
    tileContainer.classList.add('can__click');
}
////////////////////////////////////////////////////////////////
//Очередь игрока, разрешаем кликать по клавишам и добавляем текст
function humanTurn() {
    tileContainer.classList.remove('can__click');
    info.textContent = `Ваша очередь.`;
}
////////////////////////////////////////////////////////////////
//Ход компьютера
function activateTile(color) {
    const tile = document.querySelector(`[data-tile='${color}']`);
    const sound = document.querySelector(`[data-sound='${color}']`);

    tile.classList.add('activated');
    sound.play();

    setTimeout(() => {
        tile.classList.remove('activated');
    }, 300);
}
////////////////////////////////////////////////////////////////

function playLevel(nextSequence) {
    nextSequence.forEach((color, index) => {
        setTimeout(() => {
            activateTile(color);
        }, (index + 1) * 600);
    });
}

function nextStep() {
    const tiles = ['red', 'green', 'blue', 'yellow'];
    const random = tiles[Math.floor(Math.random() * tiles.length)];

    return random;
}

function nextRound() {
    level += 1;

    tileContainer.classList.add('can__click');



    const nextSequence = [...sequence];
    nextSequence.push(nextStep());
    playLevel(nextSequence);

    sequence = [...nextSequence];
    setTimeout(() => {
        humanTurn(level);
    }, level * 600 + 1000);
}

function handleClick(tile) {
    const index = humanSequence.push(tile) - 1;
    const sound = document.querySelector(`[data-sound='${tile}']`);
    sound.play();

   

    if (humanSequence[index] !== sequence[index]) {
        resetGame('Вы проиграли.Попробуйте еще раз.');
        return;
    }

    if (humanSequence.length === sequence.length) {
        humanSequence = [];
        info.textContent = 'Отлично';
        setTimeout(() => {
            nextRound();
        }, 1000);
        return;
    }

    info.textContent = 'Ваша очередь нажимать.'
}

function startGame() {
    startButton.classList.add('hidden');
    info.classList.remove('hidden');
    
    nextRound();
}

startButton.addEventListener('click', startGame);
tileContainer.addEventListener('click', event => {
    const {
        tile
    } = event.target.dataset;

    if (tile) handleClick(tile);
});