/*  
 *  These functions let change the app state
 *
 */

// To load the view where appears an image and a description of the manifestation
function loadManifestationView(num){
	changeToView("manifestation_view");
	manifestationView = true;

	let {handToLeft, magnifyingGlass, handToRight} = getFooterElements();

	handToLeft.onclick = () => changeToView('manifestations_menu');
	magnifyingGlass.onclick = () => loadMagnifiedDescription(num);
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
		if (sizeStyleSheet === 'narrow'){
			let {width, height} = window.getComputedStyle(mapParent);
			width = parseFloat(width);
			height = parseFloat(height);

			if (height/width > 2.05){
				height = width*2.05;
			}
			map.style.minWidth = height.toString()+"px";
			map.style.height = width.toString()+"px";
		}
		// Case when minWidth and height had been assigned in a narrow view, but
		// we are returning to a non-narrow one.
		else if (map.style.minWidth !== ''){
			map.style.minWidth = '';
			map.style.height = '';	
		}
	}
	adjustMapDimensions();
	window.addEventListener('resize', adjustMapDimensions);

	// Store the function "adjustMapDimensions" in the global scope to be able to remove that listener later
	window.adjustMapDimensions = adjustMapDimensions;
}

// To load where appears a map covering all the main view
function loadMagnifiedDescription(num){
	changeToView("magnified_description");
	magnifiedDescription = true;
	setReturnToManifestatonView(num);

	let description = document.getElementById("magnified-description");
	description.innerHTML = manifestations_texts[language][num].description;
}

function setReturnToManifestatonView(num){
	let {handToLeft} = getFooterElements();
	handToLeft.onclick = () => loadManifestationView(num);
}