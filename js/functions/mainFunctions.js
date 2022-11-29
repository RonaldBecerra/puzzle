/*  
 *  These functions let change the app state
 *
 */

document.addEventListener("backbutton", onBackKeyDown, false);

// This makes the back button to be ignored
function onBackKeyDown(e) {
	e.preventDefault();
}

function exitApp(){
	if (isMobileDevice){
		navigator.app.exitApp();
		return false;
	}
	// PC case. Verified to work with Chrome and Microsoft Edge.
	// Probably if this application consisted of a website that 
	// navigates between several pages, having a browsing history 
	// for them, this wouldn't work.
	window.close();
	return false;
}

// It calls the correct css file depending on the 
function adjustStyle(width, height) {
	let rel = width/height;
	if (rel < 0.7) {
		sizeStyleSheet = 'narrow';
		document.getElementById("size-stylesheet").href = "css/narrow.css";
	} else if (rel < 1.42) {
		sizeStyleSheet = 'medium';
		document.getElementById("size-stylesheet").href = "css/medium.css";
	} else {
		sizeStyleSheet = 'wide';
		document.getElementById("size-stylesheet").href = "css/wide.css";
	}
}

// Here we put everything that needs to be initialized when the page is loaded
window.onload = async function(){
	// Apply the correct css file, according to the initial dimensions
	adjustStyle(window.innerWidth, window.innerHeight);
	// This is to listen the current size, so we can apply the correct css file
	window.addEventListener('resize', () => adjustStyle(window.innerWidth, window.innerHeight));

	poblateMainTag("frontPage_view");
	change_language('spanish');
}

function change_language(newLanguage){
	if (language !== newLanguage){
		language = newLanguage;

		// We translate the texts and images of the of the main labels (header, footer, front page image and index image)
		let object, div;
		let texts = mainLabels[newLanguage];
		for (i=0; i < texts.length; i++){
			object = texts[i];
			div = document.getElementById(object.identifier);
			if (div !== null){
				div[object.location] = object.content;
			}
		}

		// We generate the texts of the index
		generate_indexOptions(newLanguage);

		// Case when the user is in any of the views: presentation, instructions or credits
		// NOTE: A non-empty string works as a "true"
		if (relatedToApp){
			document.getElementById("relatedToApp").src = relatedToApp_sources[language][relatedToApp];
		}
		else if (choosingManifestation){
			generateManifestationsButtons();
		}
		else if (manifestationView){
			loadManifestationView(chosenManifestation);
		}
		else if (magnifiedMap){
			loadMagnifiedMap(chosenManifestation);
		}
		else if (gameView){
			changeTextsInGame(newLanguage);
		}
	}
}

// In this function we also restore variables that indicate the state of the view to their default values
function restoreDefaultValues(){
	frontPage = relatedToApp = closingApp = choosingManifestation = manifestationView = 
	magnifiedMap = gameView = false;

	// Delete the listeners that could have been added. 
	// If the function to remove is null, this doesn't do anything (does not throw an exception)
	window.removeEventListener('resize', window.adjustMapDimensions);
	window.removeEventListener('resize', window.adjustBoardDivDimensions);

	document.removeEventListener('mousedown', startSelectionDuringGame);
	document.removeEventListener('touchstart', startSelectionDuringGame);

	document.removeEventListener('mousemove', preventDefault, {passive:false});
	document.removeEventListener('touchmove', preventDefault, {passive:false});

	document.removeEventListener('mouseup', endSelectionDuringGame);
	document.removeEventListener('touchend', endSelectionDuringGame);

	// We don't want the time to continue running when we leave the game view
	window.clearInterval(timeIntervalID);
}

function changeToView(kind){
	restoreDefaultValues();
	poblateMainTag(kind);
	changeFooter(kind);
}

// This returns the HTML elements located in the footer, except the default label and the save game button
getFooterElements = () => ({
	handToLeft: document.getElementById("handToLeft"),
	handToRight: document.getElementById("handToRight"),
})

// To load any of the views: presentation, instructions or credits
function loadRelatedToApp(kind){
	changeToView("relatedToApp_view");
	relatedToApp = kind;

	document.getElementById("relatedToApp").src = relatedToApp_sources[language][relatedToApp];

	let {handToLeft, handToRight} = getFooterElements();
	switch (kind){
		case "presentation":
			handToLeft.onclick = () => changeToView("frontPage_view");
			handToRight.onclick = () => loadRelatedToApp("instructions");
			break;
		case "instructions":
			handToLeft.onclick = () => loadRelatedToApp("presentation");
			handToRight.onclick = () => changeToView('manifestations_menu');
			break;
		case "credits":
			handToLeft.onclick = () => changeToView("frontPage_view");
			changeDisplaying([], ["handToRight"]); // In this case we hide the corresponding hand
			break;
		default:
			break;
	}
}

/* The "main" label of the HTML can have different inner HTML objects depending to the case.
   Here we build that internal part according to it.
 */
function poblateMainTag(kind){
	let div = document.getElementsByTagName("main")[0];
	div.style = "overflow-y:auto";

	switch (kind){
		// The initial page that appears when opening the app
		case "frontPage_view":
			if (!frontPage){
				div.innerHTML = 
					`<img id="frontPage-title">
					<img id="frontPage-hand" style="position:absolute" src="img/icons/frontal-hand.png"
						onclick="loadRelatedToApp('presentation')">`;
				frontPage = true;

				// The only time "language" could be null is when the app is starting
				if (language!=null){
					document.getElementById("frontPage-title").src = mainLabels[language][0].content;
				}
			}
			break;
		// Presentation, instructions or credits
		case "relatedToApp_view":
			if (!relatedToApp){
				div.innerHTML =
					`<div class="whole" 
							style="display:flex; flex-direction:row; justify-content:center; align-items:flex-end; bottom:2%">
						<img id="relatedToApp">
					</div>`;
			}
			break;
		// Where the user can choose the manifestation with which will play
		case "manifestations_menu":
			if (!choosingManifestation){
				let source = mainLabels[language].find(element => element.identifier === "chooseManifestation-label").content;
				div.innerHTML =
					`<div class="whole centeredFlex" style="flex-direction:column">
						<div class="centeredFlex" style="height:17.59%; width:100%">
							<img id="chooseManifestation-label" src="` + source + `">
						</div>

						<div id="manifestationsMenu-container" class="centeredFlex" 
							 style="height:82.41%; width:100%; flex-direction:column">
						</div>
					</div>`;
			}
			generateManifestationsButtons();
			choosingManifestation = true;
			break;
		// Where appears an image and a description of the manifestation
		case "manifestation_view":
			if (!manifestationView){
				div.innerHTML =
					`<div id="manifestation-view-container" class="manifestation-viewAndGame-container centeredFlex">
						<div id="manifestation-mapAndLabel" style="display:flex; justify-content:space-between; align-items:center">
							<img id="manifestation-map" class="wideOnly" onmouseout="this.style.boxShadow='none'">
							<img id="manifestation-minimap" class="mediumNarrowOnly" onmouseout="this.style.boxShadow='none'">
							<div id="manifestation-label-container" 
								style="display:flex; flex-direction:row; justify-content:flex-start; align-items:center"
							>
								<div id="manifestation-label" style="font-style:italic"></div>
							</div>
						</div>
						<img id="manifestation-image">
						<div id="manifestation-description-container">
							<div id="manifestation-description"></div>
						</div>
					</div>`;
			}
			div.style = "overflow-y:auto"; // This is for the lower text to be always visible
			break;
		// Where appears a map covering all the main view
		case "magnified_map": 
			if (!magnifiedMap){
				div.innerHTML = `<img id="magnified-map-image">`;
			}
			// In the narrow version, the Map rotation causes an unwanted scroll to appear
			div.style = "overflow:hidden";
			break;
		// Where the user can play with the puzzle
		case "game_view": 
			if (!gameView){
				div.innerHTML =
					`<div id="manifestation-game-container" class="manifestation-viewAndGame-container centeredFlex">
						<div id="game-timeAndMovements" style="z-index:1">
							<div style="display:flex; flex-direction:row; align-items:center">
								<div id="hourglass-time-container" class="centeredFlex" style="flex-direction:column">
									<img id="clockImage" src="img/icons/animated-hourglass.gif">
									<div class="centeredFlex" style="flex-grow:1; width:100%">
										<div id="game-time" style="text-align:center, color:black"></div>
									</div>
								</div>

								<div id="movements-container" class="centeredFlex" style="height:100%">
									<div id="movements-title-container" class="centeredFlex">
										<div id="movements-title"></div>
									</div>
									<div id="movements-number-container" class="centeredFlex" style="width:100%">
										<div id="movements-number"></div>
									</div>
								</div>
							</div>
						</div>

						<!-- This is just a fake image (will never be displayed) but is used to get the board dimensions -->
						<img id="manifestation-image" style="z-index:0; opacity:0; position:absolute">

						<!-- Where the sliding cells are located -->
						<div id="board-game"
							style="display:flex; flex-flow:row wrap; justify-content:flex-start; z-index:1;
									align-items:flex-start; background-color:rgba(105, 44, 44, 0.2); box-shadow: 3px 3px grey"
						>
						</div>

						<!-- Play/pause, help and restart buttons -->
						<div id="gameButtons-sector">
							<div id="gameButtons-container" class="centeredFlex">
								<div class="centeredFlex">
									<img id="playOrPauseImg" src="img/icons/pause.png" onclick="playOrPause()">
								</div>
								<div class="centeredFlex">
									<img src="img/icons/game-help.png" onclick="gameHelp()">
								</div>
								<div class="centeredFlex">
									<img src="img/icons/restart.png" onclick="resetGame()">
								</div>
							</div>
						</div>
					</div>

					<!-- Source: https://www.codeproject.com/tips/891309/custom-confirmation-box-using-bootstrap-modal-dial -->
					<div id="modalConfirmAcceptCancel" class="modal fade" style="position:absolute">
						<div class="modal-dialog" style="background-color:white; border-radius:6px">
							<div class="modal-content">
								<div class="modal-header">
									<h4 id="lblTitleConfirmAcceptCancel" class="modal-title" style="font-weight:bold"></h4>
								</div>
								<div class="modal-body">
									<p id="lblMsgConfirmAcceptCancel"></p>
								</div>
								<div class="modal-footer">
									<button id="btnAcceptConfirm" type="button" class="btn btn-primary" 
											onclick="startGame(); hideResetGameModal()">
									</button>
									<button id="btnCancelConfirm" type="button" class="btn btn-default"
											onclick="hideResetGameModal()">
									</button>
								</div>
							</div>
						</div>
					</div>`;
			}
			break;
		// View in which the user can close the application
		case "exit_view":
			if (!closingApp){
				let source = mainLabels[language].find(element => element.identifier === "exitView").content;
				div.innerHTML =
					`<div class="whole centeredFlex">
						<img id="exitView" src="` + source + `">

						<a style="display:block; width:50%; height:40%; position:absolute; left: 0%; top: 40%;"
							onclick="exitApp()">
						</a>

						<a style="display:block; width:50%; height:40%; position:absolute; left: 50%; top: 40%;"
							onclick="changeToView('frontPage_view')">	
						</a>
					</div>`;
				closingApp = true;
			}
			break;
		default:
			break;
	}
}

/* This is used when we want to display some elements and hide others
   But only works when the displaying kind is flex.
 */
function changeDisplaying(arrayDisplay, arrayNotDisplay){
	for (i=0; i < arrayDisplay.length; i++){
		document.getElementById(arrayDisplay[i]).style.display = 'flex';
	}
	for (i=0; i < arrayNotDisplay.length; i++){
		document.getElementById(arrayNotDisplay[i]).style.display = 'none';
	}
}

/* The "footer" may vary according to the view. The possibilities are already built but
   here we make it display the correct case. This is the opposite as what we do with the
   main tag, which is empty by default and we fill it according to the case.
 */
function changeFooter(kind){
	// These elements are hidden in some viewies, so by default we respawn them here
	changeDisplaying(["handToRight"],[]);

	switch (kind){
		// Presentation, instructions or credits
		case "relatedToApp_view":
			changeDisplaying(["footer-elements"], ["footer-label", "footer-save-game"]);
			break;
		// Where appears an image and a description of the manifestation
		case "manifestation_view":
			changeDisplaying(["footer-elements"], ["footer-label", "footer-save-game"]);
			break;
		case "magnified_map": // Where appears a map covering all the main view
			changeDisplaying(["footer-elements"], ["footer-label", "handToRight", "footer-save-game"]);
			break;
		// Where the user can play with the puzzle
		case "game_view":
			changeDisplaying(["footer-save-game"], ["footer-label", "footer-elements"]);
			break;
		// Front page, manifestations menu, exit view
		default:
			changeDisplaying(["footer-label"], ["footer-elements", "footer-save-game"]);
			break;
	}
}