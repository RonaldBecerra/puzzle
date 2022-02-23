/*
 *    Universidad Simón Bolívar
 *    Tutora Académica: Angela Di Serio
 *    Representante de la Comunidad y diseñadora: Ruby de Valencia
 *    Programador: Georvic Tur (12-11402)
 *    
 *    Proyecto de Servicio Comunitario
 *        Puzzles Deslizantes Educativos: Manifestaciones Rupestres Venezolanas
*/

// /* El juego que se está implementando es una versión de éste:
// *    en.wikipedia.org/wiki/15_puzzle
// *  
// *  Se van a usar imágenes de arte rupestre y se va a añadir contenido educativo
// *  adicional.
// *
// *  Para comenzar esta aplicación se usó como base una implementación del juego 2048
// *  que se puede conseguir aquí: https://github.com/coolfishstudio/game-2048
// *  Luego la aplicación cambió de manera drástica a medida que se implementaron
// *  los requerimientos de la representante de la comunidad.
// *
// *   Secuencia de Actividades del Juego
// *   
// *   1- Se carga el DOM.
// *   2- Se agregan las celdas al #tablero
// *   3- Se cambia el estilo de acuerdo a las dimensiones del dispositivo.
// *   4- Se inicializan las celdas con la imagen
// *   5- Se desordenan las celdas.
// *   6- Se registran los manejadores de eventos.
// *   7- El usuario juega, pide ayuda o resetea. 
// *      Los manejadores de eventos se activan.
// *   8- Se detecta que la imagen ha sido reconstruida.
// *   9- Termina el juego.
// */




// /*
// * 
// * Se resetea la partida. Primero se ordenan de manera ascendente las celdas.
// * Luego se usa una función para desordenarlas. 
// */
function resetear(){
    
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
                'top':""+posicionCeldaY+"%"});
        }
    }
    
    desordenar(); // Se desordenan las celdas
    tomarElTiempoEmpezar() // Se resetea el reloj
    desbloquearCeldas(); // Si el usuario había pulsado pause, se vuelve a
                         // activar el tablero
    resetearContadorDeMovidas();
}

// /*
// * 
// * Muestra por un breve intervalo de tiempo el número de las celdas.
// * Se empieza a contar desde la celda superior izquierda hacia la derecha y
// * abajo. El objetivo es tener una cuadrícula ordenada: 
// * 0 -> 1 -> 2 -> ... -> (dimX * dimY - 1)
// *
// */
function ayudar(){
    
    var anchoDeCelda = parseInt($("#celda-0-0").css("width"),10);
    
    $(".celda").css({
        "font-size":""+Math.floor(0.2*anchoDeCelda)+"px"
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

// /*
// * 
// * Se insertan elementos div al elemento identificado como #tablero.
// * Estos elementos div representan a las celdas que se podrán mover
// * durante el juego
// *
// */
function generarCeldas(){
    
    var tablero = $("#tablero");
    
    for(var i = 0 ; i < dimX ; i++){
        for(var j = 0 ; j < dimY ; j++){
            
            var orden = (j*dimY+i); // Este atributo data-order debe ser una invariante
                                    // del tablero. Siempre debe estar ordenado de manera
                                    // ascendente empezando desde la esquina superior 
                                    // izquierda
            var contenido = "<div id='celda-"+i+"-"+j+"' class='celda' data-order='"+orden+"' ><span class='texto-ayuda'>"+orden+"</span></div>";
            tablero.append(contenido);
        }
    }
}

// /*
// * 
// * Prepara las celdas para que se adapten al tamaño de la pantalla usando
// * porcentajes.
// */
function prepararResponsive(){
    
    // dimY determina cuántas celdas aparecen por fila. Debe ser una cuadrícula.
    $(".celda").css({
        "width":(""+(100/dimY)+"%"),
        "height" : (""+(100/dimY)+"%"),
        "margin" : "0%",
        "padding" : "0%"
    });
    

}


// /*
// * 
// * Añade las celdas con imágenes y las desordena. Inicializa los contadores
// * de movidas y de tiempo.
// */
function comenzarPartida(){
    
    
        generarCeldas();
        prepararResponsive();           // Asegura responsiveness
        inicializarTablero();           // Se colocan las imagenes en las celdas
        resetear();                     // Se desordenan las celda
        tomarElTiempoEmpezar();         // Inicializa el reloj
        resetearContadorDeMovidas();    // Inicializa el contador de movidas

}

// /*
// * 
// * Desordena las celdas del tablero. La blanca se colocar de acuerdo al 
// * diccionario de blancas. En dicho diccionario hay posiciones recomendadas
// * para la blanca que dependen de cada imagen.
// */
function desordenar(){
    
    var permutacion = [];
    var posicion_blanca = diccionario_posicion_blanca_juego[imagenSeleccionadaIndex];
    
    //Se colocan los demás valores de order
    for(var i = 0; i < dimX; i++){
        for(var j = 0; j < dimY; j++){
            
            var indice = j*dimY + i;
            permutacion[indice] = indice;
        }
    }
    
    permutacion = _.shuffle(permutacion); // Se desordenan
    
    // Como se desordenó a la blanca, se coloca en su posición recomendada
    for(var i=0; i < dimX*dimY; i++){
        if (permutacion[i] == posicion_blanca){
            var aux = permutacion[i];
            permutacion[i] = permutacion[posicion_blanca];
            permutacion[posicion_blanca] = aux;
        }
    }
    
    //Se ejecuta el cambio de posiciones
    for(var i = 0; i < dimX; i++){
        for(var j = 0; j < dimY; j++){
            
            var order1 = j*dimY + i;
            var order2 = permutacion[order1];
            
            intercambiarElementos(order1,order2);
        }
    }
    
}


// /*
// * 
// * Dados los valores únicos de los atributos 'data-order' pertenecientes
// * a dos celdas, se intercambian sus posiciones en el tablero usando
// * dichos valores. Data-order debe mantener una invariante del tablero.
// *
// */
function intercambiarElementos(order1, order2){
        
        // Se encuentran los elementos dados sus órdenes
        var elemento1 = $(".celda[data-order="+order1+"]");
        var elemento2 = $(".celda[data-order="+order2+"]");
        
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
        
        aumentarCantidadMovidas();
}


// /*
// * 
// * Ya creadas las celdas y asignados los valores de 'data-order', se colocan
// * las partes correspondientes de la imagen de fondo.
// *
// */
function inicializarTablero(){
    
    
    //Se incrementa el tamaño de la imagen para que cada celda muestre una parte
    //distinta de la misma
    var porcentaje1 = ""+(100*dimY)+"%";
    var porcentaje2 = ""+(100*dimX)+"%";
    
    //Incrementos porcentuales de la posición de la imagen
    //Notar que el porcentaje del "background-position" de css hace
    //referencia a la imagen y a su contenedor.
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
            celdaImagen.css({
                'background-repeat': 'no-repeat',
                'background-image': "url('"+url_imagen+"')",
                'background-size': porcentaje1+" "+porcentaje2,
                'background-position-x': ""+(anchoCeldas*i)+"%", 
                'background-position-y': ""+(alturaCeldas*j)+"%",
                'position':'absolute',
                'height':''+(tamanoCelda)+"%",
                'width' : ''+(tamanoCelda)+"%",
                'left' : ""+posicionCeldaX+"%",
                'top':""+posicionCeldaY+"%",
                'font-size' : '0px'
            });
            $(".texto-ayuda").css("display", "none");
            var tuplaPosicionBlanca = posicionBlanca();
            
            //No se muestra la celda de la blanca
            if ((i==tuplaPosicionBlanca.x_pos)
                &&
                (j==tuplaPosicionBlanca.y_pos)){
                    
                    celdaImagen.css({"background-image": "none"});
                    
                }
            
        }
        
    }
    
}

//  /* 
//  * Consulta el diccionario de posiciones recomendadas para la celda blanca
//  * y devuelve un objeto con esa información
//  */
function posicionBlanca(){
    
    var posBlanca = diccionario_posicion_blanca_juego[imagenSeleccionadaIndex];
    var x_pos = Math.floor(posBlanca/dimY);
    var y_pos = Math.floor(posBlanca%dimY);
    return {x_pos : x_pos, y_pos : y_pos}
}

//Cuando el usuario comienza a tocar la pantalla 
document.addEventListener('touchstart', function(event){
    imageMapResize();
    //Se guardan las coordenadas de la posición tocada
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;

    //Se obtiene el elemento tocado
    var nombreElemTocado = event.target.getAttribute('id');
    elemTocado = $('#'+nombreElemTocado);
    

});

//Cuando mueve el dedo por la pantalla
document.addEventListener('touchmove', function(event){
    event.preventDefault();
});

//Cuando quita el dedo de la pantalla
document.addEventListener('touchend', function(event){
    
    //Coordenadas de la posición donde se deja de tocar la pantalla
    endX = event.changedTouches[0].pageX;
    endY = event.changedTouches[0].pageY;
    
    //Permiten saber la dirección del movimiento
    var deltaX = endX - startX;
    var deltaY = endY - startY;
    
    //Si no se mueve mucho el dedo, entonces no se ejecuta el manejador de eventos
    if(Math.abs(deltaX) < 0.08 * anchoDePantalla && Math.abs(deltaY) < 0.08 * anchoDePantalla){
        return;
    }
    
    //1- Se determina cuál fue la dirección del movimiento
    //2- Se ejecuta el manejador de ser permitido el movimiento
    //3- Se determina si la imagen fue ordenada
    if(Math.abs(deltaX) >= Math.abs(deltaY)){
        if(deltaX > 0){
            
            if(moverDerecha()){
                haTerminadoLaPartida();
            }
        }else{
            
            if(moverIzquierda()){
                haTerminadoLaPartida();
            }
        }
    }else{
        if(deltaY > 0){
            
            if(moverAbajo()){
                haTerminadoLaPartida();
            }
        }else{
            
            if(moverArriba()){
                haTerminadoLaPartida();
            }
        }
    }

});



// /*
// * 
// * Mueve hacia arriba el elemento tocado. Asume que el elemento tocado
// * está en 'elemTocado.'
// * 'elemTocado' se actualiza en el manejador de "touchstart"
// */
function moverArriba(){
    
    //Encuentro el orden del elemento con el que se intercambia
    var orderCeldaTocada = parseInt(elemTocado.attr("data-order"),10);
    var orderVecino = orderCeldaTocada - dimY;
    
    //Determino si puedo moverlo hacia arriba
    if (orderVecino < 0){
        return false;
    }
    
    //Encuentro el elemento a intercambiar
    var vecino = $(".celda[data-order="+orderVecino+"]");
    
    var tuplaPosicionBlanca = posicionBlanca();
    var nombre_celda_blanca = "celda-"
                                +tuplaPosicionBlanca.x_pos
                                +"-"
                                +tuplaPosicionBlanca.y_pos;
    //Determino si es el vacío
    if (vecino.attr("id") !== nombre_celda_blanca){
        return false;
    }
    
    intercambiarElementos(orderCeldaTocada,orderVecino);
    
    return true;

}


// /*
// * 
// * Mueve hacia abajo el elemento tocado. Asume que el elemento tocado
// * está en 'elemTocado.'
// * 'elemTocado' se actualiza en el manejador de "touchstart"
// */
function moverAbajo(){
    
    //Encuentro el orden del elemento con el que se intercambia
    var orderCeldaTocada = parseInt(elemTocado.attr("data-order"),10);
    var orderVecino = orderCeldaTocada + dimY;
    
    //Determino si puedo moverlo hacia abajo
    if (orderVecino > dimX*dimY){
        return false;
    }
    
    //Encuentro el elemento a intercambiar
    var vecino = $(".celda[data-order="+orderVecino+"]");
    
    var tuplaPosicionBlanca = posicionBlanca();
    var nombre_celda_blanca = "celda-"
                                +tuplaPosicionBlanca.x_pos
                                +"-"
                                +tuplaPosicionBlanca.y_pos;
    //Determino si es el vacío
    if (vecino.attr("id") !== nombre_celda_blanca){
        return false;
    }
    
    intercambiarElementos(orderCeldaTocada,orderVecino);
    
    return true;

}


// /*
// * 
// * Mueve hacia la derecha el elemento tocado. Asume que el elemento tocado
// * está en 'elemTocado.'
// * 'elemTocado' se actualiza en el manejador de "touchstart"
// */
function moverDerecha(){

    //Encuentro el orden del elemento con el que se intercambia
    var orderCeldaTocada = parseInt(elemTocado.attr("data-order"),10);
    var orderVecino = orderCeldaTocada + 1;
    
    //Determino si puedo moverlo hacia la derecha
    if (((orderCeldaTocada+1) % dimY) === 0){
        return false;
    }
    
    //Encuentro el elemento a intercambiar
    var vecino = $(".celda[data-order="+orderVecino+"]");
    
    var tuplaPosicionBlanca = posicionBlanca();
    var nombre_celda_blanca = "celda-"
                                +tuplaPosicionBlanca.x_pos
                                +"-"
                                +tuplaPosicionBlanca.y_pos;
    //Determino si es el vacío
    if (vecino.attr("id") !== nombre_celda_blanca){
        return false;
    }
    
    intercambiarElementos(orderCeldaTocada,orderVecino);
    
    return true;

}


// /*
// * 
// * Mueve hacia la izquierda el elemento tocado. Asume que el elemento tocado
// * está en 'elemTocado.'
// * 'elemTocado' se actualiza en el manejador de "touchstart"
// */
function moverIzquierda(){
    
    //Encuentro el orden del elemento con el que se intercambia
    var orderCeldaTocada = parseInt(elemTocado.attr("data-order"),10);
    var orderVecino = orderCeldaTocada - 1;
    
    //Determino si puedo moverlo hacia la izquierda
    if ((orderCeldaTocada % dimY) === 0){
        return false;
    }
    
    //Encuentro el elemento a intercambiar
    var vecino = $(".celda[data-order="+orderVecino+"]");
    
    var tuplaPosicionBlanca = posicionBlanca();
    var nombre_celda_blanca = "celda-"
                                +tuplaPosicionBlanca.x_pos
                                +"-"
                                +tuplaPosicionBlanca.y_pos;
    //Determino si es el vacío
    if (vecino.attr("id") !== nombre_celda_blanca){
        return false;
    }
    
    
    intercambiarElementos(orderCeldaTocada,orderVecino);
    
    return true;

}

// /*
// * 
// * Determina si las celdas están ordenadas. Si lo están, se emite un mensaje
// * y se devuelve true. De lo contrario, se devuelve false.
// *
// */
function haTerminadoLaPartida(){
    
    for(var i = 0; i < dimX; i++){
        for(var j = 0; j < dimY; j++){
            
            var order = $("#celda-"+i+"-"+j).attr("data-order");
            
            if ((j*dimY + i) !== parseInt(order,10)) { return false; }
        }
    }
    
    alert("¡Ha ganado!");
    
    return true;
}

// /*
// * Pausa o continua la partida. Si se pausa, entonces se desactivan el reloj,
// * el contador y el tablero. Si se continua, todos estos elementos se activan.
// */
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

// /*
// * Desactiva la interacción con las celdas
// */
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

// /*
// * Inicializa el reloj de juego
// */
function tomarElTiempoEmpezar(){
    intervaloDeTiempoDetener();
    intervaloDeTiempoID = window.setInterval(
        tomarElTiempoSiguienteValor,1000);
}

// /*
// * Resetea el reloj de juego
// */
function tomarElTiempoResetear(){
    $("#juego-segundos").text("00");
    $("#juego-minutos").text("00");
}

// /*
// * Desactiva al reloj
// */
function intervaloDeTiempoDetener(){
    if (intervaloDeTiempoID) {
        window.clearInterval(intervaloDeTiempoID);
        intervaloDeTiempo=null;
    }
}

// /*
// * Actualiza los valores del reloj en la vista
// */
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

// /*
// * Vuelve cero el número de movidas en la vista
// */
function resetearContadorDeMovidas(){
    
    document.getElementById("juego-contador-movidass").innerHTML = "0";
}

// /*
// * Actualiza el número de movidas en la vista
// */
function aumentarCantidadMovidas(){
    var movidas = parseInt(document.getElementById("juego-contador-movidass").innerHTML,10);
    movidas++;
    document.getElementById("juego-contador-movidass").innerHTML = movidas.toString(10);
    
}

