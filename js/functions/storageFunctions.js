/*
 * To save the current state of a game in a file.
 * This function establishes how the content will look like, and calls
 * another function that is which will in fact save the content in a file.
 */
async function saveGame() {
	// In case the game help was displayed, we need to first hide it
	await document.querySelectorAll(".help-text").forEach(e => {
		e.style.display = "none"
	}); 

	let objectToSave = {
		chosenManifestation,
		boardNumRowsColumns,
		remainingTimeSeconds,
		timeColor: document.getElementById("game-time").style.color,
		displayedTime: document.getElementById("game-time").innerHTML,
		movementsNumber: document.getElementById("movements-number").innerHTML,
		board: document.getElementById("manifestation-image").innerHTML,
	}
	saveFile(JSON.stringify(objectToSave));
}

// Receives a strings and writes it in a file
async function saveFile(contentToSave){
	// create a new handle
	const newHandle = await window.showSaveFilePicker(acceptableFilesToSaveOrRead);

	// create a FileSystemWritableFileStream to write to
	const writableStream = await newHandle.createWritable();

	// write our file
	await writableStream.write(contentToSave);

	// close the file and write the contents to disk.
	await writableStream.close();
}


// To load a file representing a state of the game, and return to that state.
async function loadGame(){
	let readText = await loadFile();
	let errorMessage = game_texts[language][8].content;

	// Case when the file could not be loaded
	if (null == readText){
		alert(errorMessage);
	}
	else {
		let object = JSON.parse(readText);
		globalObject = object;
		let acceptanceCondition = 
			object.hasOwnProperty('chosenManifestation') && object.hasOwnProperty('boardNumRowsColumns') && 
			object.hasOwnProperty('remainingTimeSeconds') && object.hasOwnProperty('timeColor') && 
			object.hasOwnProperty('displayedTime') && object.hasOwnProperty('movementsNumber') &&
			object.hasOwnProperty('board');

		if (!acceptanceCondition){
			alert(errorMessage);
		}
		else {
			({chosenManifestation, boardNumRowsColumns} = object);
			loadGameView(chosenManifestation, object);
			closeIndex();

			// This is necessary in case the variable "boardNumRowsColumns" changed, so that the
			// change is reflected in the index
			generate_indexOptions(language);
		}
	}
}

/* 
 * Calls another function to make the user load a file from directory,
 * and returns its text in case it was succesfully read. 
 * Otherwise, it returns null.
 */
async function loadFile(){
	let fileHandle = await openFileFromDirectory();

	if (null != fileHandle){
		let fileData = await fileHandle.getFile();
		let textData = await fileData.text();
		return textData;
	}
	return null;
}

// Makes the user select a file from the operating system directory.
// Returns it if there are no errors, null otherwise.
async function openFileFromDirectory() {
	let [fileHandle] = await window.showOpenFilePicker(acceptableFilesToSaveOrRead); // Open file picker

	if (fileHandle.kind === 'file') {
		return fileHandle;
	}
	return null;
}