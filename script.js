document.addEventListener("DOMContentLoaded", () => {
    const diceContainer = document.getElementById("dice-container");
    const dice1 = document.getElementById("dice1");
    const dice2 = document.getElementById("dice2");
    const totalDisplay = document.getElementById("total");
    const historyDisplay = document.getElementById("history"); // Display all rolls

    let total = 0;
    let rollCount = 0;
    let rollSum = 0;
    let rollHistory = [];

    function rollDice() 
    
    {
        dice1.classList.add("rolling");
        dice2.classList.add("rolling");

        setTimeout(() =>
            {
            const roll1 = Math.floor(Math.random() * 6) + 1;
            const roll2 = Math.floor(Math.random() * 6) + 1;
            updateDiceFace(dice1, roll1);
            updateDiceFace(dice2, roll2);

            rollHistory.push(`[${roll1}, ${roll2}]`);

            if (roll1 === roll2) 
            {
                rollCount++;
                rollSum += roll1 + roll2;
                

                if (rollCount === 3) 
                {
                    totalDisplay.textContent = "Missed your turn! hihihi";
                    //historyDisplay.textContent = `History: ${rollHistory.join(" → ")}`;
                    //animateHistory();
                    resetRolling();
                } 
                else 
                {
                    totalDisplay.textContent = `Hurray! you rolled doubles: Roll again`;
                    //diceContainer.removeEventListener("click", rollDice);
                    //diceContainer.addEventListener("click", continueRolling);
                    diceContainer.addEventListener("click", rollDice);
                  
                }
            } 
            
            else 
            {
                if (rollCount > 0) 
                {
                    total = rollSum + roll1 + roll2;
                    totalDisplay.textContent = `Total: ${total}`;
                    //historyDisplay.textContent = `History: ${rollHistory.join(" → ")}`;
                    //animateHistory();
                } 
                else 
                {
                    total = roll1 + roll2;
                    totalDisplay.textContent = `Total: ${total}`;
                }
                resetRolling();
            }

            dice1.classList.remove("rolling");
            dice2.classList.remove("rolling");
        }, 1000);
    }

    //function continueRolling() {
        //diceContainer.removeEventListener("click", continueRolling);
       // rollDice();
   // }

    function resetRolling() {
        rollCount = 0;
        rollSum = 0;
        rollHistory = [];
        setTimeout(() => {
            //historyDisplay.style.transform = "scale(1)"; // Reset size
            //historyDisplay.textContent = "";
        }, 2000);
        //diceContainer.addEventListener("click", continueRolling); //added here
        diceContainer.addEventListener("click", rollDice);
    }

    function animateHistory() {
        historyDisplay.style.transform = "scale(1.2)";
        setTimeout(() => {
            historyDisplay.style.transform = "scale(1)";
        }, 500);
    }

    function updateDiceFace(dice, number) {
        const dotContainer = dice.querySelector(".dot-container");
        dotContainer.innerHTML = "";
        const dotPatterns = {
            1: [4],
            2: [0, 8],
            3: [0, 4, 8],
            4: [0, 2, 6, 8],
            5: [0, 2, 4, 6, 8],
            6: [0, 2, 3, 5, 6, 8]
        };

        for (let i = 0; i < 9; i++) {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            if (dotPatterns[number].includes(i)) {
                dotContainer.appendChild(dot);
            } else {
                dotContainer.appendChild(document.createElement("div"));
            }
        }
    }

    diceContainer.addEventListener("click", rollDice);
});
