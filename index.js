class Square {
    constructor(bomb = false, count = 0) {
        this.bomb = bomb;
        this.count = count;
    }
}

//Create mines and their indices

const generate_nums = (amount, board) => {
    let rand_nums = [];

    for (let i = 0; i < amount; i++) {
        let rand = Math.ceil(Math.random() * board);
        while (rand_nums.includes(rand)) {
            rand = Math.ceil(Math.random() * board);
        }
        rand_nums.push(rand);
    }
    return rand_nums;
}

//Create the board

const generate_board = (size) => {
    let board = [];
    for (let i = 0; i < size; i++) {
        board.push(new Square);
    }
    return board;
}

//Fill the board with mines

const fill_board = (board, nums) => {
    for (let i = 0; i < board.length; i++) {
        if (nums.includes(i)) {
            board[i].bomb = true;
        }
    }
    return board;
}

let board_size = 480;
let mines_amount = 240;

let nums = generate_nums(mines_amount, board_size);
let board = generate_board(board_size);
let filled_board = fill_board(board, nums);

//Create a grid from filled board

const create_grid = (board, rows) => {
    let grid = [];
    for (let i = 0; i < board.length; i += rows) {
        grid.push(board.slice(i, i + rows));
    }
    return grid;
}

let grid = create_grid(filled_board, 24);

const check_for_bombs = (grid) => {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (!grid[i][j].bomb) {
                if (j!==grid[i].length-1)if (grid[i][j + 1].bomb) grid[i][j].count++;
                if (j!==0) if (grid[i][j - 1].bomb) grid[i][j].count++;
                if (i!==grid.length-1) if (grid[i + 1][j].bomb) grid[i][j].count++;
                if (i!==0) if (grid[i - 1][j].bomb) grid[i][j].count++;
                if (i!==grid.length -1 && j!==grid[i].length-1) if (grid[i + 1][j + 1].bomb) grid[i][j].count++;
                if(i!==0 && j!==0) if (grid[i - 1][j - 1].bomb) grid[i][j].count++;
                if (i!==grid.length-1 && j!==0) if (grid[i + 1][j - 1].bomb) grid[i][j].count++;
                if (i!==0 && j!==grid[i].length-1) if (grid[i - 1][j + 1].bomb) grid[i][j].count++;
            }
        }
    }
}

const css_board = (grid) => {
    check_for_bombs(grid);
    grid.forEach(row => {
        row.forEach((square, index) => {
            document.querySelector('#container').innerHTML += '<div class="square">' + (square.bomb ? '<img src="bomb.jpg">' : '') + '<div>';
        })
    })
}

css_board(grid);

$('.square').click(function () {
    $(this).find('img').css('opacity', '1');
})