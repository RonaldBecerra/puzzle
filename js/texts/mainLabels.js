// This includes the header, the footer and the image that is in the front page. In this case we need to
// differentiate if what we will modify is the inner HTML or the source.
const mainLabels_texts = {
	spanish: [
		{location:"src", identifier:"frontPage-title", content:"img/text/frontPage_es.png"}, // 0
		{location:"src", identifier:"header-label", content:"img/text/header_es.png"}, // 1
		{location:"innerHTML", identifier:"footer-label", content:"Todos los derechos reservados. ©FUNDABITAT, 2022"}, // 2
	],
	english: [
		{location:"src", identifier:"frontPage-title", content:"img/text/frontPage_en.png"}, // 0
		{location:"src", identifier:"header-label", content:"img/text/header_en.png"}, // 1
		{location:"innerHTML", identifier:"footer-label", content:"All rights reserved. ©FUNDABITAT, 2022"}, // 2
	],
}