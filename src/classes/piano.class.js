import { Synth } from 'tone';

class Piano {
    constructor() {
        this.synth = new Synth().toMaster();
        console.log(this.synth);
    }

    play(value) {
        // this.synth.triggerAttackRelease("C4", "8n");
        this.synth.triggerAttackRelease("F1", "8n");

    }
}

export let piano = new Piano();