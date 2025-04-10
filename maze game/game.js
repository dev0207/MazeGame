document.addEventListener("DOMContentLoaded", () => {
    const level1 = [
        [1, 0, 1, 0],
        [1, 1, 1, 1],
        [1, 0, 1, 0],
        [1, 0, 1, 1]
    ];

    const level2 = [
        [1, 1, 1, 0, 1, 0],
        [1, 0, 1, 1, 1, 1],
        [0, 0, 1, 0, 0, 0],
        [1, 0, 1, 1, 1, 1],
        [1, 0, 1, 0, 1, 0],
        [1, 1, 1, 0, 1, 1]
    ];

    const level3 = [
        [1, 0, 0, 1, 1, 1, 0, 0, 0, 0],
        [1, 0, 0, 1, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
        [1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 1, 0, 0, 1]
    ];

    const mazeContainer = document.getElementById("maze-container");
    const levelSelect = document.getElementById("Level");
    const rat = document.getElementById("rat");
    const food = document.getElementById("food");

    let currentMaze = [];
    let ratPos = { row: 0, col: 0 };

    function createMaze(mazeArray) {
        currentMaze = mazeArray;
        mazeContainer.innerHTML = '';

        mazeContainer.style.gridTemplateColumns = `repeat(${mazeArray[0].length}, 40px)`;

        for (let i = 0; i < mazeArray.length; i++) {
            for (let j = 0; j < mazeArray[i].length; j++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");

                if (mazeArray[i][j] === 1) {
                    cell.classList.add("wall");
                } else {
                    cell.classList.add("path");
                }

                mazeContainer.appendChild(cell);
            }
        }

        mazeContainer.appendChild(rat);
        mazeContainer.appendChild(food);

        // Place rat at starting position (first walkable path)
        outer: for (let i = 0; i < mazeArray.length; i++) {
            for (let j = 0; j < mazeArray[i].length; j++) {
                if (mazeArray[i][j] === 1) {
                    ratPos.row = i;
                    ratPos.col = j;
                    break outer;
                }
            }
        }

        updateRatPosition();

        // Food always at bottom-right
        food.style.top = `${(mazeArray.length - 1) * 40}px`;
        food.style.left = `${(mazeArray[0].length - 1) * 40}px`;
    }

    function updateRatPosition() {
        rat.style.top = `${ratPos.row * 40}px`;
        rat.style.left = `${ratPos.col * 40}px`;
    }

    document.addEventListener("keydown", function (e) {
        let { row, col } = ratPos;

        if (e.key === "ArrowUp" && row > 0 && currentMaze[row - 1][col] === 1) {
            ratPos.row--;
        } else if (e.key === "ArrowDown" && row < currentMaze.length - 1 && currentMaze[row + 1][col] === 1) {
            ratPos.row++;
        } else if (e.key === "ArrowLeft" && col > 0 && currentMaze[row][col - 1] === 1) {
            ratPos.col--;
        } else if (e.key === "ArrowRight" && col < currentMaze[0].length - 1 && currentMaze[row][col + 1] === 1) {
            ratPos.col++;
        }

        updateRatPosition();

        // Optional: check for win
        const foodLeft = food.offsetLeft;
        const foodTop = food.offsetTop;
        if (rat.offsetLeft === foodLeft && rat.offsetTop === foodTop) {
            alert("You reached the cheese! 🧀");
        }
    });

    levelSelect.addEventListener("change", () => {
        if (levelSelect.value === "1") createMaze(level1);
        else if (levelSelect.value === "2") createMaze(level2);
        else if (levelSelect.value === "3") createMaze(level3);
    });

    createMaze(level1);
});