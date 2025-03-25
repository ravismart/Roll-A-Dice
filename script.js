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

    function rollDice() {
        dice1.classList.add("rolling");
        dice2.classList.add("rolling");

        setTimeout(() => {
            const roll1 = Math.floor(Math.random() * 6) + 1;
            const roll2 = Math.floor(Math.random() * 6) + 1;
            updateDiceFace(dice1, roll1);
            updateDiceFace(dice2, roll2);

            rollHistory.push(`[${roll1}, ${roll2}]`);

            if (roll1 === roll2) {
                rollCount++;
                rollSum += roll1 + roll2;

                if (rollCount === 3) {
                    totalDisplay.textContent = "Missed your turn! hihihi";
                    resetRolling();
                } else {
                    totalDisplay.textContent = `You rolled doubles: ${rollSum} - Roll again`;
                    diceContainer.addEventListener("click", rollDice);
                }
            } else {
                if (rollCount > 0) {
                    total = rollSum + roll1 + roll2;
                    totalDisplay.textContent = `${total}`;
                } else {
                    total = roll1 + roll2;
                    totalDisplay.textContent = `${total}`;
                }
                resetRolling();
            }

            dice1.classList.remove("rolling");
            dice2.classList.remove("rolling");
        }, 1000);
    }

    function resetRolling() {
        rollCount = 0;
        rollSum = 0;
        rollHistory = [];
        setTimeout(() => {
            // Reset size and history display if needed
        }, 2000);
        // Allow the dice to roll again when anywhere on the screen is clicked
        document.addEventListener("click", rollDice);
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

    // Listen for clicks anywhere on the screen to roll the dice
    document.addEventListener("click", rollDice);
});
