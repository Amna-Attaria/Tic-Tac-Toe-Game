let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let newGamebtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // Player O
let count = 0; // Initialize the turn count

const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const resetGame = () => {
    turnO = true;
    count = 0; // Reset the turn count
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach(box => {
    box.addEventListener("click", () => {
        console.log("box is clicked");
        if (box.innerText === "") { // Check if the box is empty
            if (turnO) {
                box.style.color = "#457b9d";
                box.innerText = "O";
                turnO = false; // Switch turn
            } else {
                box.innerText = "X";
                turnO = true; // Switch turn
            }
            count++; // Increase the turn count
            box.disabled = true; // Disable the clicked box
            checkWinner(); // Check if there's a winner or draw
        }
    });
});
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerHTML = ""; // Clear the box
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    let isWinner = false;
    for (let pattern of winPattern) {
        let pos1Value = boxes[pattern[0]].innerText;
        let pos2Value = boxes[pattern[1]].innerText;
        let pos3Value = boxes[pattern[2]].innerText;

        if (pos1Value !== "" && pos2Value !== "" && pos3Value !== "") {
            if (pos1Value === pos2Value && pos2Value === pos3Value) {
                console.log("winner", pos1Value);
                showWinner(pos1Value);
                isWinner = true;
                break; // Stop checking after finding a winner
            }
        }
    }

    // Check for draw condition
    if (!isWinner && count === 9) {
        gameDraw();
    }

};
const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

newGamebtn.addEventListener("click", resetGame);
reset.addEventListener("click", () => {
    console.log("Reset button clicked");
    resetGame();
});
