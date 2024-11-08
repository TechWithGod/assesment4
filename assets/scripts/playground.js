document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const queried = params.get('category');
    const game = document.getElementById('game');
    const topBar = document.createElement('div');
    const categoryName = document.createElement('div');
    const hamburgerMenu = document.createElement('div');
    const progressBarContainer = document.createElement('div');
    const progressBar = document.createElement('div');
    const heartIcon = document.createElement('div');

    
    topBar.className = 'top-bar';
    categoryName.className = 'category-name';
    categoryName.textContent = queried;
    hamburgerMenu.className = 'hamburger-menu';
    hamburgerMenu.innerHTML = '&#9776;';  
    progressBarContainer.className = 'progress-bar-container';
    progressBar.className = 'progress-bar';
    heartIcon.className = 'heart-icon';
    heartIcon.innerHTML = '❤️';

    progressBarContainer.appendChild(heartIcon);
    progressBarContainer.appendChild(progressBar);
    topBar.appendChild(hamburgerMenu);
    topBar.appendChild(categoryName);
    topBar.appendChild(progressBarContainer);
    document.body.insertBefore(topBar, document.body.firstChild);

    const modifiedData = data[0].categories[queried];
    const maxTurns = 10;
    let turns = 0;
    let correctGuesses = 0;
    let totalLetters = 0;

    function startGame() {
        let random = Math.floor((Math.random() * (modifiedData.length)));
        let word = modifiedData[random].name.toUpperCase();
        totalLetters = word.length;

        for (let index = 0; index < totalLetters; index++) {
            let letterPlaceholder = document.createElement('div');
            letterPlaceholder.className = 'letter-placeholder';        
            letterPlaceholder.id = word[index];        
            letterPlaceholder.textContent = word[index];
            game.append(letterPlaceholder);
        }

        updateProgressBar();
    }

    function showDialog(message) {
        const dialog = document.createElement('div');
        dialog.className = 'dialog controls';
        dialog.style.padding = '2.5rem 0';
        dialog.innerHTML = `
            <p>${message}</p>
            <div class='control-btns'>
                <div class='play-btn' onclick="location.reload()">PLAY AGAIN</div>
                <div class='category-btn' onclick="window.location.href='./categories.html'">NEW CATEGORY</div>
                <div class='quit-btn' onclick="window.location.href='./index.html'">QUIT GAME</div>
            </div>
        `;
        document.body.appendChild(dialog);
    }

    function updateProgressBar() {
        const percentage = ((maxTurns - turns) / maxTurns) * 100;
        progressBar.style.width = `${percentage}%`;

        if (percentage > 66) {
            heartIcon.style.color = 'green';
        } else if (percentage > 33) {
            heartIcon.style.color = 'orange';
        } else {
            heartIcon.style.color = 'red';
        }
    }

    startGame();

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const keyboard = document.querySelector('#keyboard');

    for (let letter of letters) {
        const button = document.createElement('div');
        button.className = `letter letter-${letter}`;
        button.textContent = letter;
        keyboard.append(button);

        button.addEventListener('click', function () {
            if (this.disabled) {
                return;  
            }

            let allElement = game.querySelectorAll('.letter-placeholder');
            let matched = false;
            allElement.forEach((elem) => {
                let elementId = elem.getAttribute('id');
                let textContent = this.textContent;
                if (elementId === textContent) {
                    elem.style.color = 'white'; 
                    matched = true;
                    correctGuesses++;
                }
            });

            if (!matched) {
                turns++;
                updateProgressBar();
            }

            if (correctGuesses === totalLetters) {
                showDialog('You Win!');
            } else if (turns === maxTurns) {
                showDialog('You Failed!');
            }

            this.disabled = true;  
            this.style.backgroundColor = '#ccc';  
        });
    }
});
