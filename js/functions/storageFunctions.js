// To save the current state of a game in a file
async function saveGame() {
	let stringToSave = "HOLA";

	// create a new handle
	const newHandle = await window.showSaveFilePicker();

	// create a FileSystemWritableFileStream to write to
	const writableStream = await newHandle.createWritable();

	// write our file
	await writableStream.write(stringToSave);

	// close the file and write the contents to disk.
	await writableStream.close();
}

// 
async function loadGame(){
	let fileHandle = await openFileFromDirectory();

	if (null != fileHandle){
		let fileData = await fileHandle.getFile();
		let textData = await fileData.text();
		console.log(textData);
	}
}

// Makes the user select a file from the operating system directory.
// Returns it if there are no errors, null otherwise.
async function openFileFromDirectory() {
	let [fileHandle] = await window.showOpenFilePicker({multiple: false}); // Open file picker

	if (fileHandle.kind === 'file') {
		return fileHandle;
	}
	// Case when the file could not be loaded
	alert(game_texts[language][8].content);
	return null;
}