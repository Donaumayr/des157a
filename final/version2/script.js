( function(){
    'use strict';
    console.log('js running');

    const startGame = document.getElementById('startgame');
    const gameControl = document.querySelector('.gamecontrol');
    const gameTop = document.getElementById('topcontrol');
    const game = document.getElementById('game');
    const p1score = document.querySelector('.p1score');
    const p2score = document.querySelector('.p2score');
    const actionArea = document.getElementById('actions');

    const startSound = new Audio('sounds/shuffle.mp3');
    const drawSound = new Audio('sounds/draw.mp3');
    const passSound = new Audio('sounds/pass.mp3');
    const quitSound = new Audio('sounds/pounding-cards-on-table-99355.mp3');

    const gameData = {
        cards: ['images/card1.png', 'images/card2.png', 'images/card3.png', 'images/card4.png', 'images/card5.png', 'images/card6.png', 'images/card7.png', 'images/card8.png', 'images/card9.png', 'images/card10.png', 'images/card11.png', 'images/card12.png'],
        players: ['Player 1', 'Player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29,
        numTurns: [0,0]
    }

    window.addEventListener('load', function(){
        document.querySelector('.p1').className = 'p1 started';
        document.querySelector('.p2').className = 'p2 started';
        p1score.className = 'p1score started shown';
        p2score.className = 'p2score shown';
        alert("Hello! Please play through the game as many times as you like to try it out. Was there anything that was initially confusing to you? Are there any steps in the game that feel clunky or slow? What did you think of the animations, what could be added/changed?");
    })
    startGame.addEventListener('mousedown', function(){
        startSound.play();
    });

    startGame.addEventListener('click', function(){
        gameData.index = Math.round(Math.random());
        //gameControl.innerHTML = '<h2>The game has started</h2>';
        gameControl.className = 'hidden';
        document.querySelector('.intro').className = 'hidden';
        let q = document.createElement("button");
        q.id = "quit";
        q.textContent = 'Quit';
        gameTop.appendChild(q);
        document.getElementById('quit').addEventListener('mousedown', function(){
            quitSound.play();
        });
        document.getElementById('quit').addEventListener('click', function(){
            setTimeout(function(){location.reload();}, 1000);
        });

        // console.log('set up the turn');
        setUpTurn();
    });
    function setUpTurn() {
        game.innerHTML = `<h2>${gameData.players[gameData.index]}'s Turn</h2>`;
        actionArea.innerHTML = '<button id="draw"></button>';
        const pdisplayon = document.querySelector(`.p${gameData.index + 1}`);
        pdisplayon.style.backgroundColor = 'transparent';
        pdisplayon.style.border = 'none';
        const pdisplayoff = document.querySelector(`.p${(1 - gameData.index)+1}`);
        pdisplayoff.style.backgroundColor = '';
        pdisplayoff.style.border = '';
        document.getElementById('draw').addEventListener('mousedown', function(){
            drawSound.play();
        });
        document.getElementById('draw').addEventListener('click', function(){
            console.log('draw cards!');
            throwDice();
        });
    }

    function throwDice(){
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        //game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        game.innerHTML += `<div class="flipcard">
                            <div class="flipcardinner">
                                <img class="flipcardfront" src="images/cardb.png">
                                <img class="flipcardback" src="${gameData.cards[gameData.roll1 - 1]}">
                            </div>
                            </div>`;

        game.innerHTML += `<div class="flipcard">
                            <div class="flipcardinner">
                                <img class="flipcardfront" src="images/cardb.png">
                                <img class="flipcardback" src="${gameData.cards[gameData.roll2 - 1]}">
                            </div>
                            </div>`;

        /*game.innerHTML += `<img src="${gameData.cards[gameData.roll1 - 1]}">`;
        game.innerHTML += `<img src="${gameData.cards[gameData.roll2 - 1]}">`;*/
        for (let c of document.querySelectorAll('.flipcardinner')) {
            c.className = 'flipcardinner flipped';
        }
        let cardList = document.querySelectorAll('.flipcard');
        cardList[0].className = 'flipcard mRight';
        cardList[1].className = 'flipcard mLeft';

        gameData.rollSum = gameData.roll1 + gameData.roll2;

        if(gameData.rollSum == 2){
            game.innerHTML += '<p>Pocket Rockets!</p>';
            gameData.score[gameData.index] = 0;
            gameData.numTurns[gameData.index] = 0;
            for (let temp of document.querySelectorAll(`.p${gameData.index+1} img`)) {
                temp.remove();
            }
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            setTimeout(setUpTurn, 2000);
            showCurrentScore();
        }
        else if(gameData.roll1 == 1 || gameData.roll2 == 1){
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            game.innerHTML += `<p>Sorry, one of your draws was an Ace.</p>`;
            game.innerHTML += `<p>Switching to ${gameData.players[gameData.index]}</p>`;
            //score.innerHTML = `<p>Sorry, one of your draws was a Ace. Switching to ${gameData.players[gameData.index]}</p>`;
            setTimeout(setUpTurn, 2000);
        }
        else {
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            actionArea.innerHTML = '<button id="drawagain"></button><button id="pass"></button>';
            showCurrentScore();
            const pdisplayon = document.querySelector(`.p${gameData.index + 1}`);
            //create card
            let image = document.createElement("img");
            console.log(gameData.cards[gameData.rollSum - 1]);
            image.src = `${gameData.cards[gameData.rollSum - 1]}`;
            image.style.position = 'absolute';
            image.style.zIndex = '0';
            image.style.top = `${((gameData.numTurns[gameData.index])*80)+93}px`;
            image.className = 'shownslow';
            pdisplayon.appendChild(image);
            gameData.numTurns[gameData.index] += 1;
            document.getElementById('drawagain').addEventListener('mousedown', function(){
                drawSound.play();
            });
            document.getElementById('drawagain').addEventListener('click', function(){
                //setUpTurn();
                //console.log(`turns: ${gameData.numTurns[gameData.index]}`);
                //gameData.numTurns[gameData.index] += 1;
                game.innerHTML = `<h2>${gameData.players[gameData.index]}'s Turn</h2>`;
                throwDice();
            });
            document.getElementById('pass').addEventListener('mousedown', function(){
                passSound.play();
            });
            document.getElementById('pass').addEventListener('click', function(){
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });
            console.log("game continues");
            checkWinningCondition();
        }
        console.log(`turns: ${gameData.numTurns[gameData.index]}`);
    }

    function checkWinningCondition() {
        if(gameData.score[gameData.index] > gameData.gameEnd) {
            score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`;
            actionArea.style.display = 'none';
            document.getElementById('quit').innerHTML = "Start a New Game";
        }else {
            //show current score
            showCurrentScore();
        }
    }

    function showCurrentScore(){
        p1score.innerHTML = `${gameData.score[0]}`;
        p2score.innerHTML = `${gameData.score[1]}`;
        //score.innerHTML = `<p>The score is currently <strong>${gameData.players[0]} ${gameData.score[0]}</strong> and <strong>${gameData.players[1]} ${gameData.score[1]}</strong></p>`;
    }
})();