import { Synth } from 'tone';
import $ from '../js/$';
import { controller } from './controller';

class Piano {
    constructor() {
        this.synth = new Synth().toMaster();
        this.recording = false;
        this.startTime = null;
        this.record = new Array();
    }

    play(value) {
        if (this.recording) {
            let diff = new Date() - this.startTime;
            this.record.push({ value, diff });
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
        this.recording = true;
        this.startTime = new Date();
        this.record = new Array();
    }

    // Parada de grabación
    stopRecord() {
        this.recording = false;
        if(this.record.length >  0) {
            localStorage.setItem('record', JSON.stringify(this.record));
            
            $('play-record').removeAttribute('hidden');
            $('remove-record').removeAttribute('hidden');
        } else {
            $('play-record').setAttribute('hidden', true);
            $('remove-record').setAttribute('hidden', true);
        }
    }

    // Eliminar grabación
    removeRecord() {
        localStorage.removeItem('record');
        $('play-record').setAttribute('hidden', true);
        $('remove-record').setAttribute('hidden', true);
    }

    // Reproducir grabación
    playRecord() {
        // Parar grabación si está grabando
        if(this.recording) {
            this.stopRecord();
        }

        // Reproducir cada nota
        this.record.forEach(note => {
            setTimeout(() => {
                controller.animate(note.value);
                this.play(note.value);
            }, note.diff);
        });
    }

    saveToFile() {
        var jsonData = JSON.stringify(this.record);
        controller.download(jsonData, 'play.txt', 'text/plain');
    }

    loadFromFile(value) {
        if(value) {
            this.record = JSON.parse(value);
            this.stopRecord();
        } 
    }
}

export let piano = new Piano();