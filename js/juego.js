/* The implemented game is a version of this:
 *      en.wikipedia.org/wiki/15_puzzle
 *  
 * Rock art images will be used and additional educational content
 * will be added.
 *
 * To start this application, an implementation of the game 2048 
 * was used as a base, which can be obtained here: 
 *      https://github.com/coolfishstudio/game-2048
 *
 * Then the application changed drastically as the requirements 
 * of the community representative were implemented.
 *
 * Sequence of Game Activities
 *
 *  1- The DOM is loaded.
 *  2- The cells are added to the #board
 *  3- The style is changed according to the dimensions of the device.
 *  4- The cells are initialized with the image
 *  5- The cells are disordered.
 *  6- Event handlers are registered.
 *  7- The user plays, asks for help or resets.
 *  8- Event handlers are fired.
 *  9- It is detected that the image has been reconstructed.
 * 10- Finish the game.
 */

let juegoFinalizado, juegoPausado;
/*
 * Añade las celdas con imágenes y las desordena. Inicializa los contadores
 * de movidas y de tiempo.
 */
function comenzarPartida(){
    juegoFinalizado = juegoPausado = false;
    generarCeldas();
    inicializarTablero(); // Se colocan las imagenes en las celdas
    desordenar(); // Se desordenan las celdas
    tomarElTiempoResetear(); // Se resetea el reloj
    tomarElTiempoEmpezar() // Inicializa el reloj
    desbloquearCeldas(); // Si el usuario había pulsado pause, se vuelve a activar el tablero
    resetearContadorDeMovidas();
}

/*
 * Muestra por un breve intervalo de tiempo el número de las celdas.
 * Se empieza a contar desde la celda superior izquierda hacia la derecha y
 * abajo. El objetivo es tener una cuadrícula ordenada: 
 * 0 -> 1 -> 2 -> ... -> (boardNumRows * boardNumColumns - 1)
 */
function ayudar(){
    if (!juegoPausado){
        $(".celda").css({"font-size": "8vmin"});
        $(".texto-ayuda").css("display", "inline");
        // Se establece el intervalo de tiempo en el que se muestra la ayuda
        setTimeout(function(){
            $(".celda").css({"font-size":"0px"});
            $(".texto-ayuda").css("display", "none");
        },1000);  
    }     
}

function generarCeldas(){
    var tablero = $("#tablero");
    var orden = 0; // Este atributo data-order debe ser una invariante
                   // del tablero. Siempre debe estar ordenado de manera
                   // ascendente empezando desde la esquina superior 
                   // izquierda
    
    for(var i = 0 ; i < boardNumRows ; i++){
        for(var j = 0 ; j < boardNumColumns ; j++){
            var contenido = "<div id='celda-"+i+"-"+j+"' class='celda' data-order='"+orden+"' ><span class='texto-ayuda'>"+orden+"</span></div>";
            tablero.append(contenido);
            orden += 1;
        }
    }
}

/*
 * Desordena las celdas del tablero. La blanca se colocar de acuerdo al 
 * diccionario de blancas. En dicho diccionario hay posiciones recomendadas
 * para la blanca que dependen de cada imagen.
 */
function desordenar(){
    var permutacion = [];
    var posicion_blanca = diccionario_posicion_blanca_juego[imagenSeleccionadaIndex];
    
    //Se colocan los demás valores de order
    for(var i = 0; i < boardNumRows; i++){
        for(var j = 0; j < boardNumColumns; j++){
            
            var indice = j*boardNumColumns + i;
            permutacion[indice] = indice;
        }
    }
    
    var permutacionOriginal = [...permutacion].join(',');

    while (permutacion.join(',') !== permutacionOriginal){
        permutacion = _.shuffle(permutacion); // Se desordenan
    }
     
    // Como se desordenó a la blanca, se coloca en su posición recomendada
    for(var i=0; i < boardNumRows*boardNumColumns; i++){
        if (permutacion[i] == posicion_blanca){
            var aux = permutacion[i];
            permutacion[i] = permutacion[posicion_blanca];
            permutacion[posicion_blanca] = aux;
        }
    }
    
    //Se ejecuta el cambio de posiciones
    for(var i = 0; i < boardNumRows; i++){
        for(var j = 0; j < boardNumColumns; j++){
            var order1 = j*boardNumColumns + i;
            var order2 = permutacion[order1];
            intercambiarElementos(order1,order2,false);
        }
    }
}

/*
 * Dados los valores únicos de los atributos 'data-order' pertenecientes
 * a dos celdas, se intercambian sus posiciones en el tablero usando
 * dichos valores. Data-order debe mantener una invariante del tablero.
 */
async function intercambiarElementos(order1, order2, aumentarMovidas=true){
    // Se encuentran los id's de los elementos dados sus órdenes
    var id1 = $(".celda[data-order="+order1+"]").attr("id");
    var id2 = $(".celda[data-order="+order2+"]").attr("id");

    // Se encuentra el html de los elementos
    var elem1 = document.getElementById(id1);
    var elem2 = document.getElementById(id2);

    // Se intercambian la imagen de cada uno de los dos elementos 
    // (porque si una es la blanca hay que hacer que la imagen de la otra sea nula), 
    // la porción de la imagen que representa cada uno de ellos, y el texto
    // de ayuda que es el contenido interno HTML
    const elem1_background_image      = elem1.style['background-image'];
    const elem1_background_position_x = elem1.style['background-position-x'];
    const elem1_background_position_y = elem1.style['background-position-y'];
    const elem1_inner_html            = elem1.innerHTML;
    
    elem1.style['background-image']      = elem2.style['background-image'];
    elem1.style['background-position-x'] = elem2.style['background-position-x'];
    elem1.style['background-position-y'] = elem2.style['background-position-y'];
    elem1.innerHTML                      = elem2.innerHTML;

    elem2.style['background-image']      = elem1_background_image;
    elem2.style['background-position-x'] = elem1_background_position_x;
    elem2.style['background-position-y'] = elem1_background_position_y;
    elem2.innerHTML                      = elem1_inner_html;

    // También intercambiamos sus identificadores
    elem1.id = id2;
    elem2.id = id1;

    if (aumentarMovidas){
        aumentarCantidadMovidas();
    }
}


/*
 * Ya creadas las celdas y asignados los valores de 'data-order', se colocan
 * las partes correspondientes de la imagen de fondo.
 */
function inicializarTablero(){
    // Se incrementa el tamaño de la imagen para que cada celda muestre una parte
    // distinta de la misma
    var porcentaje1 = ""+(100*boardNumColumns)+"%";
    var porcentaje2 = ""+(100*boardNumRows)+"%";
    
    // Incrementos porcentuales de la posición de la imagen
    // Notar que el porcentaje del "background-position" de css hace
    // referencia a la imagen y a su contenedor.
    // X% de la imagen queda sobre X% del contenedor.
    // Por eso 50% centra la imagen en el contenedor
    var alturaCeldas = 100/(boardNumRows-1);
    var anchoCeldas = 100/(boardNumColumns-1);
    
    for(var i = 0; i < boardNumRows; i++){
        for(var j = 0; j < boardNumColumns; j++){
            
            var celdaImagen = $("#celda-"+i+"-"+j);
            var orderCeldaActual = celdaImagen.attr("data-order");
            var tamanoCelda = 100/(boardNumColumns);
            var posicionCeldaX = tamanoCelda*i;
            var posicionCeldaY = tamanoCelda*j;

            //Se posiciona correctamente la parte correspondiente de la imagen
            celdaImagen.css({
                'background-repeat': 'no-repeat',
                'background-image': "url('"+url_imagen+"')",
                'background-size': porcentaje1+" "+porcentaje2,
                'background-position-x': ""+(anchoCeldas*i)+"%", 
                'background-position-y': ""+(alturaCeldas*j)+"%",
                'height':''+(tamanoCelda)+"%",
                'width' : ''+(tamanoCelda)+"%",
                'left' : ""+posicionCeldaX+"%",
                'top':""+posicionCeldaY+"%",
                "margin" : "0%",
                "padding" : "0%",
                "display" : "flex",
                "justify-content" : "center",
                "align-items" : "center",
                'font-size' : '0px',
            });

            $(".texto-ayuda").css("display", "none");

            var tuplaPosicionBlanca = posicionBlanca();
            
            //No se muestra la celda de la blanca
            if ((i==tuplaPosicionBlanca.x_pos) && (j==tuplaPosicionBlanca.y_pos)){
                celdaImagen.css({"background-image": "none"});      
            }        
        }     
    } 
}

/* 
 * Consulta el diccionario de posiciones recomendadas para la celda blanca
 * y devuelve un objeto con esa información
 */
function posicionBlanca(){
    var posBlanca = diccionario_posicion_blanca_juego[imagenSeleccionadaIndex];
    var x_pos = Math.floor(posBlanca/boardNumColumns);
    var y_pos = Math.floor(posBlanca%boardNumColumns);
    return {x_pos : x_pos, y_pos : y_pos}
}

// Cuando el usuario comienza a presionar el botón izquierdo del mouse
document.addEventListener('mousedown', function(event){
    // Se guardan las coordenadas de la posición tocada
    startX = event.pageX;
    startY = event.pageY;

    event.preventDefault();
    empezarSeleccion(event); 
});

// Cuando el usuario comienza a tocar la pantalla (es el equivalente táctil de 'mousedown')
document.addEventListener('touchstart', function(event){
    // Se guardan las coordenadas de la posición tocada
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;

    empezarSeleccion(event);   
});

/*
 * Engloba lo que debe hacerse tanto cuando se hace click con el mouse sobre un elemento 
 * como cuando se presiona sobre él en la pantalla
 */
function empezarSeleccion(event){
    imageMapResize();

    // Se obtiene el elemento tocado
    var nombreElemTocado = event.target.getAttribute('id');
    elemTocado = $('#'+nombreElemTocado);
}

// Cuando el usuario mueve el dedo por la pantalla
document.addEventListener('touchmove', function(event){
    event.preventDefault();
});

// Cuando el usuario suelta el botón izquierdo del mouse
document.addEventListener('mouseup', function(event){
    // Coordenadas de la posición donde se dejó de presionar el botón
    endX = event.pageX;
    endY = event.pageY;
    terminarSeleccion(event,'mouse');
});

// Cuando el usuario quita el dedo de la pantalla (es el equivalente táctil de 'mouseup')
document.addEventListener('touchend', function(event){
    // Coordenadas de la posición donde se deja de tocar la pantalla
    endX = event.changedTouches[0].pageX;
    endY = event.changedTouches[0].pageY;
    terminarSeleccion(event,'touch');
});

/*
 * Engloba lo que debe hacerse tanto cuando se suelta el botón izquierdo del mouse
 * como cuando se deja de tocar la pantalla
 */
function terminarSeleccion(event, kind){
    // Permiten saber la dirección del movimiento
    var deltaX = endX - startX;
    var deltaY = endY - startY;

    var factor = (kind=='mouse') ? 0.01 : 0.05;
    
    // Si no se mueve mucho el dedo, entonces no se ejecuta el manejador de eventos
    if ((kind=='mouse') && ((elemTocado.attr('id')===event.target.getAttribute('id'))) || 
        (Math.abs(deltaX) < factor * anchoDePantalla && Math.abs(deltaY) < factor * anchoDePantalla)){  
        return;
    }

    // 1- Se determina cuál fue la dirección del movimiento
    // 2- Se ejecuta el manejador de ser permitido el movimiento
    // 3- Se determina si la imagen fue ordenada
    if(Math.abs(deltaX) >= Math.abs(deltaY)){
        if ( ((deltaX > 0) && moverCasilla('derecha')) || ((deltaX < 0) && moverCasilla('izquierda')) ){
            verificarFinPartida();
        }
    }else{
        if ( ((deltaY < 0) && moverCasilla('arriba')) || ((deltaY > 0) && moverCasilla('abajo')) ){
            verificarFinPartida();
        }
    }
}

/*
 * Mueve hacia cierta dirección (arriba, abajo, izquierda, derecha) el elemento tocado. 
 * Asume que el elemento tocado está en 'elemTocado.'
 * 'elemTocado' se actualiza en el manejador de "touchstart"
 */
function moverCasilla(direccion){
    // Encontrar el orden del elemento con el que se intercambia
    var orderCeldaTocada = parseInt(elemTocado.attr("data-order"),10);

    let orderVecino, movimientoImposible;
    switch (direccion){
        case 'derecha':
            orderVecino = orderCeldaTocada + 1;
            movimientoImposible = (((orderCeldaTocada+1) % boardNumColumns) === 0);
            break;

        case 'izquierda':
            orderVecino = orderCeldaTocada -1;
            movimientoImposible = ((orderCeldaTocada % boardNumColumns) === 0);
            break;

        case 'arriba':
            orderVecino = orderCeldaTocada - boardNumColumns;
            movimientoImposible = orderVecino < 0;
            break;

        case 'abajo':
            orderVecino = orderCeldaTocada + boardNumColumns;
            movimientoImposible = orderVecino > boardNumRows*boardNumColumns;          
            break;

        default:
            return false;
    }

    if (movimientoImposible){
        return false;
    }
    
    // Encuentrar el elemento a intercambiar
    var vecino = $(".celda[data-order="+orderVecino+"]");
    
    var tuplaPosicionBlanca = posicionBlanca();
    var nombre_celda_blanca = "celda-"
                                +tuplaPosicionBlanca.x_pos
                                +"-"
                                +tuplaPosicionBlanca.y_pos;

    // Si el vecino no es la celda blanca, no podemos intercambiar las posiciones
    if (vecino.attr("id") !== nombre_celda_blanca){
        return false;
    }
    
    intercambiarElementos(orderCeldaTocada, orderVecino);
    return true;
}

/*
 * Determina si las celdas están ordenadas. Si lo están, se emite un mensaje
 * y se devuelve true. De lo contrario, se devuelve false.
 */
function verificarFinPartida(){
    var ordenComparar = 0;
    var ordenCasilla = null;
    for(var i = 0; i < boardNumRows; i++){
        for(var j = 0; j < boardNumColumns; j++){     
            ordenCasilla = $("#celda-"+i+"-"+j).attr("data-order");
            
            if (ordenComparar !== parseInt(ordenCasilla,10)) { 
                // No ha terminado la partida
                return false; 
            }
            ordenComparar += 1;
        }
    }
    // Caso en que la partida terminó
    pausarToggle();
    setTimeout(function(){
        alert("¡Felicitaciones, ha resuelto el Puzzle!");
        juegoFinalizado = true;
    },600);    
    return true;
}

/*
 * Pausa o continua la partida. Si se pausa, entonces se desactivan el reloj,
 * el contador y el tablero. Si se continua, todos estos elementos se activan.
 */
function pausarToggle(){
    if (!juegoFinalizado){
        if($(".celda").css("pointer-events")!=="none"){
            $(".celda").css({
                'pointer-events' : 'none'
            });
            intervaloDeTiempoDetener();
            $("#pausar_reiniciar").attr("src","img/iconos/play.png");
            $("#reloj_arena_juego").attr("src", "img/iconos/reloj_arena.png");
            juegoPausado = true;
        }
        else{
            desbloquearCeldas();
            tomarElTiempoEmpezar();
            juegoPausado = false;
        }
    }
}

/*
 * Desactiva la interacción con las celdas
 */
function desbloquearCeldas(){
    $(".celda").css({
        'pointer-events' : 'auto'
    });
    $("#juego_resetear").css({
        'pointer-events' : 'auto'
    });
    $("#pausar_reiniciar").attr("src","img/iconos/icono-pausa.png");
    $("#reloj_arena_juego").attr("src", "img/iconos/reloj_arena.gif");
}

/*
 * Inicializa el reloj de juego
 */
function tomarElTiempoEmpezar(){
    intervaloDeTiempoDetener();
    intervaloDeTiempoID = window.setInterval(
        tomarElTiempoSiguienteValor,1000);
}

/*
 * Resetea el reloj de juego
 */
function tomarElTiempoResetear(){
    $("#juego-segundos").text("00");
    $("#juego-minutos").text("00");
}

/*
 * Desactiva al reloj
 */
function intervaloDeTiempoDetener(){
    if (intervaloDeTiempoID) {
        window.clearInterval(intervaloDeTiempoID);
        intervaloDeTiempo=null;
    }
}

/*
 * Actualiza los valores del reloj en la vista
 */
function tomarElTiempoSiguienteValor(){
    var segundos = parseInt($("#juego-segundos").text(),10);
    var minutos = parseInt($("#juego-minutos").text(),10);
    if (segundos < 60) {
        segundos++;
    }
    else {
        minutos++;
        segundos = 0;
        if (minutos === 60){
            minutos = 0;
        }
        
    }
    var segString = segundos.toString(10);
    var minString = minutos.toString(10);
    if (segString.length < 2){
        segString = '0'+segString; 
    }
    if (minString.length < 2){
        minString = '0'+minString;
    }
    
    $("#juego-segundos").text(segString);
    $("#juego-minutos").text(minString);
}

/*
 * Vuelve cero el número de movidas en la vista
 */
function resetearContadorDeMovidas(){
    document.getElementById("juego-contador-movidass").innerHTML = "0";
}

/*
 * Actualiza el número de movidas en la vista
 */
function aumentarCantidadMovidas(){
    var movidas = parseInt(document.getElementById("juego-contador-movidass").innerHTML,10);
    movidas++;
    document.getElementById("juego-contador-movidass").innerHTML = movidas.toString(10);    
}

