const square = (() => {
	let value = '';

	const getMarker = (marker) => {
		value = marker;
	}

	const getValue = () => value;

	return {
		getMarker,
		getValue
	}
})();

const gameBoard = (() => {
	const rows = 3;
	const columns = 3;
	const board = [];

	for (let i = 0; i < rows; i++) {
		board[i] = [];
		for (let j = 0; j < columns; j++) {
			board[i].push(square.getValue());
		}
	}

	const getBoard = () => board;

	const addMarker = (row, column) => {
		if (board[row][column] === '') {
			board[row][column] = gameController.getActivePlayer().token;
		};
	};

	const checkBoard = (board) => {
		let winner = false;
		for (let i = 0; i < rows; i++) {
			if (board[i][0] === board[i][1] && board[i][0] === board[i][2] &&
				board[i][0] !== '') {
				console.log('row');
				winner = true;
			};
		};
		for (let i = 0; i < columns; i++) {
			if (board[0][i] === board[1][i] && board[0][i] === board[2][i] &&
				board[0][i] !== '') {
				console.log('column');
				winner = true;
			};
		};
		if (board[0][0] === board[1][1] && board[0][0] === board[2][2] && 
			board[0][0] !== '') {
			console.log('diag');
			winner = true;
			};
		if (board[0][2] === board[1][1] && board[0][2] === board[2][0] && 
			board[0][2] !== '') {
			console.log('diag');
			winner = true;
			};					
		return winner;
	};

	const printBoard = () => console.log(board);

	// const updateBoard = (e) => {
	// 	index = Number(e.target.id);
	// 	if (e.target.textContent === '') {
	// 		board[index] = player1.marker;
	// 		displayController.displayBoard();
	// 	}
	// }

	return { 
		getBoard,
		addMarker,
		checkBoard,
		printBoard };
})();

const gameController = ((playerOneName = 'Player One', 
						playerTwoName = 'Player Two') => {
	const board = gameBoard;

	const players = [
		{
			name: playerOneName,
			token: 'X'
		},
		{
			name: playerTwoName,
			token: 'O'
		}];

	let activePlayer = players[0];

	const switchPlayerTurn = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
	};

	const getActivePlayer = () => activePlayer;

	const printNewRound = () => {
		board.printBoard();
		console.log(`${getActivePlayer().name}'s turn`)
	}

	const playRound = () => {
		const row = prompt('Enter row number');
		const column = prompt('Enter column number');

		board.addMarker(row, column);

		if (board.checkBoard(board.getBoard())) {
			console.log(`${getActivePlayer().name} wins!`);
		} else {
			switchPlayerTurn();
			printNewRound();
			playRound();
		}

	}

	printNewRound();

	return {
		playRound,
		getActivePlayer
	}
})();

// const displayController = (() => {
// 	const squares = document.querySelectorAll('.square');

// 	const displayBoard = () => {
// 		for (i = 0; i < squares.length; i++) {
// 			squares[i].textContent = gameBoard.board[i];
// 		};
// 	};

// 	const playTurn = () => {
// 		squares.forEach((square) => {
// 			square.addEventListener('click', gameBoard.updateBoard);
// 		});
// 	};

// 	return { 
// 		displayBoard,
// 		playTurn };
// })();

// const player = (marker) => {
// 	return { marker };
// };

// displayController.displayBoard();
// displayController.playTurn();

game = gameController;

game.playRound();


// create game board
	// create empty array
	// link each array item to square
// when player clicks a square, fill in with their marker
	// when square is clicked, update appropriate item in array
	// refresh game board