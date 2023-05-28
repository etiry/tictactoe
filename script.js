const gameBoard = (() => {
	board = Array(9).fill('X');

	const updateBoard = (e) => {
		index = Number(e.target.id);
		e.target.textContent === 'O' ? board[index] = 'X' : board[index] = 'O';
		displayController.displayBoard();
	}

	return { 
		board,
		updateBoard };
})();

const displayController = (() => {
	const displayBoard = () => {
		const squares = document.querySelectorAll('.square');
		for (i = 0; i < squares.length; i++) {
			squares[i].textContent = gameBoard.board[i];
		};
	};

	const playTurn = () => {
		gameBoard.board[0] = 'O';
		const squares = document.querySelectorAll('.square');
		squares.forEach((square) => {
			square.addEventListener('click', gameBoard.updateBoard);
		});
		// displayController.displayBoard();
	};

	return { 
		displayBoard,
		playTurn };
})();

const player = (marker) => {
	return { marker };
};

displayController.displayBoard();
displayController.playTurn();



// create game board
	// create empty array
	// link each array item to square
// when player clicks a square, fill in with their marker
	// when square is clicked, update appropriate item in array
	// refresh game board