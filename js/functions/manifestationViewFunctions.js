/*  
 *  These functions let change the app state
 *
 */

// To load the view Where appears an image and a description of the manifestation
function loadManifestationView(num){
	changeToView("manifestation_view");
	manifestationView = true;

	let {handToLeft, handToRight} = getFooterElements();

	handToLeft.onclick = () => changeToView('manifestations_menu');
	handToRight.onclick = () => changeToView("frontPage_view");

	// Central image
	document.getElementById("manifestation-image").src = manifestations_figures[num].preview;
	// Minimap
	document.getElementById("manifestation-minimap").src = "img/maps/minimaps/" + manifestationsColors[num] + ".png";
	// Description
	document.getElementById("manifestation-description").innerHTML = manifestations_texts[language][num].description;
}