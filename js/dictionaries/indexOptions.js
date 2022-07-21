// The texts that appear in the index, that are clickable
const indexOptions_texts = {
	spanish: [
		"Inicio", // 0
		"Presentación", // 1
		"Instrucciones", // 2
		"Manifestaciones:", // 3
		"&nbsp".repeat(24) + "3x3", // 4
		"&nbsp".repeat(24) + "4x4", // 5
		"&nbsp".repeat(24) + "6x6", // 6
		"Cargar partida", // 7
		"Créditos", // 8
		"Salir", // 9

	],
	english: [
		"Start", // 0
		"Presentation", // 1
		"Instructions", // 2
		"Manifestations:", // 3
		"&nbsp".repeat(20) + "3x3", // 4
		"&nbsp".repeat(20) + "4x4", // 5
		"&nbsp".repeat(20) + "6x6", // 6
		"Load game", // 7
		"Credits", // 8
		"Exit", // 9
	],
};

/* Processes to perform when an index option is chosen
   The number must match the corresponding text of the "indexOptions_texts" constant
 */
const indexOptions_functions = [
	`onClick = "closeIndex(); changeToView('frontPage_view')"`, // 0
	`onClick = "closeIndex(); loadRelatedToApp('presentation')"`, // 1
	`onClick = "closeIndex(); loadRelatedToApp('instructions')"`, // 2
	`onmouseover="this.style.color='black'"`, // 3
	`onClick = "closeIndex(); boardNumRowsColumns=3; changeToView('manifestations_menu')"`, // 4
	`onClick = "closeIndex(); boardNumRowsColumns=4; changeToView('manifestations_menu')"`, // 5
	`onClick = "closeIndex(); boardNumRowsColumns=6; changeToView('manifestations_menu')"`, // 6
	`onClick = "closeIndex(); changeToView('presentation')"`, // 7
	`onClick = "closeIndex(); loadRelatedToApp('credits')"`, // 8
	`onClick = "closeIndex(); changeToView('exit_view')"`, // 9
];