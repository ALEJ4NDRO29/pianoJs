import { piano } from './piano.class';
import $ from '../js/$';

class Controller {
    constructor() {

        // Eventos para las teclas en pantalla
        $('btn-0').addEventListener('click', () => { this.pressed(0) });
        $('btn-1').addEventListener('click', () => { this.pressed(1) });
        $('btn-2').addEventListener('click', () => { this.pressed(2) });
        $('btn-3').addEventListener('click', () => { this.pressed(3) });
        $('btn-4').addEventListener('click', () => { this.pressed(4) });
        $('btn-5').addEventListener('click', () => { this.pressed(5) });
        $('btn-6').addEventListener('click', () => { this.pressed(6) });
        $('btn-7').addEventListener('click', () => { this.pressed(7) });

        // Evento para la entrada de tecladp
        document.addEventListener('keydown', (e) => {
            let code = e.code;
            switch (code) {
                case "KeyA":
                    this.animate(0);
                    this.pressed(0);
                    break;
                case "KeyS":
                    this.animate(1);
                    this.pressed(1);
                    break;
                case "KeyD":
                    this.animate(2);
                    this.pressed(2);
                    break;
                case "KeyF":
                    this.animate(3);
                    this.pressed(3);
                    break;
                case "KeyJ":
                    this.animate(4);
                    this.pressed(4);
                    break;
                case "KeyK":
                    this.animate(5);
                    this.pressed(5);
                    break;
                case "KeyL":
                    this.animate(6);
                    this.pressed(6);
                    break;
                case "Semicolon":
                    this.animate(7);
                    this.pressed(7);
                    break;

                case "Space": // Iniciar grabación
                    this.startRecord();
                    break;
                case "ControlLeft": // Detener grabación
                case "ControlRight":
                    this.stopRecord();
                    break;
                case "KeyZ": // Reproducir grabación
                    piano.playRecord();
                    break;
            }
        });

        // Acciones al pulsar botones de start o stop record
        $('start-record').addEventListener('click', () => { this.startRecord() });
        $('stop-record').addEventListener('click', () => { this.stopRecord() });

        // Botones de reproducir y eliminar grabación
        $('play-record').addEventListener('click', () => { piano.playRecord() });
        $('remove-record').addEventListener('click', () => { piano.removeRecord() });

        // Bóton de guardar a fichero
        $('save-file').addEventListener('click', () => { piano.saveToFile() });

        // Evento al cargar un fichero
        $('file-input').addEventListener('change', (e) => { this.readFile(e) })

        // Comprobar si hay una grabación guardada
        var record = localStorage.getItem('record');
        if (record) {
            this.showActionButtons(true);
            piano.record = JSON.parse(record);
        }

        // Comprobar si habia una nota guardada
        var note = localStorage.getItem('note');
        if(note) {
            piano.note = parseInt(note);
            $('note').value = note;
        } else {
            note = 2;
            localStorage.setItem('note', note);
            piano.note = note;
            $('note').value = note;
        }

        $('note').addEventListener('change', () => {this.setNote()})
        $('note').addEventListener('focus', () => document.activeElement.blur());

    }

    // Acción al pulsar una tecla
    pressed(value) {
        piano.play(value);
    }

    // Animación de pulsación
    animate(index) {
        $(`btn-${index}`).classList.add('active');
        setTimeout(() => {
            $(`btn-${index}`).classList.remove('active');
        }, 500);
    }

    // Iniciar grabación
    startRecord() {
        $('start-record').setAttribute('hidden', true);
        $('stop-record').removeAttribute('hidden');
        piano.startRecord();
    }

    // Parar grabación
    stopRecord() {
        $('start-record').removeAttribute('hidden');
        $('stop-record').setAttribute('hidden', true);
        piano.stopRecord();
    }

    // Ocultar o mostrar botones en pantalla
    showActionButtons(b) {
        if(b) {
            $('play-record').removeAttribute('hidden');
            $('remove-record').removeAttribute('hidden');
            $('save-file').removeAttribute('hidden');
        } else {
            $('play-record').setAttribute('hidden', true);
            $('remove-record').setAttribute('hidden', true);
            $('save-file').setAttribute('hidden', true);
        }
    }

    /**
     * Función para generar un fichero a partir del texto
     * @param {String} content Texto que tendrá el contenido descargado
     * @param {String} fileName Nombre del fichero
     * @param {String} contentType Tipo de fichero
     */
    download(content, fileName, contentType) {
        var a = document.createElement("a");
        var file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    // Evento al cargar un fichero
    readFile(e) {
        var files = e.target.files;

        var reader = new FileReader();
        reader.onload = (function (reader) {
            return function () {
                var contents = reader.result;
                // Cargar contenido del fichero 
                piano.loadFromString(contents);
                $('input-form').reset();
            }
        })(reader);

        reader.readAsText(files[0]);
    }

    setNote() {
        var note = parseInt($('note').value);
        localStorage.setItem('note', note);
        piano.note = note;
    }
}

export let controller = new Controller();