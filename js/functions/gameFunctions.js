/*  
 *  These functions let change the app state
 *
 */

// To load the view where the user can play with the puzzle
function loadGameView(num){
	changeToView("game_view");
	gameView = true;

	// Establish properties to build the cells
	gameDimensionsObject = {
		cellPercentageDim: 100/(boardNumRowsColumns), // Dimension of the cell in percentage
		imageStartPositionFactor: 100/(boardNumRowsColumns-1),
		numberPositions: Math.pow(boardNumRowsColumns,2),

		/* The following is a trick: since we need each cell to represent only a part of the
		 * original image, what we actually do is increase the size of said image temporarily 
		 * when referring to it
		 */
		magnifiedImgPercentageDim: (100 * boardNumRowsColumns),
	}
	generateCells(num);
	startGame();

	// Listeners for when the user starts pressing some point
	document.addEventListener('mousedown', startSelectionDuringGame);
	document.addEventListener('touchstart', startSelectionDuringGame);

	// Listeners for when the user is moving the selection, necessary in this case
	// to ensure that the end selection listener is fired when the movement is too fast
	document.addEventListener('mousemove', preventDefault);
	document.addEventListener('touchmove', preventDefault);

	// Listeners for when the user ends pressing some point
	document.addEventListener('mouseup', endSelectionDuringGame);
	document.addEventListener('touchend', endSelectionDuringGame);
}

// Creates "div" elements inside the "manifestation-image" div,
// that represent the sliding cells.
function generateCells(num){
	// "div" where the cells of the manifestation image will be located
	let boardDiv = document.getElementById("manifestation-image");

	// In principle, "order" is the number associated to the cell, but when cells are swaped,
	// that attribute must be in the cell occupying which had its original position
	let order = 0; 
	
	let str = ""
	for(row = 0 ; row < boardNumRowsColumns; row++){
		for(col = 0 ; col < boardNumRowsColumns; col++){
			str += 
				`<div class="slidingCell centeredFlex" order="`+order+`" style="`+generateCellStyle(col,row,num)+`">
					<span class="help-text" 
						style="display:none; user-select:none; font-family:Arial; font-size:8vmin; 
								font-weight:bold; color:white; -webkit-text-stroke: 1px black;"
					>` + order + 
					`</span>
				</div>`;
			order += 1;
		}
	}
	boardDiv.innerHTML = str;

	// Here we make one of the cells to be empty
	emptyPosition = getRandomInt(0,Math.pow(boardNumRowsColumns,2)-1);
	let emptyCell = getCellByPosition(emptyPosition);
	emptyCell.style['background-image'] = "none";
}

function generateCellStyle(col, row, num){
	let {cellPercentageDim, imageStartPositionFactor, magnifiedImgPercentageDim} = gameDimensionsObject;

	return `
		background-image: url(` + manifestations_figures[num].game + `);
		background-size: ` + magnifiedImgPercentageDim + `% ` + magnifiedImgPercentageDim + `%;
		background-position: ` + (col*imageStartPositionFactor) +`% `+ (row*imageStartPositionFactor) + `%; 
		height: ` + cellPercentageDim + `%;
		width: ` + cellPercentageDim + `%;
		left: ` + (col*cellPercentageDim) + `%;
		top: ` + (row*cellPercentageDim) + `%;
	`;
}

// Receives as a parameter the position of the cell 
// (which is not necessarily the number that it displays)
function getCellByPosition(position){
	return document.querySelector('[order="' + position + '"]');
}

// Determines if the given cell is the empty one (which does not have image)
function isEmptyCell(cell){
	return cell.style.backgroundImage === "none";
}

// Once the cells are created, we can start the game
function startGame(){
	numMovements = 0;
	shuffleCells();
}

// Shuffles all the cells on the board to start the game
function shuffleCells(){
	let {numberPositions} = gameDimensionsObject;

	// We create an array with the values of the positions [0,1,2,3,...,numberPositions-1]
	let permutation = [...Array(numberPositions).keys()];

	// Used to ensure cells don't all stay in the same position after shuffling
	let originalPermutation = [...permutation].join(',');

	while (permutation.join(',') === originalPermutation){
		permutation = _.shuffle(permutation);
	}

	// Here is where we put the cells in their new order
	let newPosition;
	for (i=0; i < numberPositions; i++){
		newPosition = permutation[i];
		if (i != newPosition){
			swapCells(i, newPosition, false);
		}
	}
}

// It swaps the position of two cells, given their orders 
function swapCells(order1, order2){
	let cell_1 = getCellByPosition(order1);
	let cell_2 = getCellByPosition(order2);

	// NOTE: To swap the background image is only necessary for when we are moving a cell to the empty space
	[cell_1.style.backgroundImage, cell_2.style.backgroundImage] = [cell_2.style.backgroundImage, cell_1.style.backgroundImage];
	[cell_1.style.backgroundPosition, cell_2.style.backgroundPosition] = [cell_2.style.backgroundPosition, cell_1.style.backgroundPosition];
	[cell_1.innerHTML, cell_2.innerHTML] = [cell_2.innerHTML, cell_1.innerHTML];
}

// This is activated when the user starts pressing some point (touching or with the mouse)
function startSelectionDuringGame(event){
	// If we don't put this, sometimes the end selection listener is not fired
	event.preventDefault();

	// We only store the origin element of selection if it represents a cell of the board game
	originCell = event.target.classList.contains("slidingCell") ? event.target : 
				(event.target.parentElement.classList.contains("slidingCell") ? event.target.parentElement : null);

	if (null != originCell){
		// The coordinates of the pressed position are saved
		let prefix = (event.type === 'mousedown') ? event : event.touches[0];
		startX = prefix.pageX;
		startY = prefix.pageY;
	}
}

// This is activated when the user ends pressing some point (touching or with the mouse)
function endSelectionDuringGame(event){
	if ((null != originCell) && !isEmptyCell(originCell)){
		let mouseWasUsed = (event.type === 'mouseup');

		// These values allow knowing the direction of the movement
		let prefix = mouseWasUsed ? event : event.changedTouches[0];
		let deltaX = prefix.pageX - startX;
		let deltaY = prefix.pageY - startY;

		let factor = mouseWasUsed ? 0.01 : 0.05;

		// The event handler is not executed if the user end pressing too close to the origin 
		// (or if ended pressing on the same cell, in case of doing it with the mouse)
		// REMEMBER: The operator || has less precedence than &&
		if ( mouseWasUsed && (originCell.getAttribute("order") === event.target.getAttribute("order")) ||
			((Math.abs(deltaX) < factor*window.screen.availWidth)  &&  (Math.abs(deltaY) < factor*window.screen.availHeight))){
			return;
		}

		// We determine the direction of the movement
		if ( (Math.abs(deltaX) >= Math.abs(deltaY)) && ((deltaX > 0) && moveCellToEmpty('right') || (deltaX < 0) && moveCellToEmpty('left')) ){
			console.log("Ejecuté el movimiento horizontalmente");
		}
		else if ( (deltaY < 0) && moveCellToEmpty('up') || (deltaY > 0) && moveCellToEmpty('down') ){
			console.log("Ejecuté el movimiento verticalmente");
		}
	}
}

/* Receives a parameter indicating a direction and moves the 
 * cell stored in the global variable "originCell" to the neighbor of
 * that direction, but only if that neighbor is the empty cell.
 * Returns a boolean indicating of the movement was executed or not.
 */
function moveCellToEmpty(direction){
	const originCellOrder = parseInt(originCell.getAttribute("order"));

	let neighborOrder, impossibleMovement;
	switch (direction){
		case 'right':
			neighborOrder = originCellOrder + 1;
			impossibleMovement = ((neighborOrder % boardNumRowsColumns) == 0);
			break;

		case 'left':
			neighborOrder = originCellOrder -1;
			impossibleMovement = ((originCellOrder % boardNumRowsColumns) == 0);
			break;

		case 'up':
			neighborOrder = originCellOrder - boardNumRowsColumns;
			impossibleMovement = (neighborOrder < 0);
			break;

		case 'down':
			neighborOrder = originCellOrder + boardNumRowsColumns;
			impossibleMovement = (neighborOrder > gameDimensionsObject.numberPositions-1);      
			break;

		default:
			return false;
	}
	// We only execute the movement if the neighbor is the empty cell
	if (!impossibleMovement && isEmptyCell(getCellByPosition(neighborOrder))){
		swapCells(originCellOrder, neighborOrder);
		return true;
	}
	return false;
}

/* Shows for a short period of time (expressed in miliseconds) the number corresponding to the cell.
 * The goal is to have an ordered grid  0 -> 1 -> 2 -> ... -> (boardNumRowsColumns^2 - 1)
 * when counting from the top left cell to the bottom right one.
 */
function gameHelp(){
	document.querySelectorAll(".help-text").forEach(e => {
		e.style.display = "inline";
		setTimeout(() => {e.style.display = "none"},2000);
	});
}