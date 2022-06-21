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

		// We translate the texts and images of the of the main labels (header, footer and front page image)
		let object, div;
		let texts = mainLabels_texts[newLanguage];
		for (i=0; i < texts.length; i++){
			object = texts[i];
			div = document.getElementById(object.identifier);
			if (div !== null){
				div[object.location] = object.content;
			}
		}

		// Case when the user is in any of the views: presentation, instructions or credits
		// NOTE: A non-empty string works as a "true"
		if (relatedToApp){
			document.getElementById("relatedToApp").src = imagesThatVaryWithLanguage[language][relatedToApp];
		}
	}
}

// In this function we also restore variables that indicate the state of the view to their default values
function restoreDefaultValues(){
	frontPage = relatedToApp = false;
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

	document.getElementById("relatedToApp").src = imagesThatVaryWithLanguage[language][relatedToApp];

	let {handToLeft, handToRight} = getFooterElements();
	switch (kind){
		case "presentation":
			handToLeft.onclick = () => changeToView("frontPage_view");
			handToRight.onclick = () => loadRelatedToApp("instructions");
			break;
		case "instructions":
			handToLeft.onclick = () => loadRelatedToApp("presentation");
			handToRight.onclick = () => changeToView("frontPage_view");
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
					document.getElementById("frontPage-title").src = mainLabels_texts[language][0].content;
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
				relatedToApp = kind;
			}
			break;
		case "chooseManifestation_view":
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
	switch (kind){
		// Presentation, instructions or credits
		case "relatedToApp_view":
			changeDisplaying(["footer-elements"], ["footer-label", "magnifyingGlass"]);
			break;
		// Currently, this case will only be the front page
		default:
			changeDisplaying(["footer-label"], ["footer-elements"]);
			break;
	}
}

function openIndex(){
	indexView = true;
    document.getElementById("index-view").style.display = "flex";
    $("#index-view").animate({"width":"70%", "flex-grow":"1"}, 100);
}

function closeIndex(){
	indexView = false;
	$("#index-view").animate({"width":"0%", "display":"none"}, 100);
}

