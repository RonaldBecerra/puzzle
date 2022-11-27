/*  
 *  These functions let change the app state
 *
 */

// To load the view where the user can play with the puzzle.
// The "loadedInfo" param is for when we are loading a saved game.
function loadGameView(num, loadedInfo=null){
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
	changeTextsInGame(language);

	// Case when the game is being played for the first time
	if (null== loadedInfo){
		generateCells(num);
	}
	else{ // Case when we are loading a previously saved game
		document.getElementById("manifestation-image").innerHTML = loadedInfo.board;
	}
	
	startGame(loadedInfo);

	//Listeners for when the user starts pressing some point.
	document.addEventListener('mousedown', startSelectionDuringGame);
	document.addEventListener('touchstart', startSelectionDuringGame);

	/* Listeners for when the user is moving the selection, necessary in this case.
	 * to ensure that the end selection listener is fired when the movement is too fast.
	 *
	 * NOTE: Putting passive as true is to prevent scrolling at the same time as sliding a cell.
	 * But that means scrolling is not possible with the touch screen, neither zooming the view.
	 */
	document.addEventListener('mousemove', preventDefault, {passive:false});
	document.addEventListener('touchmove', preventDefault, {passive:false});

	// Listeners for when the user ends pressing some point
	document.addEventListener('mouseup', endSelectionDuringGame);
	document.addEventListener('touchend', endSelectionDuringGame);
}

// Activated when the user is entering in this view, and also when then changes the language
function changeTextsInGame(newLanguage){
	let texts = game_texts[newLanguage];
	for (i=0; i < texts.length; i++){
		let elem = texts[i];
		let id = elem.identifier;
		if (null != id){
			document.getElementById(id).innerHTML = elem.content;
		}
	}
}

// Creates "div" elements inside the "manifestation-image" div,
// that represent the sliding cells.
function generateCells(num){
	const image = manifestations_figures[num].game;

	const fakeImage = document.getElementById("manifestation-image");
	fakeImage.src = image;

	// "div" where the cells of the manifestation image will be located
	let boardDiv = document.getElementById("board-game");

	// In principle, "order" is the number associated to the cell, but when cells are swaped,
	// that attribute must be in the cell occupying which had its original position
	let order = 0; 
	
	let str = ""
	for(row = 0 ; row < boardNumRowsColumns; row++){
		for(col = 0 ; col < boardNumRowsColumns; col++){
			str += 
				`<div class="slidingCell centeredFlex" order="`+order+`" style="`+generateCellStyle(col,row,image)+`">
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
	let emptyPosition = getRandomInt(0,Math.pow(boardNumRowsColumns,2)-1);
	let emptyCell = getCellByPosition(emptyPosition);
	emptyCell.style.backgroundImage = "none";
	emptyCell.style.outline = "none";

	// We make the boardDiv match the same size as the fakeImage
	let adjustBoardDivDimensions = () => {
		const {width, height} = window.getComputedStyle(fakeImage);
		// Setting both max-height and min-height with the same value forces the height to be only that value
		boardDiv.style.minWidth = boardDiv.style.maxWidth = width;
		boardDiv.style.minHeight = boardDiv.style.minHeight = height;
	}
	window.addEventListener('resize', adjustBoardDivDimensions);

	// Store the function "adjustMapDimensions" in the global scope to be able to remove that listener later
	window.adjustBoardDivDimensions = adjustBoardDivDimensions;

	// To make the first call we need to wait a little because the fakeImage might not be created yet 
	setTimeout(()=>{adjustBoardDivDimensions()}, 30);
}

function generateCellStyle(col, row, image){
	let {cellPercentageDim, imageStartPositionFactor, magnifiedImgPercentageDim} = gameDimensionsObject;

	return `
		background-image: url(` + image + `);
		background-size: ` + magnifiedImgPercentageDim + `% ` + magnifiedImgPercentageDim + `%;
		background-position: ` + (col*imageStartPositionFactor) +`% `+ (row*imageStartPositionFactor) + `%; 
		height: ` + cellPercentageDim + `%;
		width: ` + cellPercentageDim + `%;
		left: ` + (col*cellPercentageDim) + `%;
		top: ` + (row*cellPercentageDim) + `%;
		outline: 1px solid white; // 1px solid #961907
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
function startGame(loadedInfo=null){
	// Also we need to restore the default values
	gameEnded = false;

	if (null == loadedInfo){
		remainingTimeSeconds = 3600;
		document.getElementById("game-time").style.color = "black";
		document.getElementById("game-time").innerHTML = "60:00";
		document.getElementById("movements-number").innerHTML = "0";

		shuffleCells();
	}
	else {
		remainingTimeSeconds = loadedInfo.remainingTimeSeconds;
		document.getElementById("game-time").style.color = loadedInfo.timeColor;
		document.getElementById("game-time").innerHTML = loadedInfo.displayedTime;
		document.getElementById("movements-number").innerHTML = loadedInfo.movementsNumber;	
	}

	// This could occur when the user has just ended the game and restarts it
	if (gamePaused){
		playOrPause();
	}

	// If we don't put this and previously existed a time interval, the showed time will run faster,
	// because it will have the two intervals running
	stopTheClock();

	runTheClock();
}

// Shuffles all the cells on the board to start the game
function shuffleCells(){
	let {numberPositions} = gameDimensionsObject;

	// We create an array with the values of the positions [0,1,2,3,...,numberPositions-1]
	let permutation = [...Array(numberPositions).keys()];

	// Used to ensure cells don't all stay in the same position after shuffling
	let originalPermutation = [...permutation].join(',');

	// Here we ensure that we don't start with the puzzle solved, and neither with an impossible one
	let possiblePuzzle = false;
	while ((!possiblePuzzle) || (permutation.join(',') === originalPermutation)){
		permutation = _.shuffle(permutation);
		possiblePuzzle = puzzleSolvable(permutation, numberPositions);
	}

	// Here is where we put the cells in their new order
	let newPosition;
	for (i=0; i < numberPositions; i++){
		newPosition = permutation[i];
		if (i != newPosition){
			swapCells(i, newPosition);
		}
	}
}

// Counts the number of inversions in an array [0,1,2,...]
// Source: https://www.geeksforgeeks.org/check-instance-8-puzzle-solvable/
function getInvCount(arrayPuzzle, arrayPuzzleLength){
	let inv_count = 0;
	for (i=0; i < arrayPuzzleLength-1; i++){
		for (j=i+1; j < arrayPuzzleLength; j++){
			// An inversion is counted when a cell that is not the blank one has a higher numeration
			// than another cell that appears later in the array, and is not the blank one either.
			if (!isEmptyCell(getCellByPosition(arrayPuzzle[i])) && !isEmptyCell(getCellByPosition(arrayPuzzle[j])) 
				&& arrayPuzzle[i] > arrayPuzzle[j]){
				inv_count++;
			}
		}
	}
	return inv_count;
}
 
// This function returns true if given array, representing an ordering of the puzzle, is solvable.
// It is solvable when the number of inversions is even.
// Source: https://www.geeksforgeeks.org/check-instance-8-puzzle-solvable/
function puzzleSolvable(arrayPuzzle, arrayPuzzleLength){
	// Count inversions in given puzzle
	let invCount = getInvCount(arrayPuzzle, arrayPuzzleLength);

	// Return true if inversion count is even.
	return (invCount % 2 == 0);
}

// It swaps the position of two cells, given their orders (the originals, not necessarily which they show)
function swapCells(order1, order2){
	let c1 = getCellByPosition(order1);
	let c2 = getCellByPosition(order2);

	// NOTE: To swap the background image is only necessary for when we are moving a cell to the empty space
	[c1.style.backgroundImage, c1.style.outline, c1.style.backgroundPosition, c1.innerHTML, 
	c2.style.backgroundImage, c2.style.outline, c2.style.backgroundPosition, c2.innerHTML] 
	=
	[c2.style.backgroundImage, c2.style.outline, c2.style.backgroundPosition, c2.innerHTML, 
	c1.style.backgroundImage, c1.style.outline, c1.style.backgroundPosition, c1.innerHTML];
}

// This is activated when the user starts pressing some point (touching or with the mouse)
function startSelectionDuringGame(event){
	// If we don't put this, sometimes the end selection listener is not fired
	//event.preventDefault();

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
		let horizontalMov = (Math.abs(deltaX) >= Math.abs(deltaY)) && ((deltaX > 0) && moveCellToEmpty('right') || (deltaX < 0) && moveCellToEmpty('left'));
		let verticalMov = !horizontalMov && ((deltaY < 0) && moveCellToEmpty('up') || (deltaY > 0) && moveCellToEmpty('down'));

		if (horizontalMov || verticalMov){
			increaseNumberOfMovements();
			verifyIfPuzzleWasSolved();
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

// This calls the function that updates the clock every second (1000 miliseconds)
function runTheClock(){
	// The "window.setInterval" function returns an id that later
	// we need to know to clear that interval
	timeIntervalID = window.setInterval(updateTheClock,1000);
}

function stopTheClock(){
	if (timeIntervalID){
		window.clearInterval(timeIntervalID);
		timeIntervalID = null;	
	}
}

// Decreases the total time in 1 second and expresses it as minutes:seconds
function updateTheClock(){
	// This means the user lost the game
	if (remainingTimeSeconds == 0){
		userLost();
	}
	else {
		let div = document.getElementById("game-time");
		remainingTimeSeconds--;

		let minutes = Math.floor(remainingTimeSeconds/60);
		let seconds = remainingTimeSeconds % 60;

		// We alert the user that time is running out with the red color
		if (minutes < 10){
			div.style.color = "red";
		}

		div.innerHTML = appendZeroIfLess10(minutes) + ":" + appendZeroIfLess10(seconds);
	}
}

// NOTE: verified that JavaScript chooses the correct type between string and integer in this case
function increaseNumberOfMovements(){
	let div = document.getElementById("movements-number");
	div.innerHTML = ++div.innerHTML;
}

/* If the game was not paused, it pauses it an viceversa.
 * That means locking or unlocking the clock, the cells and the help button.
 */
function playOrPause(){
	if (!gameEnded){
		let img1 = document.getElementById("playOrPauseImg");
		let img2 = document.getElementById("clockImage");
		let query = document.querySelectorAll(".slidingCell");

		if (gamePaused){
			img1.src = "img/icons/pause.png";
			img2.style.visibility = "visible"; // We show the clock
			query.forEach(e => {e.style.pointerEvents = "auto"}); // We unlock the cells
			gamePaused = false;
			runTheClock();
		}
		else{
			img1.src = "img/icons/play.png";
			img2.style.visibility = "hidden"; // We hide the clock
			query.forEach(e => {e.style.pointerEvents = "none"}); // We lock the cells
			gamePaused = true;
			stopTheClock();	
		}
	}
}

/* Shows for a short period of time (expressed in miliseconds) the number corresponding to each cell.
 * The goal is to have an ordered grid  0 -> 1 -> 2 -> ... -> (boardNumRowsColumns^2 - 1)
 * when counting from the top left cell to the bottom right one.
 */
function gameHelp(){
	if (!gamePaused && !gameEnded){
		document.querySelectorAll(".help-text").forEach(e => {e.style.display = "inline"});
		setTimeout(() => {
			/* We need to repeat the query because the user could have swiped the cells, so 
			 * they wouldn't have the same original properties. If we use the same query instead, 
			 * the numbers on the two swapped cells don't dissapear.
			 */
			document.querySelectorAll(".help-text").forEach(e => {e.style.display = "none"})}, 
			2000 // 2 seconds
		);
	}
}

// Message: "Are you sure you want to restart the game?\nYour progress will be lost"
function resetGame(){
	if (gameEnded){
		startGame();
	}
	else {
		$("#modalConfirmAcceptCancel").modal('show');
	}	
}

// To hide the modal that appears when the user clicks the reset button
function hideResetGameModal(){
	$("#modalConfirmAcceptCancel").modal('hide');
}

// Activated everytime the user swaps two cells
function verifyIfPuzzleWasSolved(){
	let gameCompleted_aux = true;
	let cellsList = document.querySelectorAll(".help-text");

	for (i=0; i < cellsList.length; i++){
		if (i != cellsList[i].innerHTML){
			gameCompleted_aux = false;
			break;
		}
	}
	if (gameCompleted_aux){
		userWon();
	}
}

// This is called when the remaining time is zero seconds
function userLost(){
	setEndOfGame();
	alert(game_texts[language][5].content);
}

// This is called when the user managed to complete the puzzle
function userWon(){
	setEndOfGame();
	// The setTimeout is to not show the message before the last cell is moved to its place visually
	setTimeout(()=>{alert(game_texts[language][6].content)}, 200);
}

// Called both when the user lost or when the user managed to complete the puzzle
function setEndOfGame(){
	// We pause the game because we don't want the time to continue running, neither the user slide the cells
	playOrPause(); // If the time was running, it's because the game was not paused, so this pauses the game
	gameEnded = true;
}