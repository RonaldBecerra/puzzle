/*
 *    Universidad Simón Bolívar
 *    Tutora Académica: Angela Di Serio
 *    Representante de la Comunidad y diseñadora: Ruby de Valencia
 *    Programador: Georvic Tur (12-11402)
 *    
 *    Proyecto de Servicio Comunitario
 *        Puzzles Deslizantes Educativos: Manifestaciones Rupestres Venezolanas
*/


// Muestra la Presentación y luego de cierto tiempo la primera vista
$(document).ready(function(){
    
    // Registra evento para resaltar selecciones
    $(".area-sprite").on("click", resaltarAreasSprite);
    
    
    verPortada();
    //setTimeout(function(){
    //            cerrarPortada();
    //            },20000);
    //imageMapResize();
    //$('map').imageMapResize();
    //$("#my_image").css({"width":"100%","height":"100%"});

});


var url_imagen_elegida = "";
var dimension_x=3;
var dimension_y=3;


/*
 * Oculta todas las vistas de la aplicación
 */
function ocultarVistas(){
    console.log("\n\nEntré en menu.js > ocultarVistas");
    ultimaVista = vistaActual;
    $(".vista").css("display","none");
}

function mostrarVistaAnterior(){
    console.log("\n\nEntré en menu.js > mostrarVistaAnterior");
    $("#"+ultimaVista).css("display","block");
}


/*
 * Sólo muestra la primera vista. Allí se selecciona el tipo de representación
 */
function mostrarTipoRepresentacion(){
    console.log("\n\nEntré en menu.js > mostrarTipoRepresentacion");
    console.log("\n    Desde menu.js > mostrarTipoRepresentacion, voy a llamar a ocultarVistas");
    ocultarVistas();
    $("#vista-seleccionar-tipo-manifestacion").css("display","block");
    seleccionarTipoRepresentacion("2"); //Caso por defecto
    vistaActual = "vista-seleccionar-tipo-manifestacion";

}

/*
 * Sólo muestra la última vista. Allí se juega.
 */
function mostrarJuego(){
    console.log("\n\nEntré en menu.js > mostrarJuego");
    console.log("\n    Desde menu.js > mostrarJuego, voy a llamar a ocultarVistas");
    ocultarVistas();
    $("#vista-juego").css("display","block");
    vistaActual = "vista-juego";
}

/*
 * Crea el nuevo tablero con los parámetros introducidos por el usuario
 */
function jugarYa(){
    console.log("\n\nEntré en menu.js > jugarYa");
    $("#tablero").remove();
    // $("#puzzles-deslizantes-educativos-tabla-juego").prepend(
    //     `<div id="tablero"
    //           style="width:100%;
    //                  height:100%;
    //                  position:relative;
    //                  left:0%;
    //                  top:0%;
    //                  margin: 0%;
    //                  overflow:hidden;">
    //      </div>`);
    $("#puzzles-deslizantes-educativos-tabla-juego").prepend(
        `<div id="tablero"
              style="width:100%; height:100%; overflow:hidden; position:relative; display: flex; flex-flow: row wrap; 
                    justify-content: flex-start; align-items: flex-start;"
        >
         </div>`);
    dimX = dimension_x;
    dimY = dimension_y;
    url_imagen = url_imagen_elegida;
    diccionario_posicion_blanca_juego = diccionario_posicion_blanca;
    console.log("\n    Desde menu.js > jugarYa, voy a llamar a mostrarJuego");
    mostrarJuego();
    console.log("\n    Desde menu.js > jugarYa, voy a llamar a comenzarPartida");
    comenzarPartida();
    
    console.log("\n    Desde menu.js > jugarYa, voy a llamar a desbloquearCeldas");
    desbloquearCeldas(); //Esto evita que el tablero quede bloqueado si el usuario
                         //había terminado el juego y quiera volver a empezar
}

/*
 * Obtiene el path de la imagen seleccionada
 */
function seleccionarImagen(numeroImagen){
    console.log("\n\nEntré en menu.js > seleccionarImagen");
    console.log("    numeroImagen = ", numeroImagen);
    imagenSeleccionadaIndex = numeroImagen;
    url_imagen_elegida = diccionario_imagenes[numeroImagen];
}

/*
 * Obtiene la posición de la blanca para la imagen seleccionada dadas sus dimensiones
 */
function seleccionarDimension(x,y){
    console.log("\n\nEntré en menu.js > seleccionarDimension");
    console.log("    x = ", x);
    console.log("    y = ", y);
    dimension_x = parseInt(x,10);
    dimension_y = parseInt(y,10);
    console.log("\n    Desdemenu.js > seleccionarDimension, voy a llamar a resaltarDimension");
    resaltarDimension(dimension_x);

    if ((dimension_x === 3) && (dimension_y === 3)){
        diccionario_posicion_blanca = diccionario_blancas_tipos_3x3[tipoRepresentacion];
    }
    else if ((dimension_x === 4) && (dimension_y === 4)){
        diccionario_posicion_blanca = diccionario_blancas_tipos_4x4[tipoRepresentacion];
    }
    else if ((dimension_x === 6) && (dimension_y === 6)){
        diccionario_posicion_blanca = diccionario_blancas_tipos_4x4[tipoRepresentacion];
    }
    console.log("\n    - diccionario_posicion_blanca = ", diccionario_posicion_blanca);
}

function resaltarDimension(dim){
    console.log("\n\nEntré en menu.js > resaltarDimension");
    console.log("    dim = ", dim);
    var dimen = "#dim"+dim;
    var top = $(dimen).css("top");
    var left = $(dimen).css("left");
    console.log("\n    top = ", top);
    console.log("\n    left = ", left);
    $("#area_inter").css("left", left);
    $("#area_inter").css("top", top);
    $("#area_inter").css("display", "block");

}

/*
 * Resalta las áreas interactivas seleccionadas por el usuario
 */
function resaltarAreasSprite(event){
    console.log("\n\nEntré en menu.js > resaltarAreasSprite");
    console.log("    event = ", event);
    $(".area-sprite").css({
        "background-color":"initial",
        "opacity": "initial",
        "filter": "initial"
    });
    var areaTocada = $(event.target);
    areaTocada.css({
        "background-color":"white",
        "opacity": "0.5",
        "filter": "alpha(opacity=50)"
    });
    
}


/*
 * Muestra la vista educativa de la representación seleccionada
 */
function mostrarImagenInfo(){
    console.log("\n\nEntré en menu.js > mostrarImagenInfo");
    console.log("\n    Desde menu.js > mostrarImagenInfo, voy a llamar a seleccionarImagen");
    seleccionarImagen("1"); // Accion por defecto
    seleccionarDimension(dimension_x.toString(10),dimension_y.toString(10)); 
    
    // Si no existe contenido educativo, entonces proceder con el juego
    if ($.isEmptyObject(diccionario_imagen_info)){
        console.log("\n    Desde menu.js > mostrarImagenInfo, voy a llamar a jugarYa");
        jugarYa();
        return;
    }
    
    // Se obtiene el path de la vista de información
    var url_imagen_info = diccionario_imagen_info[imagenSeleccionadaIndex];
    $("#vista-imagen-seleccionada-info").css({
        'background-repeat': 'no-repeat',
        "background-image": "url("+url_imagen_info+")",
        'background-size':"100% 100%"
    });
    
    console.log("\n    Desde menu.js > mostrarImagenInfo, voy a llamar a ocultarVistas");
    ocultarVistas();
    $("#vista-imagen-seleccionada-info").css("display","block");
    vistaActual = "vista-imagen-seleccionada-info";
}


/*
 * Obtiene el diccionario de imágenes y su respectivo diccionario de información.
 * Se usan diccionarios de esta manera porque es posible que se agreguen más imagenes
 * para un tipo dado de representación. Actualmente sólo hay uno por cada tipo.
 * Estos diccionarios sólo guardan los paths.
 */
function seleccionarTipoRepresentacion(numeroTipoRepresentacionSeleccionada){
    console.log("\n\nEntré en menu.js > numeroTipoRepresentacionSeleccionada");
    tipoRepresentacion = parseInt(numeroTipoRepresentacionSeleccionada,10);
    diccionario_imagenes = {1:diccionario_vistas[idioma]["tablero"][numeroTipoRepresentacionSeleccionada]};
    diccionario_imagen_info = {1:diccionario_vistas[idioma]["info"][numeroTipoRepresentacionSeleccionada]};

    console.log("\n    - tipoRepresentacion = ", tipoRepresentacion);
    console.log("    - diccionario_imagenes = ", diccionario_imagenes);
    console.log("    - diccionario_imagen_info = ", diccionario_imagen_info);
}


/*
 * Muestra la vista del mapa para un tipo dado de representación
 */
function verMapaDeTipoRepresentacion(){
    console.log("\n\nEntré en menu.js > verMapaDeTipoRepresentacion");
    var url_mapa = diccionario_vistas[idioma]["mapa"][tipoRepresentacion];

    $("#vista-mapa").append(
        `<img id='imagen_mapa' src='`+url_mapa+`' 
            width='100%' height='90%'
            style='position:absolute; bottom: 10%; left: 0;'>`
    );

    console.log("\n    Desde menu.js > verMapaDeTipoRepresentacion, voy a llamar a ocultarVistas");
    ocultarVistas();
    $("#vista-mapa").css("display","block");
    vistaActual = "vista-mapa";
}

/*
 * Borra de memoria el mapa del tipo de representación después de salir de
 * su vista
 */
function quitarMapa(){
    console.log("\n\nEntré en menu.js > quitarMapa");
    $("#imagen_mapa").remove();
}


/*
 * Muestra el menú principal
 */
function abrirMenuEmergente(){
    console.log("\n\nEntré en menu.js > abrirMenuEmergente");
    $("#vista-menu-emergente").css("width", "70%");
    
}

/*
 * Muestra el menú de configuración
 */
function abrirMenuConfiguracion(){
    console.log("\n\nEntré en menu.js > abrirMenuConfiguracion");
    $("#vista-menu-configuracion").css("width", "70%");
    
}

/*
 * Cierra el menú principal
 */
function cerrarMenuEmergente(){
    console.log("\n\nEntré en menu.js > cerrarMenuEmergente");
    $("#vista-menu-emergente").css("width", "0%");
}

/*
 * Cierra el menú de configuración
 */
function cerrarMenuConfiguracion(){
    console.log("\n\nEntré en menu.js > cerrarMenuConfiguracion");
    $("#vista-menu-configuracion").css("width", "0%");
}

function verPortada(){
    console.log("\n\nEntré en menu.js > verPortada");
    ocultarVistas();
    $("#vista-portada").css("display", "block");
    //vistaActual = "vista-portada";
}

function cerrarPortada(){
    console.log("\n\nEntré en menu.js > cerrarPortada");
    $("#vista-portada").css("display", "none");
}

function verPresentacion(){
    console.log("\n\nEntré en menu.js > verPresentacion");
    ocultarVistas();
    $("#vista-presentacion").css("display", "block");
    //vistaActual = "vista-presentacion";
}

function cerrarPresentacion(){
    console.log("\n\nEntré en menu.js > cerrarPresentacion");
    $("#vista-presentacion").css("display", "none");
}

function verInstrucciones(){
    console.log("\n\nEntré en menu.js > verInstrucciones");
    ocultarVistas();
    $("#vista-instrucciones").css("display", "block");
    //vistaActual = "vista-instrucciones";
}

function cerrarInstrucciones(){
    console.log("\n\nEntré en menu.js > cerrarInstrucciones");
    $("#vista-instrucciones").css("display", "none");
}

function verPantallaSalir(){
    console.log("\n\nEntré en menu.js > verPantallaSalir");
    cerrarMenuEmergente();
    ocultarVistas();
    $("#vista-salir").css("display", "block");
    vistaActual = "vista-salir";
    
}

function cerrarPantallaSalir(){
    console.log("\n\nEntré en menu.js > cerrarPantallaSalir");
    $("#vista-salir").css("display", "none");
}

// Cuando mostramos el texto informativo acerca de una manifestación en una vista individual, sin la imagen
function mostrarInfoZoom(){
    console.log("\n\nEntré en menu.js > mostrarInfoZoom");
    // Se obtiene el path de la vista de información
    var url_imagen_info_zoom = diccionario_vistas[idioma]["zoom"][tipoRepresentacion];
    $("#vista-imagen-seleccionada-info-zoom").css({
        'background-repeat': 'no-repeat',
        "background-image": "url("+url_imagen_info_zoom+")",
        'background-size':"100% 100%",
    });

    // Cuando estamos en una PC, la imagen a mostrar debe tener la misma orientación que el resto de las vistas.
    if (!esDispositivoMovil){
        $("#vista-imagen-seleccionada-info-zoom").css({
            'transform': 'rotate(90deg)',
        }); 
    }
    
    console.log("\n    Desde menu.js > mostrarInfoZoom, voy a llamar a ocultarVistas");
    ocultarVistas();
    $("#vista-imagen-seleccionada-info-zoom").css("display","block");
    vistaActual = "vista-imagen-seleccionada-info-zoom";
}


var imagenResize = false;
function verIndice(){
    console.log("\n\nEntré en menu.js > verIndice");
    //
    //$('#area_inter').css('display', 'none');
    //ocultarVistas();
    $("#vista-indice").css("display", "block");
    $("#vista-indice").animate({"width": "80%"},100);
    /*
    if (!imagenResize){
        $("map area").each(function(x){
            var imagen = document.querySelector('img[usemap="#fondo_indice'+'"]');
            var width  = imagen.width  / imagen.naturalWidth;
            var height = imagen.height / imagen.naturalHeight;
            var coordenadas = this.coords.split(",");
            coordenadas[0] = Math.floor(Number(coordenadas[0]) * width);
            coordenadas[1] = Math.floor(Number(coordenadas[0]) * height);
            coordenadas[2] = Math.floor(Number(coordenadas[2]) * width);
            coordenadas[3] = Math.floor(Number(coordenadas[3]) * height);
            this.coords = coordenadas.join(",");
        
        });
        imagenResize = true;
        
    }
    */
    //resaltarDimension(dimX);
}

function cerrarIndice(){
    console.log("\n\nEntré en menu.js > cerrarIndice");
    $("#vista-indice").animate({"width": "0%","display":"none"},100);
}

function verCreditos(){
    console.log("\n\nEntré en menu.js > verCreditos");
    ocultarVistas();
    $("#vista-creditos").css("display", "block");
}

function cerrarCreditos(){
    console.log("\n\nEntré en menu.js > cerrarCreditos");
    $("#vista-creditos").css("display", "none");
}

function cambiarIdioma(nuevoIdioma){
    idioma = nuevoIdioma;

    $("#vista-portada img")[0].src = diccionario_vistas[idioma]["fondos"]["portada"];
    $("#vista-indice img")[0].src = diccionario_vistas[idioma]["fondos"]["indice"];
    $("#vista-presentacion img")[0].src = diccionario_vistas[idioma]["fondos"]["presentacion"];
    $("#vista-instrucciones img")[0].src = diccionario_vistas[idioma]["fondos"]["instrucciones"];
    $("#vista-seleccionar-tipo-manifestacion").css("background-image","url("+diccionario_vistas[idioma]["fondos"]["seleccionar"]+")");
    $("#vista-salir").css("background-image","url("+diccionario_vistas[idioma]["fondos"]["salir"]+")");
    $("#vista-creditos").css("background-image","url("+diccionario_vistas[idioma]["fondos"]["creditos"]+")");
    $("#vista-juego").css("background-image","url("+diccionario_vistas[idioma]["fondos"]["tablero"]+")");

    if (idioma == "es"){
        $("#lupa").css("background-image","url('img/iconos/lupa.png')");
        $("#dedoIzquierda").css("background-image","url('img/iconos/Dedito-a-la-izquierda.png')");   
    }
    else {
        $("#lupa").css("background-image","none");
        $("#dedoIzquierda").css("background-image","none");     
    }
}