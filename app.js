const card = document.querySelector('.card');
const addForm = document.querySelector('.add-player');
const addedPlayerList = document.querySelector('.added-player-list');
const playerList = document.querySelector('.player-list');
const activePlayer = document.querySelector('.active-player');
const reverseButton = document.querySelector('.reverse-button');
const removeButton = document.querySelector('.remove-button');
const caption = document.querySelector('.caption');

let playerArray = [];
let playerNumber=0;
let reversed=false;
let gameOver=false;

function onLoad() {
    addForm.add.focus();
}

//Add user
addForm.addEventListener('submit', e => {
    e.preventDefault();

    let player=addForm.add.value.trim();
    if (player!="") {

        addedPlayerList.innerHTML += `<div class="player font-weight-light">${player}</div>`;
        addForm.add.value="";
        addForm.add.focus();

       
        playerArray.push(player);

        if (playerArray.length==3) {
            const startButton = document.querySelector('.btn-block');
            startButton.classList.remove('d-none');
            startButton.classList.add('animated','pulse');
        }
    }
})

function startGame() {
    card.classList.add('d-none');
    playerList.classList.add('animated','bounceIn');
    playerList.classList.remove('d-none');
    activePlayer.innerHTML=`${playerArray[playerNumber]}`
}

activePlayer.addEventListener('click', e => {
        nextPlayer('next')
})

function reverseOrder() {

    if (gameOver==true) {return}
    gameOver=true;

    reversed = !reversed; //Reverse order

    //Toggle button colour
    if (reversed) {
        reverseButton.classList.add('btn-secondary');
        reverseButton.classList.remove('btn-light');
    } else {
        reverseButton.classList.add('btn-light');
        reverseButton.classList.remove('btn-secondary');
    }

    //Play flip animation
    activePlayer.classList.add('animated','flip')
    setTimeout(function() {
        activePlayer.classList.remove('animated','flip')
        gameOver=false;
    },1000)
}

function removePlayer() {

    if (gameOver==true) {return}
    gameOver=true;

    playerArray.splice(playerNumber,1); //Update array

    //If usual direction, we will naturally move to next player. If reversed, we need to move back 1.
    if (reversed) {playerNumber-=1}
    backToStart();

    //console.log("Players left:",playerArray.length)
    //console.log(playerArray);

    activePlayer.classList.add('animated','zoomOut')

    setTimeout(function() {
        activePlayer.innerHTML=`${playerArray[playerNumber]}` //Update player HTML

        activePlayer.classList.remove('zoomOut')
        activePlayer.classList.add('animated',inAnimation(reversed))

        setTimeout(function() {
            activePlayer.classList.remove('animated',inAnimation(reversed));
            gameOver=false;
            if (playerArray.length==1) {endOfGame()}
        }, 400)

    }, 400)

}

function nextPlayer(previous) {

    if (gameOver==true) {return}
    gameOver=true;

    //Move to next/previous player
    (!reversed) ? playerNumber++ : playerNumber--;
    backToStart();


    activePlayer.classList.add('animated',outAnimation(reversed))

    setTimeout(function() {
        //console.log("Player",playerNumber,playerArray[playerNumber]);
        activePlayer.innerHTML=`${playerArray[playerNumber]}` //Update player HTML

        activePlayer.classList.remove(outAnimation(reversed))
        activePlayer.classList.add('animated',inAnimation(reversed))

        setTimeout(function() {
            activePlayer.classList.remove('animated',inAnimation(reversed));
            gameOver=false;
        }, 400)

    }, 400)
}

let outAnimation = (reversed) => {
    if (!reversed) {
        return 'bounceOutLeft'
    } else {
        return 'bounceOutRight'
    }
}

let inAnimation = (reversed) => {
    if (!reversed) {
        return 'bounceInRight'
    } else {
        return 'bounceInLeft'
    }
}

function endOfGame() {
    gameOver=true;
    reverseButton.disabled=true;
    removeButton.disabled=true;
    caption.textContent="Last player standing:"
}

function backToStart() {
    if (playerNumber<0) {
        playerNumber = playerArray.length-1;
    } else if (playerNumber>=playerArray.length) {
        playerNumber=0;
    }
}