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
	handToRight.onclick = () => changeToView("frontPage_view");

	// Central image
	document.getElementById("manifestation-image").src = manifestations_figures[num].preview;

	// Minimap
	let minimap = document.getElementById("manifestation-minimap");
	minimap.src = "img/maps/minimaps/" + manifestationsColors[num] + ".png";
	minimap.onclick = () => loadMagnifiedMap(num);

	// Label
	document.getElementById("manifestation-label").innerHTML = manifestations_texts[language][num].label;

	// Description
	document.getElementById("manifestation-description").innerHTML = manifestations_texts[language][num].description;
}

// To load where appears a map covering all the main view
function loadMagnifiedMap(num){
	changeToView("magnified_map");
	magnifiedMap = true;

	let map = document.getElementById("magnified-map-image");
	let mapParent = map.parentElement;

	map.src = "img/maps/magnified_maps/"+ manifestationsColors[num] + "_" + language + ".png";

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

	adjustMapDimensions(map, mapParent);
	window.addEventListener('resize', adjustMapDimensions);

	let {handToLeft} = getFooterElements();
	handToLeft.onclick = () => loadManifestationView(num);
}


