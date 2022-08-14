/*  
 *  These functions let change the app state
 *
 */

function generateManifestationsButtons(){
	let div, texts, str = "";

	div = document.getElementById("manifestationsMenu-container");
	texts = manifestations_options[language];

	/* The order of the box-shadow params is:
	 *       x offset, y offset, blur size, spread size, color
	 *
	 * The x starts on the left, so a negative value puts it on the right.
	 * Similarly, the y starts at the top, so a negative value puts it on the bottom
	 *
	 */
	for (i=0; i < texts.length; i++){
		let color, fontWeight;
		if (i === chosenManifestation){
			color = 'yellow';
			fontWeight = 'bold';
		}
		else{
			color = 'white';
			fontWeight = 'normal';			
		}
		str += `<button class="manifestationsMenu-button" name="manButton_` + i.toString() + `"
						style="border: 1px solid #333;
								border-color: var(--` + manifestationsColors[i] + `-manifestation);
								box-shadow: 
									inset -4px -3px 5px -2px rgba(0, 0, 0, 0.8),
								 	inset 2px 3px 5px 0px #d3a063;
								font-family:'Epistolar';
								color: ` + color + `;
								font-weight: ` + fontWeight + `;
								background-color: var(--` + manifestationsColors[i] + `-manifestation)
							   "
						onmouseover = "this.style.color = 'white'; this.style.fontWeight = 'bold'";
						onmouseout = "this.style.color = '`+ color + `'; this.style.fontWeight = '`+ fontWeight + `'"
				>` + texts[i] + 
				`</button>
				<div style="height:1px"></div>`;
	}
	div.innerHTML = str;
	manifestationsButtonsListeners();
}

function manifestationsButtonsListeners(){
	let array = document.getElementsByClassName("manifestationsMenu-button");
	var buttonPressed = null; // It stores a pointer to the currently pressed button

	let startPress = (button, index) => {
		button.style['box-shadow'] = 'none';
		chosenManifestation = index;
		buttonPressed = button;

		// In a PC case we only want to navigate to the next view if the user ends pressing over
		// the same button that started pressing
		if (!isMobileDevice){
			endPressingManifestationMenuButton(button);
		}

		document.addEventListener('mouseup', endPress, false);
		document.addEventListener('touchend', endPress, false);
	}

	// This is necessary in case the user stops pressing outside the button
	// We don't want to change the view in that case, but restore the button appearance
	let endPress = () => {
		buttonPressed.style['box-shadow'] = 
			`inset -4px -3px 5px -2px rgba(0, 0, 0, 0.8),
			 inset 2px 3px 5px 0px #d3a063`;

		document.removeEventListener('mouseup', endPress, false);
		document.removeEventListener('touchend', endPress, false);
	}

	for (i=0; i < array.length; i++){
		let button = array[i];
		// If we simply pass "i" as an argument of startPress, it will vary; it will change in the next iteration
		// because it does not pass the current value but a reference to it
		let index = i; 

		button.addEventListener('mousedown', () => startPress(button, index), false);
		button.addEventListener('touchstart', () => startPress(button, index), false);

		/* In a mobile device we want to navigate to the next view, even if the user ends pressing
		 * on the surface of a different button that is not which started pressing, because the finger
		 * could have slipped
		 */
		if (isMobileDevice){
			endPressingManifestationMenuButton(button);
		}
	}
}

function endPressingManifestationMenuButton(button){
	button.addEventListener('mouseup', () => loadManifestationView(chosenManifestation), false);
	button.addEventListener('touchend', () => loadManifestationView(chosenManifestation), false);
}