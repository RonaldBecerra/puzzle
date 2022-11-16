/*  
 *  These functions let change the app state
 *
 */

// To load the view where appears an image and a description of the manifestation
function loadManifestationView(num){
	changeToView("manifestation_view");
	manifestationView = true;

	let {handToLeft, handToRight} = getFooterElements();

	handToLeft.onclick = () => changeToView('manifestations_menu');
	handToRight.onclick = () => loadGameView(num);

	// Central image
	document.getElementById("manifestation-image").src = manifestations_figures[num].preview;

	let color = manifestationsColors[num];
	let varColor = 'var(--' + color + '-manifestation)';

	// Minimap
	let minimap = document.getElementById("manifestation-minimap");
	minimap.src = "img/maps/minimaps/" + color + ".png";
	minimap.onclick = () => loadMagnifiedMap(num);

	// We want to indicate the user that the minimap is clickable
	minimap.onmouseover = function(){
		minimap.style.boxShadow = 
			"inset -2px -3px 10px -0.5px " + varColor + "," +
			" inset 2px 3px 10px -0.5px " + varColor;
	}

	// Label and description
	let info = manifestations_texts[language][num];
	document.getElementById("manifestation-label").innerHTML = info.label;
	document.getElementById("manifestation-description").innerHTML = info.description;
}

// To load where appears a map covering all the main view
function loadMagnifiedMap(num){
	changeToView("magnified_map");
	magnifiedMap = true;
	setReturnToManifestatonView(num);

	let map = document.getElementById("magnified-map-image");
	map.src = "img/maps/magnified_maps/" + manifestationsColors[num] + "_" + language + ".png";
	let mapParent = map.parentElement;

	/* When we are in a narrow view, we need to rotate the map, but that means that its width
	 * must be its parent's height and its height must be its parent's width. I did not find
	 * any way to manage it with vanilla css, so I do it through a listener.
	 */
	let adjustMapDimensions = () => {
		const {width, height} = window.getComputedStyle(mapParent);
		const numWidth = parseFloat(width);
		const numHeight = parseFloat(height);

		// This assumes that in all possible images of the maps, the relation between the two 
		// dimensions is at most 1.45, which currently occurs.
		if (1.45*numHeight > numWidth){
			if (sizeStyleSheet === 'narrow'){
				if (numHeight > 1.45*numWidth){
					map.style.width = "auto";
					map.style.height = width;
				}
				else {
					map.style.width = height;
					map.style.height = "auto";			
				}
			}
			else{
				map.style.width = width;
				map.style.height = "auto";
			}
		}
		else {
			map.style.width = "auto";
			map.style.height = height;
		}
	}
	adjustMapDimensions();
	window.addEventListener('resize', adjustMapDimensions);

	// Store the function "adjustMapDimensions" in the global scope to be able to remove that listener later
	window.adjustMapDimensions = adjustMapDimensions;
}

function setReturnToManifestatonView(num){
	let {handToLeft} = getFooterElements();
	handToLeft.onclick = () => loadManifestationView(num);
}