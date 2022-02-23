/*
 *    Universidad Simón Bolívar
 *    Tutora Académica: Angela Di Serio
 *    Representante de la Comunidad y diseñadora: Ruby de Valencia
 *    Programador: Georvic Tur (12-11402)
 *    
 *    Proyecto de Servicio Comunitario
 *        Puzzles Deslizantes Educativos: Manifestaciones Rupestres Venezolanas
*/

/*  
 *
 *  Estas variables guardan los paths de las representaciones. También guarda
 *  las variaciones para la posición de la blanca dado un tipo  de representación
 *  y sus dimensiones.
 *
*/

var diccionario_imagenes_petroglifos = {
                        1 : "img/representaciones/petroglifos/petroglifo.png",
                        2 : "img/representaciones/petroglifos/amazonas.jpg",
                        3 : "img/representaciones/petroglifos/cueva.jpg",
                        4 : "img/representaciones/petroglifos/falcon.jpg"
                        };

var diccionario_imagenes_amolador = {
                        1 : "img/representaciones/amolador/AMOLADORES-Sto-Rosario-de-Agua-Linda.jpg"
                        }

var diccionario_imagenes_batea = {
                        1 : "img/representaciones/batea/BATEA-Laja-de-Tigre-Rio-Ocamo-edo-Amazonas.jpg"
                        }

var diccionario_imagenes_cerro_mitico = {
                        1 : "img/representaciones/cerro_mitico/CERRO-MITICO-NATURAL-Cerro-AUTANA.jpg"
                        }

var diccionario_imagenes_cupula = {
                        1 : "img/representaciones/cupula/CUPULAS-Mariara-edo-Carabobo.jpg"
                        }

var diccionario_imagenes_dolmen = {
                        1 : "img/representaciones/dolmen/DOLMEN-PINTAO-Edo-Amazonas.jpg"
                        }

var diccionario_imagenes_esfera_litica = {
                        1 : "img/representaciones/esfera_litica/Esfera-litica-edo-Anzoategui.jpg"
                        }

var diccionario_imagenes_geoglifos = {
                        1 : "img/representaciones/geoglifos/GEOGLIFO-edo-Carabobo.jpg"
                        }

var diccionario_imagenes_menhires = {
                        1 : "img/representaciones/menhires/MM-MENHIRES.jpg"
                        }

var diccionario_imagenes_micropetroglifo = {
                        1 : "img/representaciones/micropetroglifo/MICROPETROGLIFOS-Sn-Pablo-edo-Carabobo.jpg"
                        }

var diccionario_imagenes_monolitos = {
                        1 : "img/representaciones/monolitos/MM-MONOLITOS-Rio-Vigirima-edo-Carabobo.jpg"
                        }

var diccionario_imagenes_piedras_miticas = {
                        1 : "img/representaciones/piedras_miticas/PIEDRA-MITICA-NATURAL-Olla-de-Napiruli-edo-Amazonas.jpg"
                        }

var diccionario_imagenes_pinturas_rupestres = {
                        1 : "img/representaciones/pinturas_rupestres/PR-Cueva-del-Carmen-edo-Bolivar.jpg"
                        }

var diccionario_imagenes_puntos_acoplados = {
                        1 : "img/representaciones/puntos_acoplados/PUNTOS-ACOPLADOS.jpg"
                        }


var diccionario_tamanos = {1 : {x:"348px",y:"303px"},
                           2 : {x:"167px",y:"167px"},
                           3 : {x:"558px",y:"552px"},
                           4 : {x:"167px",y:"167px"}
                           };



var diccionario_imagen_info_petroglifos = {
                        1 : "img/vistas/info_representaciones/5-Petroglifo-Rancho-505-estado-Zulia-entero.jpg",
                        2 : "img/vistas/info_representaciones/5-Petroglifo-Rancho-505-estado-Zulia-entero_e.jpg"
                        };

var diccionario_imagen_info_pintura_rupestre = {
                        1 : "img/vistas/info_representaciones/4-PR-Cueva-del-Carmen-Bolivar-Entera.jpg",
                        2 : "img/vistas/info_representaciones/4-PR-Cueva-del-Carmen-Bolivar-Entera_e.jpg"
                        };

var diccionario_imagen_info_amolador = {
    1 : "img/vistas/info_representaciones/1-AMOLADORES---Salto-Paru--Amazonas.jpg",
    2 : "img/vistas/info_representaciones/1-AMOLADORES---Salto-Paru--Amazonas_e.jpg"
};

var diccionario_imagen_info_batea = {
    1 : "img/vistas/info_representaciones/1-BATEA-Laja_de_Tigre-rio_Ocamo-Amazonas.jpg",
    2 : "img/vistas/info_representaciones/1-BATEA-Laja_de_Tigre-rio_Ocamo-Amazonas_e.jpg"
};

var diccionario_imagen_info_cupula = {
    1 : "img/vistas/info_representaciones/1-CUPULAS-Mariara-edo-Carabobo.jpg",
    2 : "img/vistas/info_representaciones/1-CUPULAS-Mariara-edo-Carabobo_e.jpg"
};

var diccionario_imagen_info_puntos_acoplados = {
    1 : "img/vistas/info_representaciones/1-PUNTOS_ACOPLADOS-Atures-Amazonas.jpg",
    2 : "img/vistas/info_representaciones/1-PUNTOS_ACOPLADOS-Atures-Amazonas_e.jpg"
};

var diccionario_imagen_info_cerro_mitico = {
    1 : "img/vistas/info_representaciones/2-CERROS-MITICOS-NATURALES-Cerro-Autana-edo-Amazonas.jpg",
    2 : "img/vistas/info_representaciones/2-CERROS-MITICOS-NATURALES-Cerro-Autana-edo-Amazonas_e.jpg"
};

var diccionario_imagen_info_piedras_miticas = {
    1 : "img/vistas/info_representaciones/2-PIEDRA-MITICA-NATURAL-Olla-de-Napiruli-edo-Amazonas.jpg",
    2 : "img/vistas/info_representaciones/2-PIEDRA-MITICA-NATURAL-Olla-de-Napiruli-edo-Amazonas_e.jpg"
};

var diccionario_imagen_info_dolmen = {
    1 : "img/vistas/info_representaciones/3-MM-DOLMEN.jpg",
    2 : "img/vistas/info_representaciones/3-MM-DOLMEN_e.jpg"
};


var diccionario_imagen_info_menhires = {
    1 : "img/vistas/info_representaciones/3-MM-MENHIRES.jpg",
    2 : "img/vistas/info_representaciones/3-MM-MENHIRES_e.jpg"
};


var diccionario_imagen_info_monolitos = {
    1 : "img/vistas/info_representaciones/3-MM-MONOLITOS.jpg",
    2 : "img/vistas/info_representaciones/3-MM-MONOLITOS_e.jpg"
};

var diccionario_imagen_info_esfera_litica = {
    1 : "img/vistas/info_representaciones/6-ESFERAS-LITICAS.jpg",
    2 : "img/vistas/info_representaciones/6-ESFERAS-LITICAS_e.jpg"
};


var diccionario_imagen_info_geoglifos = {
    1 : "img/vistas/info_representaciones/7-GEOGLIFO-Chirgua-estado-Carabobo.jpg",
    2 : "img/vistas/info_representaciones/7-GEOGLIFO-Chirgua-estado-Carabobo_e.jpg"
};

var diccionario_imagen_info_micropetroglifo = {
    1 : "img/vistas/info_representaciones/8-MICROPETRGLIFOS-San-Pablo-Carabobo.jpg",
    2 : "img/vistas/info_representaciones/8-MICROPETRGLIFOS-San-Pablo-Carabobo_e.jpg"
};

var menu_configuracion = {
    1 : "img/vistas/menu_configuracion.png",
    2 : "img/vistas/menu_configuracion_e.png"
}

var vista_instrucciones = {
    1 : "img/vistas/Instrucciones.jpg",
    2 : "img/vistas/Instrucciones_e.jpg"
}

var vista_portada = {
    1 : "img/vistas/pantalla_portada.jpg",
    2 : "img/vistas/pantalla_portada_e.jpg"
}

var vista_presentacion = {
    1 : "img/vistas/Presentacion.jpg",
    2 : "img/vistas/Presentacion_e.jpg"
}

var diccionario_tipo_representacion_mapa = {
                        1 : "img/mapas/5-Mapa-ampliado-con-estados-PETROGLIFOS.png",
                        2 : "img/mapas/4-Mapa-ampliado-con-estados-PR.png",
                        3 : "img/mapas/3-Mapa ampliado-mONUMENTOS-MEGALITICOS-DOLMEN-MENHIRES-MONOLITOS-Pintao-edo-Amazonas.png",
                        4 : "img/mapas/3-Mapa ampliado-mONUMENTOS-MEGALITICOS-DOLMEN-MENHIRES-MONOLITOS-Pintao-edo-Amazonas.png",
                        5 : "img/mapas/3-Mapa ampliado-mONUMENTOS-MEGALITICOS-DOLMEN-MENHIRES-MONOLITOS-Pintao-edo-Amazonas.png",
                        6 : "img/mapas/1-Mapa-ampliado-con-estados-AMOLADORES-CUPULAS-PTOS-ACOPLADOS-BATEAS.png",
                        7 : "img/mapas/1-Mapa-ampliado-con-estados-AMOLADORES-CUPULAS-PTOS-ACOPLADOS-BATEAS.png",
                        8 : "img/mapas/1-Mapa-ampliado-con-estados-AMOLADORES-CUPULAS-PTOS-ACOPLADOS-BATEAS.png",
                        9 : "img/mapas/1-Mapa-ampliado-con-estados-AMOLADORES-CUPULAS-PTOS-ACOPLADOS-BATEAS.png",
                        10 : "img/mapas/2-Mapa-ampliado-con-estados-PIEDRAS-y-CERROS-MITICOS-NATURALES.png",
                        11 : "img/mapas/2-Mapa-ampliado-con-estados-PIEDRAS-y-CERROS-MITICOS-NATURALES.png",
                        12 : "img/mapas/6-Mapa-ampliado-ESFERAS-LITICAS.png",
                        13 : "img/mapas/7-Mapa-ampliado-con-estado-GEOGLIFO.png",
                        14 : "img/mapas/8-Mapa-ampliado-con-estados-MICROPETROGLIFOS.png"
                        };

var diccionario_info_zoom = {
    1 : "img/vistas/info_representaciones/5-Petroglifo-Rancho-505-estado-Zulia-entero_zoom.jpg",
    2 : "img/vistas/info_representaciones/4-PR-Cueva-del-Carmen-Bolivar-Entera_zoom.jpg",
    3 : "img/vistas/info_representaciones/3-MM-DOLMEN_zoom.jpg",
    4 : "img/vistas/info_representaciones/3-MM-MENHIRES_zoom.jpg",
    5 : "img/vistas/info_representaciones/3-MM-MONOLITOS_zoom.jpg",
    6 : "img/vistas/info_representaciones/1-AMOLADORES---Salto-Paru--Amazonas_zoom.jpg",
    7 : "img/vistas/info_representaciones/1-CUPULAS-Mariara-edo-Carabobo_zoom.jpg",
    8 : "img/vistas/info_representaciones/1-BATEA-Laja_de_Tigre-rio_Ocamo-Amazonas_zoom.jpg",
    9 : "img/vistas/info_representaciones/1-PUNTOS_ACOPLADOS-Atures-Amazonas_zoom.jpg",
    10 : "img/vistas/info_representaciones/2-PIEDRA-MITICA-NATURAL-Olla-de-Napiruli-edo-Amazonas_zoom.jpg",
    11 : "img/vistas/info_representaciones/2-CERROS-MITICOS-NATURALES-Cerro-Autana-edo-Amazonas_zoom.jpg",
    12 : "img/vistas/info_representaciones/6-ESFERAS-LITICAS_zoom.jpg",
    13 : "img/vistas/info_representaciones/7-GEOGLIFO-Chirgua-estado-Carabobo_zoom.jpg",
    14 : "img/vistas/info_representaciones/8-MICROPETRGLIFOS-San-Pablo-Carabobo_zoom.jpg"
}


var diccionario_vistas = {
    "es":{
        "fondos":{
            "portada" : "img/vistas/pantalla_portada.png",
            "indice"  : "img/vistas/indice.png",
            "presentacion" : "img/vistas/Presentacion.png",
            "instrucciones" : "img/vistas/Instrucciones.png",
            "seleccionar" : "img/vistas/pantalla_tipo_manifestacion.png",
            "salir" : "img/vistas/pantalla_salir.jpg",
            "creditos" : "img/vistas/CREDITOS.png",
            "tablero" : "img/vistas/tablero_juego.jpg"
        },
        "info" : {
            1: "img/vistas/info_representaciones/5-Petroglifo-Rancho-505-estado-Zulia-entero.jpg",
            2: "img/vistas/info_representaciones/4-PR-Cueva-del-Carmen-Bolivar-Entera.jpg",
            3: "img/vistas/info_representaciones/3-MM-DOLMEN.png",
            4: "img/vistas/info_representaciones/3-MM-MENHIRES.jpg",
            5: "img/vistas/info_representaciones/3-MM-MONOLITOS.jpg",
            6: "img/vistas/info_representaciones/1-AMOLADORES---Salto-Paru--Amazonas.jpg",
            7: "img/vistas/info_representaciones/1-CUPULAS-Mariara-edo-Carabobo.jpg",
            8: "img/vistas/info_representaciones/1-BATEA-Laja_de_Tigre-rio_Ocamo-Amazonas.jpg",
            9: "img/vistas/info_representaciones/1-PUNTOS_ACOPLADOS-Atures-Amazonas.jpg",
            10: "img/vistas/info_representaciones/2-PIEDRA-MITICA-NATURAL-Olla-de-Napiruli-edo-Amazonas.jpg",
            11: "img/vistas/info_representaciones/2-CERROS-MITICOS-NATURALES-Cerro-Autana-edo-Amazonas.jpg",
            12: "img/vistas/info_representaciones/6-ESFERAS-LITICAS.jpg",
            13: "img/vistas/info_representaciones/7-GEOGLIFO-Chirgua-estado-Carabobo.jpg",
            14: "img/vistas/info_representaciones/8-MICROPETRGLIFOS-San-Pablo-Carabobo.jpg"
        },
        "mapa" : {
            1 : "img/mapas/5-Mapa-ampliado-con-estados-PETROGLIFOS.png",
            2 : "img/mapas/4-Mapa-ampliado-con-estados-PR.png",
            3 : "img/mapas/3-Mapa ampliado-mONUMENTOS-MEGALITICOS-DOLMEN-MENHIRES-MONOLITOS-Pintao-edo-Amazonas.png",
            4 : "img/mapas/3-Mapa ampliado-mONUMENTOS-MEGALITICOS-DOLMEN-MENHIRES-MONOLITOS-Pintao-edo-Amazonas.png",
            5 : "img/mapas/3-Mapa ampliado-mONUMENTOS-MEGALITICOS-DOLMEN-MENHIRES-MONOLITOS-Pintao-edo-Amazonas.png",
            6 : "img/mapas/1-Mapa-ampliado-con-estados-AMOLADORES-CUPULAS-PTOS-ACOPLADOS-BATEAS.png",
            7 : "img/mapas/1-Mapa-ampliado-con-estados-AMOLADORES-CUPULAS-PTOS-ACOPLADOS-BATEAS.png",
            8 : "img/mapas/1-Mapa-ampliado-con-estados-AMOLADORES-CUPULAS-PTOS-ACOPLADOS-BATEAS.png",
            9 : "img/mapas/1-Mapa-ampliado-con-estados-AMOLADORES-CUPULAS-PTOS-ACOPLADOS-BATEAS.png",
            10 : "img/mapas/2-Mapa-ampliado-con-estados-PIEDRAS-y-CERROS-MITICOS-NATURALES.png",
            11 : "img/mapas/2-Mapa-ampliado-con-estados-PIEDRAS-y-CERROS-MITICOS-NATURALES.png",
            12 : "img/mapas/6-Mapa-ampliado-ESFERAS-LITICAS.png",
            13 : "img/mapas/7-Mapa-ampliado-con-estado-GEOGLIFO.png",
            14 : "img/mapas/8-Mapa-ampliado-con-estados-MICROPETROGLIFOS.png"
        },
        "tablero" : {
            1: "img/representaciones/petroglifos/petroglifo.png",
            2: "img/representaciones/pinturas_rupestres/PR-Cueva-del-Carmen-edo-Bolivar.jpg",
            3: "img/representaciones/dolmen/DOLMEN-PINTAO-Edo-Amazonas.jpg",
            4: "img/representaciones/menhires/MM-MENHIRES.jpg",
            5: "img/representaciones/monolitos/MM-MONOLITOS-Rio-Vigirima-edo-Carabobo.jpg",
            6: "img/representaciones/amolador/AMOLADORES-Sto-Rosario-de-Agua-Linda.jpg",
            7: "img/representaciones/cupula/CUPULAS-Mariara-edo-Carabobo.jpg",
            8: "img/representaciones/batea/BATEA-Laja-de-Tigre-Rio-Ocamo-edo-Amazonas.jpg",
            9: "img/representaciones/puntos_acoplados/PUNTOS-ACOPLADOS.jpg",
            10: "img/representaciones/piedras_miticas/PIEDRA-MITICA-NATURAL-Olla-de-Napiruli-edo-Amazonas.jpg",
            11: "img/representaciones/cerro_mitico/CERRO-MITICO-NATURAL-Cerro-AUTANA.jpg",
            12: "img/representaciones/esfera_litica/Esfera-litica-edo-Anzoategui.jpg",
            13: "img/representaciones/geoglifos/GEOGLIFO-edo-Carabobo.jpg",
            14: "img/representaciones/micropetroglifo/MICROPETROGLIFOS-Sn-Pablo-edo-Carabobo.jpg"

        },
        "zoom" : {
            1 : "img/vistas/info_representaciones/5-Petroglifo-Rancho-505-estado-Zulia-entero_zoom.jpg",
            2 : "img/vistas/info_representaciones/4-PR-Cueva-del-Carmen-Bolivar-Entera_zoom.jpg",
            3 : "img/vistas/info_representaciones/3-MM-DOLMEN_zoom.jpg",
            4 : "img/vistas/info_representaciones/3-MM-MENHIRES_zoom.jpg",
            5 : "img/vistas/info_representaciones/3-MM-MONOLITOS_zoom.jpg",
            6 : "img/vistas/info_representaciones/1-AMOLADORES---Salto-Paru--Amazonas_zoom.jpg",
            7 : "img/vistas/info_representaciones/1-CUPULAS-Mariara-edo-Carabobo_zoom.jpg",
            8 : "img/vistas/info_representaciones/1-BATEA-Laja_de_Tigre-rio_Ocamo-Amazonas_zoom.jpg",
            9 : "img/vistas/info_representaciones/1-PUNTOS_ACOPLADOS-Atures-Amazonas_zoom.jpg",
            10 : "img/vistas/info_representaciones/2-PIEDRA-MITICA-NATURAL-Olla-de-Napiruli-edo-Amazonas_zoom.jpg",
            11 : "img/vistas/info_representaciones/2-CERROS-MITICOS-NATURALES-Cerro-Autana-edo-Amazonas_zoom.jpg",
            12 : "img/vistas/info_representaciones/6-ESFERAS-LITICAS_zoom.jpg",
            13 : "img/vistas/info_representaciones/7-GEOGLIFO-Chirgua-estado-Carabobo_zoom.jpg",
            14 : "img/vistas/info_representaciones/8-MICROPETRGLIFOS-San-Pablo-Carabobo_zoom.jpg"
        }

    },
    "en":{
        "fondos" :{
            "portada" : "img/vistas/pantalla_portada_e.png",
            "indice"  : "img/vistas/indice_e.png",
            "presentacion" : "img/vistas/Presentacion_e.png",
            "instrucciones" : "img/vistas/Instrucciones_e.png",
            "seleccionar" : "img/vistas/pantalla_tipo_manifestacion_e.png",
            "salir" : "img/vistas/pantalla_salir_e.jpg",
            "creditos" : "img/vistas/CREDITOS_e.png",
            "tablero" : "img/vistas/tablero_juego_e.jpg"
        },
        "info" : {
            1: "img/vistas/info_representaciones/5-Petroglifo-Rancho-505-estado-Zulia-entero_e.jpg",
            2: "img/vistas/info_representaciones/4-PR-Cueva-del-Carmen-Bolivar-Entera_e.jpg",
            3: "img/vistas/info_representaciones/3-MM-DOLMEN_e.jpg",
            4: "img/vistas/info_representaciones/3-MM-MENHIRES_e.jpg",
            5: "img/vistas/info_representaciones/3-MM-MONOLITOS_e.jpg",
            6: "img/vistas/info_representaciones/1-AMOLADORES---Salto-Paru--Amazonas_e.jpg",
            7: "img/vistas/info_representaciones/1-CUPULAS-Mariara-edo-Carabobo_e.jpg",
            8: "img/vistas/info_representaciones/1-BATEA-Laja_de_Tigre-rio_Ocamo-Amazonas_e.jpg",
            9: "img/vistas/info_representaciones/1-PUNTOS_ACOPLADOS-Atures-Amazonas_e.jpg",
            10: "img/vistas/info_representaciones/2-PIEDRA-MITICA-NATURAL-Olla-de-Napiruli-edo-Amazonas_e.jpg",
            11: "img/vistas/info_representaciones/2-CERROS-MITICOS-NATURALES-Cerro-Autana-edo-Amazonas_e.jpg",
            12: "img/vistas/info_representaciones/6-ESFERAS-LITICAS_e.jpg",
            13: "img/vistas/info_representaciones/7-GEOGLIFO-Chirgua-estado-Carabobo_e.jpg",
            14: "img/vistas/info_representaciones/8-MICROPETRGLIFOS-San-Pablo-Carabobo_e.jpg"
        },
        "mapa" : {
            1 : "img/mapas/5-Mapa-ampliado-con-estados-PETROGLIFOS_e.png",
            2 : "img/mapas/4-Mapa-ampliado-con-estados-PR_e.png",
            3 : "img/mapas/3-Mapa ampliado-mONUMENTOS-MEGALITICOS-DOLMEN-MENHIRES-MONOLITOS-Pintao-edo-Amazonas_e.png",
            4 : "img/mapas/3-Mapa ampliado-mONUMENTOS-MEGALITICOS-DOLMEN-MENHIRES-MONOLITOS-Pintao-edo-Amazonas_e.png",
            5 : "img/mapas/3-Mapa ampliado-mONUMENTOS-MEGALITICOS-DOLMEN-MENHIRES-MONOLITOS-Pintao-edo-Amazonas_e.png",
            6 : "img/mapas/1-Mapa-ampliado-con-estados-AMOLADORES-CUPULAS-PTOS-ACOPLADOS-BATEAS_e.png",
            7 : "img/mapas/1-Mapa-ampliado-con-estados-AMOLADORES-CUPULAS-PTOS-ACOPLADOS-BATEAS_e.png",
            8 : "img/mapas/1-Mapa-ampliado-con-estados-AMOLADORES-CUPULAS-PTOS-ACOPLADOS-BATEAS_e.png",
            9 : "img/mapas/1-Mapa-ampliado-con-estados-AMOLADORES-CUPULAS-PTOS-ACOPLADOS-BATEAS_e.png",
            10 : "img/mapas/2-Mapa-ampliado-con-estados-PIEDRAS-y-CERROS-MITICOS-NATURALES_e.png",
            11 : "img/mapas/2-Mapa-ampliado-con-estados-PIEDRAS-y-CERROS-MITICOS-NATURALES_e.png",
            12 : "img/mapas/6-Mapa-ampliado-ESFERAS-LITICAS_e.png",
            13 : "img/mapas/7-Mapa-ampliado-con-estado-GEOGLIFO_e.png",
            14 : "img/mapas/8-Mapa-ampliado-con-estados-MICROPETROGLIFOS_e.png"
        },
        "tablero" : {
            1: "img/representaciones/petroglifos/petroglifo.png",
            2: "img/representaciones/pinturas_rupestres/PR-Cueva-del-Carmen-edo-Bolivar.jpg",
            3: "img/representaciones/dolmen/DOLMEN-PINTAO-Edo-Amazonas.jpg",
            4: "img/representaciones/menhires/MM-MENHIRES.jpg",
            5: "img/representaciones/monolitos/MM-MONOLITOS-Rio-Vigirima-edo-Carabobo.jpg",
            6: "img/representaciones/amolador/AMOLADORES-Sto-Rosario-de-Agua-Linda.jpg",
            7: "img/representaciones/cupula/CUPULAS-Mariara-edo-Carabobo.jpg",
            8: "img/representaciones/batea/BATEA-Laja-de-Tigre-Rio-Ocamo-edo-Amazonas.jpg",
            9: "img/representaciones/puntos_acoplados/PUNTOS-ACOPLADOS.jpg",
            10: "img/representaciones/piedras_miticas/PIEDRA-MITICA-NATURAL-Olla-de-Napiruli-edo-Amazonas.jpg",
            11: "img/representaciones/cerro_mitico/CERRO-MITICO-NATURAL-Cerro-AUTANA.jpg",
            12: "img/representaciones/esfera_litica/Esfera-litica-edo-Anzoategui.jpg",
            13: "img/representaciones/geoglifos/GEOGLIFO-edo-Carabobo.jpg",
            14: "img/representaciones/micropetroglifo/MICROPETROGLIFOS-Sn-Pablo-edo-Carabobo.jpg"
        },
        "zoom" : {
            1 : "img/vistas/info_representaciones/5-Petroglifo-Rancho-505-estado-Zulia-entero_zoom_e.jpg",
            2 : "img/vistas/info_representaciones/4-PR-Cueva-del-Carmen-Bolivar-Entera_zoom_e.jpg",
            3 : "img/vistas/info_representaciones/3-MM-DOLMEN_zoom_e.jpg",
            4 : "img/vistas/info_representaciones/3-MM-MENHIRES_zoom_e.jpg",
            5 : "img/vistas/info_representaciones/3-MM-MONOLITOS_zoom_e.jpg",
            6 : "img/vistas/info_representaciones/1-AMOLADORES---Salto-Paru--Amazonas_zoom_e.jpg",
            7 : "img/vistas/info_representaciones/1-CUPULAS-Mariara-edo-Carabobo_zoom_e.jpg",
            8 : "img/vistas/info_representaciones/1-BATEA-Laja_de_Tigre-rio_Ocamo-Amazonas_zoom_e.jpg",
            9 : "img/vistas/info_representaciones/1-PUNTOS_ACOPLADOS-Atures-Amazonas_zoom_e.jpg",
            10 : "img/vistas/info_representaciones/2-PIEDRA-MITICA-NATURAL-Olla-de-Napiruli-edo-Amazonas_zoom_e.jpg",
            11 : "img/vistas/info_representaciones/2-CERROS-MITICOS-NATURALES-Cerro-Autana-edo-Amazonas_zoom_e.jpg",
            12 : "img/vistas/info_representaciones/6-ESFERAS-LITICAS_zoom_e.jpg",
            13 : "img/vistas/info_representaciones/7-GEOGLIFO-Chirgua-estado-Carabobo_zoom_e.jpg",
            14 : "img/vistas/info_representaciones/8-MICROPETRGLIFOS-San-Pablo-Carabobo_zoom_e.jpg"
        }

    }
}


/*
Posiciones sugeridas para la blanca
0 1 2
3   5
6 7 8

diccionario_posicion_blanca para el nivel 3x3
    Su índice hace referencia a la identidad de la imagen
    en diccionario_imagenes
    Su valor hace referencia a la posición sugerida.
*/


var diccionario_blancas_tipos_3x3 = {
    1 : {1:7,2:2,3:8,4:6},
    2 : {1:2},
    3 : {1:6},
    4 : {1:8},
    5 : {1:0},
    6 : {1:0},
    7 : {1:6},
    8 : {1:0},
    9 : {1:8},
    10 : {1:0},
    11 : {1:8},
    12 : {1:0},
    13 : {1:2},
    14 : {1:0}
};

/*
0  1  2  3
4        7
8        11
12 13 14 15
*/
var diccionario_blancas_tipos_4x4 = {
    1 : {1:13,2:3,3:15,4:12},
    2 : {1:3},
    3 : {1:12},
    4 : {1:15},
    5 : {1:0},
    6 : {1:0},
    7 : {1:12},
    8 : {1:0},
    9 : {1:15},
    10 : {1:0},
    11 : {1:15},
    12 : {1:0},
    13 : {1:3},
    14 : {1:0}
};

/*
0  1  2  3  4  5
6              11
12             17
18             23
24             29
30 31 32 33 34 35
*/
var diccionario_blancas_tipos_6x6 = {
    1 : {1:32,2:5,3:35,4:30},
    2 : {1:5},
    3 : {1:30},
    4 : {1:35},
    5 : {1:0},
    6 : {1:0},
    7 : {1:30},
    8 : {1:0},
    9 : {1:35},
    10 : {1:0},
    11 : {1:35},
    12 : {1:0},
    13 : {1:5},
    14 : {1:0}
};



