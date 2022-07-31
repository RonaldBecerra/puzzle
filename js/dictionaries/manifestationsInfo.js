// The texts that appear in the buttons of the menu for choosing the manifestation
const manifestations_options = {
	spanish: [
		"PETROGLIFO", // 0
		"PINTURA RUPESTRE", // 1
		"DOLMEN", // 2
		"MENHIRES", // 3
		"MONOLITOS", // 4
		"AMOLADORES", // 5
		"CÚPULAS", // 6
		"BATEA", // 7
		"PUNTOS ACOPLADOS", // 8
		"PIEDRA MÍTICA NATURAL", // 9
		"CERRO MÍTICO NATURAL", // 10
		"ESFERA LÍTICA", // 11
		"GEOGLIFO", // 12
		"MICROPETROGLIFOS", // 13
	],
	english: [
		"PETROGLYPH", // 0
		"ROCK PAINTINGS", // 1
		"DOLMEN", // 2
		"MENHIRS", // 3
		"MONOLITHS", // 4
		"WHETSTONES", // 5
		"DOMES", // 6
		"TROUGH", // 7
		"COUPLED POINTS", // 8
		"NATURAL MYTHICAL STONES", // 9
		"NATURAL MYTHICAL HILLS", // 10
		"STONES SPHERES", // 11
		"GEOGLYPH", // 12
		"MICROPETROGLYPHS", // 13
	],
};

// Directions to the images of the manifestations: the one used in the game, 
// and the one used in the preview, that is not the same one.
var manifestations_figures = [];

function createManifestationsFigures(){
	let prefix = "img/manifestations/";
	let texts = manifestations_options['english'];

	// We convert the manifestations_options elements to the corresponding directories names
	for (i=0; i < texts.length; i++){
		let elem = texts[i].toLowerCase();
		elem = elem.replaceAll(' ','_');
		elem = prefix + elem + "/";
	
		// We build the dictionary
		manifestations_figures.push({
			game:    elem + "game.jpg",
			preview: elem + "preview.jpg",
		})
	}
}

createManifestationsFigures();

const manifestations_texts = {
	spanish: [
		{ // 0
			label: `Petroglifo<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Perú, Sudamérica`,
			description: `Los <span style="color:var(--red-manifestation)">Petroglifos</span> son grabados de figuras en bajorrelieve, en la superficie de algunas rocas, realizados con diferentes técnicas de percusión directa o indirecta, abrasión y/o rayado. Su presencia implica, como implicaba en épocas pasadas, territorialidad. Las señales eran reconocidas por los miembros de una misma comunidad étnica, e identificadas como signos territoriales por miembros de otras comunidades, que las temían y respetaban.`,
		},
		{ // 1
			label: `Petroglifo<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Perú, Sudamérica`,
			description: `Las <span style="color:var(--purple-manifestation)">Pinturas Rupestres o Pictografías</span> son dibujos realizados en las rocas mediante la aplicación de pigmentos. Se utilizaron en algunos casos sustancias minerales de óxidos de hierro, sustancias de origen animal, como sangre y grasas, también carbón y arcillas. Aparecen en cuevas y abrigos, protegidas del clima y la visibilidad.`,
		},
		{ // 2
			label: `Petroglifo<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Perú, Sudamérica`,
			description: `El <span style="color:var(--green-manifestation)">Dolmen</span> es un <span style="color:var(--green-manifestation)">Monumento Megalítico</span> formado por piedras verticales, cubiertas por losas horizontales de gran tamaño, conformando paredes y techo.<br>En Venezuela, algunos no son obra humana, sino afloramientos graníticos naturales, que el hombre aprovechó para colocar sus <span style="color:var(--purple-manifestation)">Pinturas Rupestres</span> y enterramientos.`,
		},
		{ // 3
			label: `Petroglifo<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Perú, Sudamérica`,
			description: `Los <span style="color:var(--green-manifestation)">Menhires</span> son <span style="color:var(--green-manifestation)">Monumentos Megalíticos</span> formados por grandes piedras alargadas, colocadas en fila vertical, con su parte inferior enterrada en el suelo para estabilizarlas. Algunos presentan grabados en su superficie. La existencia de grabados sobre algunas rocas de las filas de <span style="color:var(--green-manifestation)">Menhires</span> permite relacionar dos manifestaciones -<span style="color:var(--red-manifestation)">Petrogligfos</span> y <span style="color:var(--green-manifestation)">Menhires</span>- como pertenecientes a una misma época y comunidad.`,
		},
		{ // 4
			label: `Petroglifo<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Perú, Sudamérica`,
			description: `Los <span style="color:var(--green-manifestation)">Monolitos</span> son <span style="color:var(--green-manifestation)">Monumentos Megalíticos</span> conformados por un solo bloque de piedra de gran tamaño. En el río Vigirima encontramos dos <span style="color:var(--green-manifestation)">Monolitos</span> con grabados en las 3 caras visibles, que son de gran interés.`,
		},
		{ // 5
			label: `Petroglifo<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Perú, Sudamérica`,
			description: `Los <span style="color:var(--gray-manifestation)">Amoladores</span> son depresiones de forma ovalada realizadas por abrasión, posiblemente para afilar instrumentos líticos. Acompañando los <span style="color:var(--red-manifestation)">Petroglifos</span> que bordean los ríos, o en rocas cercanas, aparecen numerosas piedras con surcos con formas de <span style="color:var(--gray-manifestation)">Amoladores</span>, que podrían indicar las formas de los instrumentos líticos utilizados para grabarlos.`,
		},
		{ // 6
			label: `Petroglifo<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Perú, Sudamérica`,
			description: `Las <span style="color:var(--gray-manifestation)">Cúpulas</span> son grabados de forma de cortes semicirculares en las rocas, de 2 a 5 cm de diámetro y 1 cm de profundidad.<br>Esta manifestación se ha encontrado tanto acompañada de <span style="color:var(--red-manifestation)">Petroglifos</span> como separada de ellos, constituyendo yacimientos rupestres en sí misma.`,
		},
		{ // 7
			label: `Petroglifo<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Perú, Sudamérica`,
			description: `Las <span style="color:var(--gray-manifestation)">Bateas</span> son depresiones de formas generalmente rectangulares, ovaladas o circulares, cortadas en las rocas. No hemos encontrado hasta el presente referencias etnográficas ni etnohistóricas de este tipo de manifestaciones, cuya función queda aún por dilucidar.`,
		},
		{ // 8
			label: `Petroglifo<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Perú, Sudamérica`,
			description: `Los <span style="color:var(--gray-manifestation)">Puntos Acoplados</span> son grabados de formas semicirculares en las rocas, de 1 a 2 cm de diámetro y 1 cm de profundidad. Los encontramos tanto acompañando <span style="color:var(--red-manifestation)">Petroglifos</span> como separados de ellos. No hemos encontrado hasta el presente referencias etnográficas ni etnohistóricas sobre este tipo de manifestación, cuya función queda aún por dilucidar.`,
		},
		{ // 9
			label: `Petroglifo<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Perú, Sudamérica`,
			description: `Las <span style="color:var(--blue-manifestation)">Piedras Míticas Naturales</span> son una Manifestación Rupestre del mayor interés, por su permanente relación con los <span style="color:var(--red-manifestation)">Petroglifos</span>. Estas piedras no son obra humana, sino resultado del trabajo de la naturaleza, que las dotó de formas especiales por las cuales fueron identificadas con ciertos mitos. Simbolizan los Umáwali, encantos que habitan el espacio subterráneo, especialmente las aguas. Sus leyendas las destacan como héroes culturales, contemporáneos a Napiruli, dios creador de los Guarequena.`,
		},
		{ // 10
			label: `Petroglifo<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Perú, Sudamérica`,
			description: `Los <span style="color:var(--blue-manifestation)">Cerros Míticos Naturales</span> cuentan, en nuestro país, con significados e interpretaciones correlacionadas con la variada y extensa mitología, que aún forma parte viva de la cultura de más de 30 etnias indígenas, lingüísticamente diferenciadas. El <span>Cerro Autana</span>, cuyo verdadero nombre es <span>Kuwai</span> (hijo de Napiruli), es considerado el <span>árbol cósmico, árbol de la vida</span> (de la yuca), centro del mundo, que relaciona cielo, tierra e infierno. En este árbol se encontraban las semillas de todas las frutas que servían de sustento a los hombres.`,
		},
		{ // 11
			label: `Petroglifo<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Perú, Sudamérica`,
			description: `Las monumentales <span style="color:var(--burgundy-manifestation)">Esferas Líticas</span> presentan un fino acabado en su superficie; no las hemos encontrado asociadas a ningún sitio rupestre en Venezuela.<br>Las han descubierto en varios países de los 5 continentes, aunque no se tiene información del propósito de su realización, pero se cree que su creación no ha sido un acto casual.`,
		},
		{ // 12
			label: `Petroglifo<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Perú, Sudamérica`,
			description: `Los <span style="color:var(--orange-manifestation)">Geoglifos</span> son grabados de gran tamaño, realizados en la tierra, sobre laderas de cerros o en planicies.<br>Sin duda buscaban asegurar su visibilidad a lo lejos.<br>Posiblemente son contemporáneos a los <span style="color:var(--red-manifestation)">Petroglifos</span>.`,
		},
		{ // 13
			label: `Petroglifo<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Perú, Sudamérica`,
			description: `Los <span style="color:var(--ocher-manifestation)">Micropetroglifos</span> son pequeños guijarros o lajas líticas con grabados. Su uso se desconoce. Su distribución restringida no tiene explicación.<br>Pudieron haber sido utilizados como recursos de enseñanza mnemotécnicos de carácter secreto, talismanes de un grupo cultural específico, como elementos chamánicos adivinatorios.<br>Vigentes hoy día en el uso de caracoles o piedritas en la santería, o como elementos de conjuros adivinatorios.`,
		},
	],
	english: [
		{ // 0
			label: `Petroglifo<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Perú, Sudamérica`,
			description: `The <span style="color:var(--red-manifestation)">Petroglyphs</span> are engraved figures in bas-relief on the surface of some rocks, made with different techniques of direct or indirect percussion, abrasion and/or scratched. Their presence implies, as implied in the past, territoriality. The signs are recognized by members of the same ethnic community, and identified as territorial markers by members of other communities, who fear and respect them.`,
		},
		{ // 1
			label: `Petroglifo<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Perú, Sudamérica`,
			description: `The <span style="color:var(--purple-manifestation)">Rock Paintings or Pictographs</span> are drawings made in the rocks through the application of pigments. It is used in some cases minerals as iron oxides, substances of animal origin, such as blood and fat, also coal and clay. They appear in caves and shelters, protected from the weather and not readily visibility.`,
		},
		{ // 2
			label: `Petroglifo<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Perú, Sudamérica`,
			description: `The <span style="color:var(--green-manifestation)">Dolmen</span> is a <span style="color:var(--green-manifestation)">Megalithic Monument</span> formed by vertical stones, covered by large horizontal slabs, forming walls and roof.<br>In Venezuela, some are not human work, but natural granite outcrops, which man took advantage of to place his <span style="color:var(--purple-manifestation)">Rock Paintings</span> and burial sites.`,
		},
		{ // 3
			label: `Petroglifo<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Perú, Sudamérica`,
			description: `The <span style="color:var(--green-manifestation)">Menhirs</span> are <span style="color:var(--green-manifestation)">Megalithic Monuments</span> formed by large elongated stones, placed in vertical row, with their bottom buried in the ground to stabilize them. Some have engravings on their surface. The existence of engravings on some rocks of the ranks of <span style="color:var(--green-manifestation)">Menhirs</span> allows to relate two manifestations -<span style="color:var(--red-manifestation)">Petroglyphs</span> and <span style="color:var(--green-manifestation)">Menhirs</span>- like belonging to a same time and community.`,
		},
		{ // 4
			label: `Petroglifo<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Perú, Sudamérica`,
			description: `The <span style="color:var(--green-manifestation)">Monoliths</span> are <span style="color:var(--green-manifestation)">Megalithic Monuments</span> formed by a single block of stone of great size. In the river Vigirima we find two <span style="color:var(--green-manifestation)">Monoliths</span> with engravings on the 3 visible faces, which are of great interest.`,
		},
		{ // 5
			label: `Petroglifo<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Perú, Sudamérica`,
			description: `The <span style="color:var(--gray-manifestation)">Whetstones</span> or <span style="color:var(--gray-manifestation)">Grindstones</span> are oval shaped depressions made by abrasion, possibly from sharpening stone implements. Accompanying the <span style="color:var(--red-manifestation)">Petroglyphs</span> that border the rivers, or in nearby rocks, there are many stones with grooves with forms of <span style="color:var(--gray-manifestation)">Whetstones</span>, which could indicate the shapes of the lithic tools used to record them.`,
		},
		{ // 6
			label: `Petroglifo<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Perú, Sudamérica`,
			description: `The <span style="color:var(--gray-manifestation)">Domes</span> are hemispherical engravings in the form of semicircular cuts in the rocks, from 2 to 5 cm in diameter and 1 cm in depth.<br>They constitute rock art finds in themselves, in that they occur both accompanied by <span style="color:var(--red-manifestation)">Petroglyphs</span> and without them.`,
		},
		{ // 7
			label: `Petroglifo<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Perú, Sudamérica`,
			description: `<span style="color:var(--gray-manifestation)">Troughs</span> are depressions of generally rectangular shapes, oval or circular, cut into the rocks. To date we have found neither ethnographic or ethnohistorical references to these types of find, and their function has yet to be explained.`,
		},
		{ // 8
			label: `Petroglifo<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Perú, Sudamérica`,
			description: `The <span style="color:var(--gray-manifestation)">Coupled points</span> are hemispherical engravings in the form of semicircular cuts in the rock, from 1 to 2 cm in diameter and 1 cm in depth. They constitute rock art finds in themselves, in that they occur both accompanied by <span style="color:var(--red-manifestation)">Petroglyphs</span> and without them. To date we have found neither ethnographic or ethnohistorical references to these types of find, and their function has yet to be explained.`,
		},
		{ // 9
			label: `Petroglifo<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Perú, Sudamérica`,
			description: `<span style="color:var(--blue-manifestation)">Natural Mythical Stones</span> are Rock Manifestations of the greatest interest, as they frequently have mythological relation with the <span style="color:var(--red-manifestation)">Petroglyphs</span>. These rocks are not man made, but a product of the working of nature, which gave them peculiar natural forms, virtue by which they were identified with certain myths. These stones symbolize the Umáwali, enchantments which inhabit subterrean spaces, especially waters. In their legens, in turn, they figure as heroes, contemporaries of Napiruli, the Guarekena god of creation.`,
		},
		{ // 10
			label: `Petroglifo<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Perú, Sudamérica`,
			description: `Interpretation and meanings of the <span style="color:var(--blue-manifestation)">Natural Mythical Hills</span>, in our country, are correlated with the varied and extensive mythologies that still today form part of the live culture of 30 linguistically differentiated ethnic groups. The <span>Cerro Autana</span>, whose true name is <span>Kuwai</span> (son of Napiruli), is considered to be <span>the cosmic tree, the tree of life</span> (the yucca of manioc plant), the centre of the world, connecting the sky, the earth and hell. On this tree were to be found all the seeds of all the fruits which would provide man with sustenance.`,
		},
		{ // 11
			label: `Petroglifo<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Perú, Sudamérica`,
			description: `The monumental <span style="color:var(--burgundy-manifestation)">Stones Spheres</span> present a fine finish on its surface; we have not found them associated with any rock site in Venezuela.<br>They have been discovered in several countries of the 5 continents, although there is no information of the purpose of its realization, but it is believed that its creation has not been a casual act.`,
		},
		{ // 12
			label: `Petroglifo<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Perú, Sudamérica`,
			description: `The <span style="color:var(--orange-manifestation)">Geoglyphs</span> are monumental engravings, made in earth, on slopes of hills or the plains.<br>No doubt they sought to ensure their visibility in the distance.<br>They are possibly contemporary to the <span style="color:var(--red-manifestation)">Petroglyphs</span>.`,
		},
		{ // 13
			label: `Petroglifo<br> <span style="font-style:italic">Toro Muerto</span><br>Arequipa<br>Perú, Sudamérica`,
			description: `The <span style="color:var(--ocher-manifestation)">Micropetroglyphs</span> are small pebbles or lithic slabs with engravings. Its use is unknown. Its restricted distribution has no explanation.<br>They could have been used as teaching mnemonic resources of a secret nature, talismans of a specific cultural group, as divinatory shamanic elements.<br>They exist today in the use of snails or stones in Santeria, or as elements of divinatory spells.`,
		},
	]
}