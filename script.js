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

	const roundCounter = () => {
  		count += 1;
  		return count;
    };

    const getRound = () => count;

    const resetBoard = () => {
    	for (let i = 0; i < rows; i++) {
			for (let j = 0; j < columns; j++) {
				board[i][j] = square.getValue();
			}
		};
		count = 0;
    }

	return { 
		getBoard,
		addMarker,
		checkBoard,
		roundCounter, 
		getRound,
		resetBoard };
})();

const gameController = (() => {
	const board = gameBoard;

	const players = [
		{
			name: '',
			token: 'X'
		},
		{
			name: '',
			token: 'O'
		}];

	let activePlayer = players[0];

	let winner = null;

	const addPlayerNames = (playerOne, playerTwo) => {
		players[0].name = playerOne;
		players[1].name = playerTwo;
	}

	const resetPlayerNames = () => {
		players[0].name = '';
		players[1].name = '';
	}

	const switchPlayerTurn = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
	};

	const getActivePlayer = () => activePlayer;

	const resetActivePlayer = () => activePlayer = players[0];

	const playRound = (row, column) => {
		const playedRow = row;
		const playedColumn = column;

		if (board.getBoard()[playedRow][playedColumn] === '' &&
			winner === null) {
			board.addMarker(playedRow, playedColumn);
			board.roundCounter();
		
			if (board.checkBoard(board.getBoard())) {
				winner = getActivePlayer().name;
			} else if (board.getRound() === 9) {
				winner = 'tie';
			} else {
				switchPlayerTurn();
			}
		}

	}

	const getWinner = () => winner;

	const resetWinner = () => winner = null;

	return {
		playRound,
		addPlayerNames,
		resetPlayerNames,
		getActivePlayer,
		resetActivePlayer,
		getWinner,
		resetWinner
	}
})();

const displayController = (() => {
	board = gameBoard;
	game = gameController;
	gameStarted = false;
	const announcement = document.querySelector('.announcement');
	const container = document.querySelector('.container');
	const resetButton = document.querySelector('.reset');
	const startButton = document.querySelector('.start');
	const submitButton = document.querySelector('.submit-button');
	const closeButton = document.querySelector('.close-button');

	const displayBoard = () => {
		container.textContent = '';

		const gameBoard = board.getBoard();
		const activePlayer = game.getActivePlayer();

		if (gameStarted === true) {
			if (game.getWinner() === null) {
				announcement.textContent = `${activePlayer.name}'s turn`;
			} else if (game.getWinner() === 'tie') {
				announcement.textContent = 'It\'s a tie!';
			} else {
				announcement.textContent = `${activePlayer.name} wins!`
			}
		} else {
			announcement.textContent = '';
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

		if (gameStarted === true) {
			game.playRound(selectedRow, selectedCol);
			displayBoard();
		};
	}

	container.addEventListener('click', clickHandler);

	const resetClickHandler = (e) => {
		gameBoard.resetBoard();
		game.resetActivePlayer();
		game.resetWinner();
		game.resetPlayerNames();
		gameStarted = false;
		displayBoard();
	}

	resetButton.addEventListener('click', resetClickHandler);

	const openForm = () => {
	  document.querySelector('.player-name-form').style.display = 'block';
	}

	const closeForm = () => {
	  document.querySelector('.player-name-form').style.display = 'none';
	}

	const submitForm = (e) => {
	  e.preventDefault();

	  playerOne = document.querySelector('input[id=player-1]');
	  playerTwo = document.querySelector('input[id=player-2]');

	  game.addPlayerNames(playerOne.value, playerTwo.value);

	  playerOne.value = '';
	  playerTwo.value = '';
	  gameStarted = true;

	  closeForm();
	  displayBoard();
	}

	startButton.addEventListener('click', openForm);
	closeButton.addEventListener('click', closeForm);
	submitButton.addEventListener('click', submitForm);

	displayBoard();

})();

