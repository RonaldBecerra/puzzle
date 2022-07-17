// This includes the header, the footer and the images that are in the front page and the index. 
// In this case we need to differentiate if what we will modify is the inner HTML or the source.
const mainLabels_texts = {
	spanish: [
		{location:"src", identifier:"frontPage-title", content:"img/text/frontPage_es.png"}, // 0
		{location:"src", identifier:"exitView", content:"img/text/exit_es.png"}, // 1
		{location:"src", identifier:"index-title", content:"img/text/index_es.png"}, // 2
		{location:"src", identifier:"header-label", content:"img/text/header_es.png"}, // 3
		{location:"src", identifier:"index-label", content:"img/text/header_es.png"}, // 4
		{location:"innerHTML", identifier:"footer-label", content:"Todos los derechos reservados. ©FUNDABITAT, 2022"}, // 5
	],
	english: [
		{location:"src", identifier:"frontPage-title", content:"img/text/frontPage_en.png"}, // 0
		{location:"src", identifier:"exitView", content:"img/text/exit_en.png"}, // 1
		{location:"src", identifier:"index-title", content:"img/text/frontPage_en.png"}, // 2  (There is no english shadowed version)
		{location:"src", identifier:"header-label", content:"img/text/header_en.png"}, // 3
		{location:"src", identifier:"index-label", content:"img/text/header_en.png"}, // 4
		{location:"innerHTML", identifier:"footer-label", content:"All rights reserved. ©FUNDABITAT, 2022"}, // 5
	],
}