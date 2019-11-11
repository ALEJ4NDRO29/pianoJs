import { Synth } from 'tone';
import { controller } from './controller';

class Piano {
    constructor() {
        this.synth = new Synth().toMaster();
        this.recording = false;
        this.startTime = null;
        this.record = new Array();
    }

    // Reproducir una nota
    play(value) {
        if (this.recording) { // Guardar si está grabando
            let time = new Date() - this.startTime; // Calcular tiempo desde que inició la grabación 
            this.record.push({ value, time });
        }

        switch (value) {
            case 0:
                this.synth.triggerAttackRelease("C3", "8n");
                break;
            case 1:
                this.synth.triggerAttackRelease("D3", "8n");
                break;
            case 2:
                this.synth.triggerAttackRelease("E3", "8n");
                break;
            case 3:
                this.synth.triggerAttackRelease("F3", "8n");
                break;
            case 4:
                this.synth.triggerAttackRelease("G3", "8n");
                break;
            case 5:
                this.synth.triggerAttackRelease("A3", "8n");
                break;
            case 6:
                this.synth.triggerAttackRelease("B3", "8n");
                break;
            case 7:
                this.synth.triggerAttackRelease("C4", "8n");
                break;

        }
    }

    // Inicio de grabación
    startRecord() {
        if (!this.recording) {
            this.recording = true;
            this.startTime = new Date();
            this.record = new Array();
        }
    }

    // Parada de grabación
    stopRecord() {
        this.recording = false;
        // Si ha habido alguna pulsación se guarda en localStorage 
        // y se muestran los botones play / remove / save
        if (this.record.length > 0) {
            localStorage.setItem('record', JSON.stringify(this.record));
            controller.showActionButtons(true);
        } else {
            // Se ocultan los botones
            controller.showActionButtons(false);
        }
    }

    // Eliminar grabación
    removeRecord() {
        this.record = new Array();
        localStorage.removeItem('record');
        controller.showActionButtons(false);
    }

    // Reproducir grabación
    playRecord() {
        // Parar grabación si está grabando
        if (this.recording) {
            controller.stopRecord();
        }

        // Reproducir cada nota
        this.record.forEach(note => {
            setTimeout(() => {
                controller.animate(note.value);
                this.play(note.value);
            }, note.time);
        });
    }

    // Guardar grabación a un fichero de texto
    saveToFile() {
        var jsonData = JSON.stringify(this.record);
        controller.download(jsonData, 'play.json', 'text/plain');
    }

    /**
     * Cargar grabación desde un texto
     * @param {String} value Texto para cargar
     */
    loadFromString(value) {
        if (value) {
            this.record = JSON.parse(value);
            this.stopRecord();
        }
    }
}

export let piano = new Piano();