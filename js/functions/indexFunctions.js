/*  
 *  These functions let change the app state
 *
 */

// To create the texts of the index menu (drawer navigator)
function generate_indexOptions(newLanguage){
	let div, texts, str = "";

	let positionSelectedDimensions = (boardNumRowsColumns < 6) ? boardNumRowsColumns+1 : 6;
	div = document.getElementById("index-options");
	texts = indexOptions_texts[newLanguage];

	for (i=0; i < texts.length; i++){
		let color = (positionSelectedDimensions === i) ? 'blue' : 'black';
		str += `<div class="index-clickableText"` + indexOptions_functions[i] +
						`style = "color: `+ color + `"
						onmouseover = "this.style.color = 'white'"
						onmouseout = "this.style.color = '` + color +`'"
					>` 
				+ texts[i] + `</div>`;
	}
	div.innerHTML = str;
}

function openIndex(){
	indexView = true;
    document.getElementById("index-view-container").style.display = "flex";
    $("#index-view-container").animate({"width":"100%",}, 100);
}

function closeIndex(){
	indexView = false;
	$("#index-view-container").animate({"width":"0%", "display":"none"}, 100);
}