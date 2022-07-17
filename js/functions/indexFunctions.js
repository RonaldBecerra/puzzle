/*  
 *  These functions let change the app state
 *
 */

/* Processes to perform when an index option is chosen
   The number must match the corresponding text of the "indexOptions_texts" constant
 */
const indexOptions_functions = [
	`onClick = "closeIndex(); changeToView('frontPage_view')"`, // 0
	`onClick = "closeIndex(); loadRelatedToApp('presentation')"`, // 1
	`onClick = "closeIndex(); loadRelatedToApp('instructions')"`, // 2
	`onmouseover="this.style.color='black'"`, // 3
	`onClick = "closeIndex(); boardNumRowsColumns=3"`, // 4
	`onClick = "closeIndex(); boardNumRowsColumns=4"`, // 5
	`onClick = "closeIndex(); boardNumRowsColumns=6"`, // 6
	`onClick = "closeIndex(); changeToView('presentation')"`, // 7
	`onClick = "closeIndex(); loadRelatedToApp('credits')"`, // 8
	`onClick = "closeIndex(); changeToView('exit_view')"`, // 9
]

// To create the texts of the index menu (drawer navigator)
function generate_indexOptions(newLanguage){
	let div, texts, str = "";

	div = document.getElementById("index-options");
	texts = indexOptions_texts[newLanguage];

	for (i=0; i < texts.length; i++){
		str += `<div class="index-clickableText stretch_horizontally"` + indexOptions_functions[i] + `>` 
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