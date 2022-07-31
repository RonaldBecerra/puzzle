/*  
 *  These functions let change the app state
 *
 */

// document.addEventListener("pause", onPause, false);

// function onPause(){
// 	// Se puede guardar el estado de la aplicación
// }


document.addEventListener("backbutton", onBackKeyDown, false);

// This makes the back button to be ignored
function onBackKeyDown(e) {
	e.preventDefault();
}

// Function to listen the current size, so we can apply the correct css file
$(function() {
	adjustStyle($(this).width(), $(this).height());
	$(window).resize(function() {
		adjustStyle($(this).width(), $(this).height());
	});
});

// It calls the correct css file depending on the 
function adjustStyle(width, height) {
	let rel = width/height;
	if (rel < 0.8) {
		$("#size-stylesheet").attr("href", "css/narrow.css");
	} else if (rel < 1.42) {
		$("#size-stylesheet").attr("href", "css/medium.css");
	} else {
		$("#size-stylesheet").attr("href", "css/wide.css"); 
	}
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

// Here we put everything that needs to be initialized when the page is loaded
window.onload = async function(){
	// ---> First, we must load the index here (creo)
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
	}
}

// In this function we also restore variables that indicate the state of the view to their default values
function restoreDefaultValues(){
	frontPage = relatedToApp = closingApp = choosingManifestation = manifestationView = false;
}

function changeToView(kind){
	restoreDefaultValues();
	poblateMainTag(kind);
	changeFooter(kind);
}

// This returns the HTML elements located in the footer
getFooterElements = () => ({
	handToLeft: document.getElementById("handToLeft"),
	magnifyingGlass: document.getElementById("magnifyingGlass"), 
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
					`<div id="manifestation-view-container" class="whole centeredFlex" style="flex-direction:column; justify-content:flex-start">
						<div id="map-label" style="height:14.3%; width:100%; flex-direction:row; align-items:center">
							<img id="manifestation-minimap" style="height:88%">
						</div>
						<img id="manifestation-image" style="height:65%; width:100%">
						<div style="display:flex; height:20.7%; width:100%; justify-content:center; align-items:center">
							<div id="manifestation-description" style="text-align:left"></div>
						</div>
					</div>`;
			}
			break;
		// VIew in which the user can close the application
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
   here we make it display the correct case.
 */
function changeFooter(kind){
	// This disappears in the credits view, so by default we respawn it here
	changeDisplaying(["handToRight"],[]);

	switch (kind){
		// Presentation, instructions or credits
		case "relatedToApp_view":
			changeDisplaying(["footer-elements"], ["footer-label", "magnifyingGlass"]);
			break;
		// Where appears an image and a description of the manifestation
		case "manifestation_view":
			changeDisplaying(["footer-elements","magnifyingGlass"], ["footer-label"]);
			break;
		// Front page, exit view
		default:
			changeDisplaying(["footer-label"], ["footer-elements"]);
			break;
	}
}