import webmidi from "webmidi";



class Piano {
    constructor() {
        webmidi.enable(function (err) {
            if (!err) {
                console.log('WebMidi enabled');
            }
        });

        this.webmidi = webmidi;

        this.output = webmidi.outputs[0];
    }

    noteTest() {
        this.output.playNote('C3');
    }
}


export let piano = new Piano();
