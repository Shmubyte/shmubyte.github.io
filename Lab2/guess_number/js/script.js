document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

// globals
let randomNumber;
let attempts = 1;
let gamesWon = 0;
let gamesLost = 0;

function initializeGame(){
    randomNumber = Math.floor(Math.random() * 99) + 1;  // 1-100
    console.log("randomNumber: " + randomNumber);
    attempts = 1;
    document.querySelector("#resetBtn").style.display = "none";
    document.querySelector("#guessBtn").style.display = "inline";
    document.querySelector("#guessBtn").disabled = false;
    document.querySelector("#attemptNum").textContent = "Attempt Number:"+ attempts;

    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.value = "";
    playerGuess.disabled = false;
    document.querySelector("#feedback").textContent = "";
    document.querySelector("#guesses").textContent = "Previous Guesses:";
    playerGuess.focus();
    
    updateStats();
}

function checkGuess(){
    let guess = parseInt(document.querySelector("#playerGuess").value);
    console.log("Player guess: " + guess);
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";

    // Check if it's a valid number
    if(isNaN(guess)){
        feedback.textContent = "Please enter a valid number!";
        feedback.style.color = "red";
        return;
    }

    if(guess < 1 || guess > 100){
      feedback.textContent = "Please enter a value between 1 and 100!";
      feedback.style.color = "red";
      return;
    }
    
    displayAttemptNum();
    
    if(guess == randomNumber){
        feedback.textContent = "Congratulations! You guessed the number " + randomNumber + " in " + attempts + " attempt(s).";
        feedback.style.color = "green";
        gamesWon++;
        gameOver();
    } 
    else{ 
        document.querySelector("#guesses").textContent += "" + guess + " ";
        
        if(attempts >= 7){
            feedback.textContent = "Sorry, you lost! The number was " + randomNumber + ".";
            feedback.style.color = "red";
            gamesLost++;
            gameOver();
        }
        else if(guess > randomNumber){
            feedback.textContent = "Too high! Try again.";
            feedback.style.color = "orange";
        }
        else{
            feedback.textContent = "Too low! Try again.";
            feedback.style.color = "orange";
        }
    }
    attempts++;
}

function gameOver(){
    document.querySelector("#guessBtn").disabled = true;
    document.querySelector("#guessBtn").style.display = "none";
    document.querySelector("#playerGuess").disabled = true;
    document.querySelector("#resetBtn").style.display = "inline";
    updateStats();
}

function updateStats(){
    document.querySelector("#stats").textContent = 
        "Games Won: " + gamesWon + " | Games Lost: " + gamesLost;
}

function displayAttemptNum(){
    document.querySelector("#attemptNum").textContent = "Attempt Number: " + attempts;
}

initializeGame();