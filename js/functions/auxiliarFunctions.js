// This is put in some listeners, and we store it in a global function to be able to remove it in them
function preventDefault(event){
	event.preventDefault();
}

// Returns an integer between the min and the max indicated
function getRandomInt(min, max){
	return Math.floor(Math.random(min, max) * (max - min)) + min;
}

// To express numbers like 9 as 09
let appendZeroIfLess10 = (number) => {
	if (number < 10){
		return '0'+number;
	}
	return number.toString();
}