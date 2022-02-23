# Puzles Deslizantes Educativos: Manifestaciones Rupestres Venezolanas

Proyecto iniciado con el fin de completar mi Servicio Comunitario en la 
Universidad Simón Bolívar

#### Desarrollador: Georvic Tur 12-11402
#### Tutora Comunitaria y Diseñadora: Ruby de Valencia
#### Tutora Académica: Angela Di Serio

#### Instituciones: Universidad Simón Bolívar y el Archivo Nacional de Arte Rupestre.
#### Estado: En Desarrollo
#### Requerimientos de Uso

Se probó la aplicación en un smartphone con Android 2.3.6. Dicho aparato contaba con una memoria RAM de 555MB de los cuales sólo 270MB estaban disponibles.
Su procesador es Dual-core de 1.0 GHz.

#### Requerimientos de Desarrollo

Se debe usar [Cordova](https://cordova.apache.org/) o [Phonegap](http://phonegap.com/) para construir la aplicación.

### Instrucciones Para construir la Aplicación

Se debe clonar el repositorio y construir la aplicación con las siguientes
órdenes:

1- git clone https://github.com/J0hnG4lt/puzzle.git

2- cd puzzle

3- cordova platform add android

4- cordova build android

5- cd platforms/android/build/outputs/apk

Los paquetes generados se encuentran en ese directorio.

#Instrucciones para instalar la aplicación

Se puede conectar el teléfono a la computadora y copiar el paquete a cualquier
directorio del mismo. Luego en el teléfono se puede ir a dicho directorio
e instalar la aplicación.

También se pueden usar las siguientes órdenes en la carpeta donde esté el paquete:

 Para confirmar que el teléfono esté bien conectado:
 adb devices
 
 Para instalar:
 adb install <nombre-del-paquete>
 
 En este caso es importante tener instaladas las herramientas de terminal de
 Android Studio.

 

#### El Archivo Nacional de Arte Rupestre se reserva todos los derechos sobre
#### las imágenes de manifestaciones de arte rupestre usadas en esta aplicación, 
#### pues son el producto de un extenso trabajo de campo realizado a lo largo del
#### territorio de Venezuela. El Archivo Nacional de Arte Rupestre no permite el
#### uso con fines de lucro de dicho material.

