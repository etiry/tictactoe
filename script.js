const square = (() => {
	let value = '';

	const getMarker = () => {
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
	let count = 0;

	for (let i = 0; i < rows; i++) {
		board[i] = [];
		for (let j = 0; j < columns; j++) {
			board[i].push(square.getValue());
		}
	}

	const getBoard = () => board;

	const addMarker = (row, column) => {
		board[row][column] = gameController.getActivePlayer().token;
	};

	const checkBoard = (board) => {
		let winner = false;
		for (let i = 0; i < rows; i++) {
			if (board[i][0] === board[i][1] && board[i][0] === board[i][2] &&
				board[i][0] !== '') {
				winner = true;
			};
		};
		for (let i = 0; i < columns; i++) {
			if (board[0][i] === board[1][i] && board[0][i] === board[2][i] &&
				board[0][i] !== '') {
				winner = true;
			};
		};
		if (board[0][0] === board[1][1] && board[0][0] === board[2][2] && 
			board[0][0] !== '') {
			winner = true;
			};
		if (board[0][2] === board[1][1] && board[0][2] === board[2][0] && 
			board[0][2] !== '') {
			winner = true;
			};					
		return winner;
	};

	// const printBoard = () => console.log(board);

	const roundCounter = () => {
  		count += 1;
  		return count;
    };

    const getRound = () => count;

	return { 
		getBoard,
		addMarker,
		checkBoard,
		// printBoard,
		roundCounter, 
		getRound };
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

	let winner = null;

	const switchPlayerTurn = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
	};

	const getActivePlayer = () => activePlayer;

	// const printNewRound = () => {
	// 	board.printBoard();
	// 	console.log(`${getActivePlayer().name}'s turn`)
	// }

	const playRound = (row, column) => {
		const playedRow = row;
		const playedColumn = column;

		if (board.getBoard()[playedRow][playedColumn] === '') {
			board.addMarker(playedRow, playedColumn);
			board.roundCounter();
		
			if (board.checkBoard(board.getBoard())) {
				winner = getActivePlayer().name;
			} else if (board.getRound() === 9) {
				winner = 'tie';
			} else {
				switchPlayerTurn();
				// printNewRound();
				// playRound();
			}
		}

	}

	const getWinner = () => winner;

	// printNewRound();

	return {
		playRound,
		getActivePlayer,
		getWinner
	}
})();

const displayController = (() => {
	board = gameBoard;
	game = gameController;
	const announcement = document.querySelector('.announcement');
	const container = document.querySelector('.container');

	const displayBoard = () => {
		container.textContent = '';

		const gameBoard = board.getBoard();
		const activePlayer = game.getActivePlayer();

		if (game.getWinner() === null) {
			announcement.textContent = `${activePlayer.name}'s turn`;
		} else if (game.getWinner() === 'tie') {
			announcement.textContent = 'It\'s a tie!';
		} else {
			announcement.textContent = `${activePlayer.name} wins!`
		}

		gameBoard.forEach((row) => {
			row.forEach((cell, index) => {
				cell = document.createElement('button');
				cell.classList.add('square');
				cell.dataset.row = gameBoard.indexOf(row);
				cell.dataset.column = index;
				cell.textContent = gameBoard[cell.dataset.row][cell.dataset.column];
				if (gameBoard.indexOf(row) === 1) {
					cell.classList.add('center-row');
				}
				if (index === 1) {
					cell.classList.add('center-column');
				};
				container.appendChild(cell);
			})
		})
	};

	const clickHandler = (e) => {
		const selectedRow = e.target.dataset.row;
		const selectedCol = e.target.dataset.column;
		if (!selectedRow || !selectedCol) return;

		game.playRound(selectedRow, selectedCol);
		displayBoard();
	}

	container.addEventListener('click', clickHandler);

	displayBoard();

})();

