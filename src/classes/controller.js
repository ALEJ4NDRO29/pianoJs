import { piano } from './piano.class';
import $ from '../js/$';

class Controller {
    constructor() {

        this.piano = piano;
        this.fileReader = new FileReader();

        // Set listener for each key
        $('btn-0').addEventListener('click', () => { this.pressed(0) });
        $('btn-1').addEventListener('click', () => { this.pressed(1) });
        $('btn-2').addEventListener('click', () => { this.pressed(2) });
        $('btn-3').addEventListener('click', () => { this.pressed(3) });
        $('btn-4').addEventListener('click', () => { this.pressed(4) });
        $('btn-5').addEventListener('click', () => { this.pressed(5) });
        $('btn-6').addEventListener('click', () => { this.pressed(6) });
        $('btn-7').addEventListener('click', () => { this.pressed(7) });

        // Set listener for keyboard keys
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

                case "Space":
                    this.startRecord();
                    break;
                case "ControlLeft":
                case "ControlRight":
                    this.stopRecord();
                    break;
                case "KeyZ":
                    piano.playRecord();
                    break;
            }
        });

        // Set listener for start / stop record
        $('start-record').addEventListener('click', () => { this.startRecord() });
        $('stop-record').addEventListener('click', () => { this.stopRecord() });

        // Listener for play and remove record
        $('play-record').addEventListener('click', () => { piano.playRecord() });
        $('remove-record').addEventListener('click', () => { piano.removeRecord() });

        // Listener for save file button
        $('save-file').addEventListener('click', () => { piano.saveToFile() });

        // Listener for input file
        $('file-input').addEventListener('change', (e) => { this.readFile(e) })

        // Comprobar si se hay una grabación guardada
        var record = localStorage.getItem('record');
        if (record) {
            $('play-record').removeAttribute('hidden');
            $('remove-record').removeAttribute('hidden');
            piano.record = JSON.parse(record);
        }

    }

    // Acción al pulsar una tecla
    pressed(value) {
        this.piano.play(value);
    }

    // Animación de pulsación
    animate(index) {
        $(`btn-${index}`).classList.add('active');
        setTimeout(() => {
            $(`btn-${index}`).classList.remove('active');
        }, 500);
    }

    startRecord() {
        $('start-record').setAttribute('hidden', true);
        $('stop-record').removeAttribute('hidden');
        piano.startRecord();
    }

    stopRecord() {
        $('start-record').removeAttribute('hidden');
        $('stop-record').setAttribute('hidden', true);
        piano.stopRecord();
    }

    download(content, fileName, contentType) {
        var a = document.createElement("a");
        var file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    readFile(e) {
        var files = e.target.files;

        var reader = new FileReader();
        reader.onload = (function (reader) {
            return function () {
                var contents = reader.result;
                piano.loadFromFile(contents);
                $('input-form').reset();
            }
        })(reader);

        reader.readAsText(files[0]);
    }
}

export let controller = new Controller();