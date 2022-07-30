/*  
 *  These functions let change the app state
 *
 */

// To load the view Where appears an image and a description of the manifestation
function loadManifestationView(num){
	console.log("Entré en load");
	changeToView("manifestation_view");
	manifestationView = num;

	let {handToLeft, handToRight} = getFooterElements();

	handToLeft.onclick = () => changeToView('manifestations_menu');
	handToRight.onclick = () => changeToView("frontPage_view");
}