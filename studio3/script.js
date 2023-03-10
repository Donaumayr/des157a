( function(){
    'use strict';
    console.log('js running');

    const startGame = document.getElementById('startgame');
    const gameControl = document.querySelector('.gamecontrol');
    const gameTop = document.getElementById('topcontrol');
    const game = document.getElementById('game');
    const p1score = document.getElementById('p1score');
    const p2score = document.getElementById('p2score');
    const actionArea = document.getElementById('actions');

    const gameData = {
        cards: ['images/card1.png', 'images/card2.png', 'images/card3.png', 'images/card4.png', 'images/card5.png', 'images/card6.png'],
        players: ['Player 1', 'Player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    }
    startGame.addEventListener('click', function(){
        gameData.index = Math.round(Math.random());
        //gameControl.innerHTML = '<h2>The game has started</h2>';
        gameControl.className = 'hidden';
        document.querySelector('.intro').className = 'hidden';
        let q = document.createElement("button");
        q.id = "quit";
        q.textContent = 'Quit';
        gameTop.appendChild(q);
        document.getElementById('quit').addEventListener('click', function(){
            location.reload();
        });

        // console.log('set up the turn');
        setUpTurn();
    });
    function setUpTurn() {
        game.innerHTML = `<h2>${gameData.players[gameData.index]}'s Turn</h2>`;
        actionArea.innerHTML = '<button id="draw"></button>';
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
        game.innerHTML += `<img src="${gameData.cards[gameData.roll1 - 1]}">`;
        game.innerHTML += `<img src="${gameData.cards[gameData.roll2 - 1]}">`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        if(gameData.rollSum == 2){
            game.innerHTML += '<p>Pocket Rockets!</p>';
            gameData.score[gameData.index] = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            setTimeout(setUpTurn, 2000);
            showCurrentScore();
        }
        else if(gameData.roll1 == 1 || gameData.roll2 == 1){
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            game.innerHTML += `<p>Sorry, one of your draws was a Ace. Switching to ${gameData.players[gameData.index]}</p>`;
            setTimeout(setUpTurn, 2000);
        }
        else {
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            actionArea.innerHTML = '<button id="drawagain"></button><button id="pass"></button>';

            document.getElementById('drawagain').addEventListener('click', function(){
                //setUpTurn();
                game.innerHTML = `<h2>${gameData.players[gameData.index]}'s Turn</h2>`;
                throwDice();
            });
            document.getElementById('pass').addEventListener('click', function(){
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });
            console.log("game continues");
            checkWinningCondition();
        }
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