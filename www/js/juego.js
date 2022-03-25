/*
 *    Universidad Simón Bolívar
 *    Tutora Académica: Angela Di Serio
 *    Representante de la Comunidad y diseñadora: Ruby de Valencia
 *    Programador: Georvic Tur (12-11402)
 *    
 *    Proyecto de Servicio Comunitario
 *        Puzzles Deslizantes Educativos: Manifestaciones Rupestres Venezolanas
 */

/* El juego que se está implementando es una versión de éste:
 *    en.wikipedia.org/wiki/15_puzzle
 *  
 *  Se van a usar imágenes de arte rupestre y se va a añadir contenido educativo
 *  adicional.
 *
 *  Para comenzar esta aplicación se usó como base una implementación del juego 2048
 *  que se puede conseguir aquí: https://github.com/coolfishstudio/game-2048
 *  Luego la aplicación cambió de manera drástica a medida que se implementaron
 *  los requerimientos de la representante de la comunidad.
 *
 *   Secuencia de Actividades del Juego
 *   
 *   1- Se carga el DOM.
 *   2- Se agregan las celdas al #tablero
 *   3- Se cambia el estilo de acuerdo a las dimensiones del dispositivo.
 *   4- Se inicializan las celdas con la imagen
 *   5- Se desordenan las celdas.
 *   6- Se registran los manejadores de eventos.
 *   7- El usuario juega, pide ayuda o resetea. 
 *      Los manejadores de eventos se activan.
 *   8- Se detecta que la imagen ha sido reconstruida.
 *   9- Termina el juego.
 */


/*
 * Se resetea la partida. Primero se ordenan de manera ascendente las celdas.
 * Luego se usa una función para desordenarlas. 
 */
function resetear(){
    console.log("\n\nEntré en juego.js > resetear");
    
    tomarElTiempoResetear();
    resetearContadorDeMovidas();
    
    // Cada celda tiene un atributo data-order que indica la posición
    // actual de la celda en el tablero usando una enumeración desde 
    // 0 hasta dimX*dimY - 1. Esta es una invariante, pues siempre debe mantenerse
    // ordenada de manera ascendente empezando a contar desde la esquina superior
    // izquierda. La posición de la celda se actualiza usando porcentajes.
    
    var tamanoCelda = 100/(dimY);
    
    for(var i = 0; i < dimX; i++){
        for(var j = 0; j < dimY; j++){
            
            var elemento = $("#celda-"+i+"-"+j)
            var order = (j*dimY+i).toString(10);
            
            elemento.attr("data-order", order);
            
            var posicionCeldaX = tamanoCelda*i;
            var posicionCeldaY = tamanoCelda*j;
            elemento.css({
                'left' : ""+posicionCeldaX+"%",
                'top':""+posicionCeldaY+"%"
            });
        }
    }
    
    //desordenar(); // Se desordenan las celdas
    tomarElTiempoEmpezar() // Se resetea el reloj
    desbloquearCeldas(); // Si el usuario había pulsado pause, se vuelve a
                         // activar el tablero
    resetearContadorDeMovidas();
}

/*
 * Muestra por un breve intervalo de tiempo el número de las celdas.
 * Se empieza a contar desde la celda superior izquierda hacia la derecha y
 * abajo. El objetivo es tener una cuadrícula ordenada: 
 * 0 -> 1 -> 2 -> ... -> (dimX * dimY - 1)
 *
 */
function ayudar(){
    console.log("\n\nEntré en juego.js > ayudar");
    const anchoDeCelda = parseInt($("#celda-0-0").css("width"),10);
    const altoDeCelda = parseInt($("#celda-0-0").css("height"),10);

    const valueWidth = Math.floor(0.2*anchoDeCelda);
    const valueHeight = Math.floor(0.8*altoDeCelda);
    const fontSize = (valueWidth > valueHeight) ? valueHeight : valueWidth;
    
    $(".celda").css({
        "font-size":""+fontSize+"px"
    });
    $(".texto-ayuda").css("display", "inline");
    // Se establece el intervalo de tiempo en el que se muestra la ayuda
    setTimeout(function(){
        $(".celda").css({
            "font-size":"0px"
        });
        $(".texto-ayuda").css("display", "none");
    },1000);
                
}

/*
 * Se insertan elementos div al elemento identificado como #tablero.
 * Estos elementos div representan a las celdas que se podrán mover
 * durante el juego
 */
// function generarCeldas(){
//     console.log("\n\nEntré en juego.js > generarCeldas");
//     var tablero = $("#tablero");
    
//     for(var i = 0 ; i < dimX ; i++){
//         for(var j = 0 ; j < dimY ; j++){
            
//             var orden = (j*dimY+i); // Este atributo data-order debe ser una invariante
//                                     // del tablero. Siempre debe estar ordenado de manera
//                                     // ascendente empezando desde la esquina superior 
//                                     // izquierda
//             console.log("    - La celda es "+i+"-"+j+", y tiene orden = ", orden);
//             var contenido = "<div id='celda-"+i+"-"+j+"' class='celda' data-order='"+orden+"' ><span class='texto-ayuda'>"+orden+"</span></div>";
//             tablero.append(contenido);
//         }
//     }
// }

function generarCeldas(){
    console.log("\n\nEntré en juego.js > generarCeldas");
    var tablero = $("#tablero");
    
    for(var i = 0 ; i < dimX ; i++){
        for(var j = 0 ; j < dimY ; j++){
            
            var orden = (j*dimY+i); // Este atributo data-order debe ser una invariante
                                    // del tablero. Siempre debe estar ordenado de manera
                                    // ascendente empezando desde la esquina superior 
                                    // izquierda
            console.log("    - La celda es "+i+"-"+j+", y tiene orden = ", orden);
            var contenido = "<div id='celda-"+i+"-"+j+"' class='celda' data-order='"+orden+"' ><span class='texto-ayuda'>"+orden+"</span></div>";
            tablero.append(contenido);
        }
    }
}

/*
 * Prepara las celdas para que se adapten al tamaño de la pantalla usando
 * porcentajes.
 */
function prepararResponsive(){
    console.log("\n\nEntré en juego.js > prepararResponsive");
    // dimY determina cuántas celdas aparecen por fila. Debe ser una cuadrícula.
    $(".celda").css({
        "width":(""+(100/dimY)+"%"),
        "height" : (""+(100/dimY)+"%"),
        "margin" : "0%",
        "padding" : "0%",
        "display" : "flex",
        "justify-content" : "center",
        "align-items" : "center",
    });
}


/*
 * Añade las celdas con imágenes y las desordena. Inicializa los contadores
 * de movidas y de tiempo.
 */
function comenzarPartida(){
    console.log("\n\nEntré en juego.js > comenzarPartida");
    console.log("\n    - Desde juego.js > comenzarPartida, voy a llamar a generarCeldas");
    generarCeldas();
    console.log("\n    - Desde juego.js > comenzarPartida, voy a llamar a prepararResponsive");
    prepararResponsive();         // Asegura responsiveness
    console.log("\n    - Desde juego.js > comenzarPartida, voy a llamar a inicializarTablero");
    inicializarTablero();         // Se colocan las imagenes en las celdas
    console.log("\n    - Desde juego.js > comenzarPartida, voy a llamar a resetear");
    resetear();                   // Se desordenan las celdas
    console.log("\n    - Desde juego.js > comenzarPartida, voy a llamar a tomarElTiempoEmpezar");
    tomarElTiempoEmpezar();       // Inicializa el reloj
    console.log("\n    - Desde juego.js > comenzarPartida, voy a llamar a resetearContadorDeMovidas");
    resetearContadorDeMovidas();  // Inicializa el contador de movidas
}

/*
 * Desordena las celdas del tablero. La blanca se colocar de acuerdo al 
 * diccionario de blancas. En dicho diccionario hay posiciones recomendadas
 * para la blanca que dependen de cada imagen.
 */
function desordenar(){
    console.log("\n\nEntré en juego.js > desordenar");
    var permutacion = [];
    var posicion_blanca = diccionario_posicion_blanca_juego[imagenSeleccionadaIndex];

    // PROVISIONAL
    console.log("    - Voy a entrar en el primer provisional");
    let arreglo = document.getElementById("tablero").querySelectorAll(".celda");
    for (i=0; i < arreglo.length; i++){
        console.log("    - orden = ", arreglo[i]);
    }
    
    //Se colocan los demás valores de order
    for(var i = 0; i < dimX; i++){
        for(var j = 0; j < dimY; j++){
            
            var indice = j*dimY + i;
            permutacion[indice] = indice;
        }
    }
    
    console.log("    - Antes de desordenar, permutación = "+permutacion);
    permutacion = _.shuffle(permutacion); // Se desordenan
    console.log("    - Después de desordenar, permutación = "+permutacion);
    
    // Como se desordenó a la blanca, se coloca en su posición recomendada
    console.log("    - Voy a entrar en el primer for, con dimX*dimY = ", dimX*dimY);
    for(var i=0; i < dimX*dimY; i++){
        console.log("        i = ", i);
        if (permutacion[i] == posicion_blanca){
            var aux = permutacion[i];
            permutacion[i] = permutacion[posicion_blanca];
            permutacion[posicion_blanca] = aux;
        }
    }
    console.log("    - Después de arreglar la posición blanca, permutación = "+permutacion);
    
    //Se ejecuta el cambio de posiciones
    console.log("    - Voy a entrar en el segundo for");
    for(var i = 0; i < dimX; i++){
        console.log("        i = ", i);
        for(var j = 0; j < dimY; j++){
            console.log("            j = ", j);
            var order1 = j*dimY + i;
            var order2 = permutacion[order1];
            console.log("\n    - Desde juego.js > desordenar, voy a llamar a intercambiarElementos");
            intercambiarElementos(order1,order2, false);
        }
    }

    // PROVISIONAL
    console.log("    - Voy a entrar en el segundo provisional");
    arreglo = document.getElementById("tablero").querySelectorAll(".celda");
    for (i=0; i < arreglo.length; i++){
        console.log("    - orden = ", arreglo[i]);
    }
}


/*
 * Dados los valores únicos de los atributos 'data-order' pertenecientes
 * a dos celdas, se intercambian sus posiciones en el tablero usando
 * dichos valores. Data-order debe mantener una invariante del tablero.
 */
function intercambiarElementos(order1, order2, aumentarMovidas=true){
    console.log("\n\nEntré en juego.js > intercambiarElementos");
    console.log("    order1 = ", order1);
    console.log("    order2 = ", order2);

    // Se encuentran los elementos dados sus órdenes
    var elemento1 = $(".celda[data-order="+order1+"]");
    var elemento2 = $(".celda[data-order="+order2+"]");

    console.log("    - Antes de hacer algo:")
    console.log("        elemento1 = ", elemento1);
    console.log("        elemento2 = ", elemento2);
    
    // Se intercambian
    var elemento1Left = elemento1.css("left");
    var elemento1Top = elemento1.css("top");
    
    elemento1.css("left", elemento2.css("left"));
    elemento1.css("top", elemento2.css("top"));
    
    elemento2.css("left", elemento1Left);
    elemento2.css("top", elemento1Top);
    
    // Se actualizan los atributos de data
    elemento1.attr("data-order", order2.toString(10));
    elemento2.attr("data-order", order1.toString(10));

    console.log("    - Después del intercambio:")
    console.log("        elemento1 = ", elemento1.attr("data-order"));
    console.log("        elemento2 = ", elemento2.attr("data-order"));
    
    if (aumentarMovidas){
        console.log("\n    - Desde juego.js > intercambiarElementos, voy a llamar a aumentarCantidadMovidas");
        aumentarCantidadMovidas();
    }
}

/*
 * Dados los valores únicos de los atributos 'data-order' pertenecientes
 * a dos celdas, se intercambian sus posiciones en el tablero usando
 * dichos valores. Data-order debe mantener una invariante del tablero.
 */
/*function intercambiarElementos(order1, order2, aumentarMovidas=true){
    console.log("\n\nEntré en juego.js > intercambiarElementos");
    console.log("    order1 = ", order1);
    console.log("    order2 = ", order2);

    // Se encuentran los id's de los elementos dados sus órdenes
    var id1 = $(".celda[data-order="+order1+"]").attr("id");
    var id2 = $(".celda[data-order="+order2+"]").attr("id");

    // Se encuentra el html de los elementos
    var elemento1 = document.getElementById(id1);
    var elemento2 = document.getElementById(id2);

    // Se intercambian la imagen de cada uno de los dos elementos 
    // (porque si una es la blanca hay que hacer que la imagen de la otra sea nula), 
    // y la porción de la imagen que representa cada uno de ellos
    var elemento1_background_image      = elemento1.style['background-image'];
    var elemento1_background_position_x = elemento1.style['background-position-x'];
    var elemento1_background_position_y = elemento1.style['background-position-y'];
    
    elemento1.style['background-image']      = elemento2.style['background-image'];
    elemento1.style['background-position-x'] = elemento2.style['background-position-x'];
    elemento1.style['background-position-y'] = elemento2.style['background-position-y'];

    elemento1.style['background-image']      = elemento1_background_image;
    elemento2.style['background-position-x'] = elemento1_background_position_x;
    elemento2.style['background-position-y'] = elemento1_background_position_y;

    // También intercambiamos sus identificadores
    elemento1.id = id2;
    elemento2.id = id1;

    if (aumentarMovidas){
        console.log("\n    - Desde juego.js > intercambiarElementos, voy a llamar a aumentarCantidadMovidas");
        aumentarCantidadMovidas();
    }
}*/


/*
 * Ya creadas las celdas y asignados los valores de 'data-order', se colocan
 * las partes correspondientes de la imagen de fondo.
 */
function inicializarTablero(){
    console.log("\n\nEntré en juego.js > inicializarTablero");
    // Se incrementa el tamaño de la imagen para que cada celda muestre una parte
    // distinta de la misma
    var porcentaje1 = ""+(100*dimY)+"%";
    var porcentaje2 = ""+(100*dimX)+"%";
    
    // Incrementos porcentuales de la posición de la imagen
    // Notar que el porcentaje del "background-position" de css hace
    // referencia a la imagen y a su contenedor.
    // X% de la imagen queda sobre X% del contenedor.
    // Por eso 50% centra la imagen en el contenedor
    var alturaCeldas = 100/(dimX-1);
    var anchoCeldas = 100/(dimY-1);
    
    for(var i = 0; i < dimX; i++){
        for(var j = 0; j < dimY; j++){
            
            var celdaImagen = $("#celda-"+i+"-"+j);
            var orderCeldaActual = celdaImagen.attr("data-order");
            var tamanoCelda = 100/(dimY);
            var posicionCeldaX = tamanoCelda*i;
            var posicionCeldaY = tamanoCelda*j;

            //Se posiciona correctamente la parte correspondiente de la imagen
            // celdaImagen.css({
            //     'background-repeat': 'no-repeat',
            //     'background-image': "url('"+url_imagen+"')",
            //     'background-size': porcentaje1+" "+porcentaje2,
            //     'background-position-x': ""+(anchoCeldas*i)+"%", 
            //     'background-position-y': ""+(alturaCeldas*j)+"%",
            //     'position':'absolute',

            //     'height':''+(tamanoCelda)+"%",
            //     //'height':''+100/dimY+"%",

            //     'width' : ''+(tamanoCelda)+"%",
            //     //'width' : ''+100/dimX+"%",

            //     'left' : ""+posicionCeldaX+"%",
            //     'top':""+posicionCeldaY+"%",
            //     'font-size' : '0px'
            // });

            //Se posiciona correctamente la parte correspondiente de la imagen
            celdaImagen.css({
                'background-repeat': 'no-repeat',
                'background-image': "url('"+url_imagen+"')",
                'background-size': porcentaje1+" "+porcentaje2,
                'background-position-x': ""+(anchoCeldas*i)+"%", 
                'background-position-y': ""+(alturaCeldas*j)+"%",
                'position': 'relative',
                //'display':'inline-block',
                'height':''+(tamanoCelda)+"%",
                'width' : ''+(tamanoCelda)+"%",
                'left' : ""+posicionCeldaX+"%",
                'top':""+posicionCeldaY+"%",
                'font-size' : '0px'
            });

            $(".texto-ayuda").css("display", "none");

            console.log("\n    Desde juego.js > inicializarTablero, voy a llamar a posicionBlanca");
            var tuplaPosicionBlanca = posicionBlanca();
            console.log("\n    - tuplaPosicionBlanca = ", tuplaPosicionBlanca);
            
            //No se muestra la celda de la blanca
            if ((i==tuplaPosicionBlanca.x_pos) && (j==tuplaPosicionBlanca.y_pos)){
            console.log("    >>> Entré al caso de posición blanca, con i="+i+", j="+j); 
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
    console.log("\n\nEntré en juego.js > posicionBlanca");
    var posBlanca = diccionario_posicion_blanca_juego[imagenSeleccionadaIndex];
    var x_pos = Math.floor(posBlanca/dimY);
    var y_pos = Math.floor(posBlanca%dimY);
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

// Engloba lo que debe hacerse tanto cuando se hace click con el mouse sobre un elemento 
// como cuando se presiona sobre él en la pantalla
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

// Engloba lo que debe hacerse tanto cuando se suelta el botón izquierdo del mouse
// como cuando se deja de tocar la pantalla
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
    console.log("\n\nEntré en juego.js > moverCasilla");
    console.log("    direccion = ", direccion);
    // Encontrar el orden del elemento con el que se intercambia
    var orderCeldaTocada = parseInt(elemTocado.attr("data-order"),10);

    let orderVecino, movimientoImposible;
    switch (direccion){
        case 'derecha':
            orderVecino = orderCeldaTocada + 1;
            movimientoImposible = (((orderCeldaTocada+1) % dimY) === 0);
            break;

        case 'izquierda':
            orderVecino = orderCeldaTocada -1;
            movimientoImposible = ((orderCeldaTocada % dimY) === 0);
            break;

        case 'arriba':
            orderVecino = orderCeldaTocada - dimY;
            movimientoImposible = orderVecino < 0;
            break;

        case 'abajo':
            orderVecino = orderCeldaTocada + dimY;
            movimientoImposible = orderVecino > dimX*dimY;          
            break;

        default:
            return false;
    }
    console.log("\n    - movimientoImposible = ", movimientoImposible);
    console.log("    - orderCeldaTocada = ", orderCeldaTocada);
    console.log("    - orderVecino = ", orderVecino);

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

    console.log("\n    - vecino.attr('id') = ", vecino.attr("id"));
    console.log("    - nombre_celda_blanca = ", nombre_celda_blanca);
    console.log("    - nombre_celda_tocada = ", elemTocado.attr("id"));
    // Si el vecino no es la celda blanca, no podemos intercambiar las posiciones
    if (vecino.attr("id") !== nombre_celda_blanca){
        return false;
    }
    
    console.log("\nDesde juego.js > moverCasilla, voy a llamar a intercambiarElementos");
    intercambiarElementos(orderCeldaTocada, orderVecino);
    return true;
}

/*
 * Determina si las celdas están ordenadas. Si lo están, se emite un mensaje
 * y se devuelve true. De lo contrario, se devuelve false.
 *
 */
function verificarFinPartida(){
    console.log("\n\nEntré en juego.js > verificarFinPartida");
    for(var i = 0; i < dimX; i++){
        for(var j = 0; j < dimY; j++){
            
            var order = $("#celda-"+i+"-"+j).attr("data-order");
            
            if ((j*dimY + i) !== parseInt(order,10)) { 
                // No ha terminado la partida
                return false; 
            }
        }
    }
    
    // Caso en que la partida terminó
    alert("¡Felicitaciones, ha resuelto el Puzzle!");
    return true;
}

/*
 * Pausa o continua la partida. Si se pausa, entonces se desactivan el reloj,
 * el contador y el tablero. Si se continua, todos estos elementos se activan.
 */
function pausarToggle(){
    
    if($(".celda").css("pointer-events")!=="none"){
        $(".celda").css({
            'pointer-events' : 'none'
        });
        intervaloDeTiempoDetener();
        $("#pausar_reiniciar").attr("src","img/iconos/play.png");
        $("#reloj_arena_juego").attr("src", "img/iconos/reloj_arena.png");
        $("#juego_resetear").css({
            'pointer-events' : 'none'
        });
    }
    else{
        desbloquearCeldas();
        tomarElTiempoEmpezar();
    } 
}

/*
 * Desactiva la interacción con las celdas
 */
function desbloquearCeldas(){
    console.log("\n\nEntré en juego.js > desbloquearCeldas");
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
    console.log("\n\nEntré en juego.js > tomarElTiempoEmpezar");
    console.log("\n    Desde juego.js > tomarElTiempoEmpezar, voy a llamar a intervaloDeTiempoDetener");
    intervaloDeTiempoDetener();
    intervaloDeTiempoID = window.setInterval(
        tomarElTiempoSiguienteValor,1000);
}

/*
 * Resetea el reloj de juego
 */
function tomarElTiempoResetear(){
    console.log("\n\nEntré en juego.js > tomarElTiempoResetear");
    $("#juego-segundos").text("00");
    $("#juego-minutos").text("00");
}

/*
 * Desactiva al reloj
 */
function intervaloDeTiempoDetener(){
    console.log("\n\nEntré en juego.js > intervaloDeTiempoDetener");
    if (intervaloDeTiempoID) {
        window.clearInterval(intervaloDeTiempoID);
        intervaloDeTiempo=null;
    }
}

/*
 * Actualiza los valores del reloj en la vista
 */
function tomarElTiempoSiguienteValor(){
    //console.log("\n\nEntré en juego.js > tomarElTiempoSiguienteValor");
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
    console.log("\n\nEntré en juego.js > resetearContadorDeMovidas");
    document.getElementById("juego-contador-movidass").innerHTML = "0";
}

/*
 * Actualiza el número de movidas en la vista
 */
function aumentarCantidadMovidas(){
    console.log("\n\nEntré en juego.js > aumentarCantidadMovidas");
    var movidas = parseInt(document.getElementById("juego-contador-movidass").innerHTML,10);
    movidas++;
    document.getElementById("juego-contador-movidass").innerHTML = movidas.toString(10);    
}

