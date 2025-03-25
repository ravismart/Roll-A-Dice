document.addEventListener("DOMContentLoaded", () => {
    const diceContainer = document.getElementById("dice-container");
    const dice1 = document.getElementById("dice1");
    const dice2 = document.getElementById("dice2");
    const totalDisplay = document.getElementById("total");

    function rollDice() {
        dice1.classList.add("rolling");
        dice2.classList.add("rolling");

        setTimeout(() => {
            const roll1 = Math.floor(Math.random() * 6) + 1;
            const roll2 = Math.floor(Math.random() * 6) + 1;
            updateDiceFace(dice1, roll1);
            updateDiceFace(dice2, roll2);
            totalDisplay.textContent = `Total: ${roll1 + roll2}`;

            dice1.classList.remove("rolling");
            dice2.classList.remove("rolling");
        }, 1000); // Adjusted the timeout to match the roll animation duration
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

    // Roll the dice when tapping anywhere in the dice container or on the screen
    document.body.addEventListener("click", rollDice); // Tapping anywhere on the screen triggers the roll
});
