// To save the current state of a game in a file
function saveGame(){
	console.log("Hola");
}

// 
async function loadGame(){
	let fileHandle = await openFileFromDirectory();
	if (null != fileHandle){
		console.log("fileHandle.getFile() = ", await fileHandle.getFile());
	}
}

async function openFileFromDirectory() {
	let fileHandle;

	// Open file picker
	[fileHandle] = await window.showOpenFilePicker();

	if (fileHandle.kind === 'file') {
		return fileHandle;
	}

	// Case when the file could not be loaded
	alert(game_texts[language][8].content);
	return null;
}
