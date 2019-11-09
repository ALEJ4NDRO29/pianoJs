import { piano } from './piano.class';

class Context {
    constructor() {

        this.piano = piano;

        // Set listener for each key
        document.getElementById('btn-0').addEventListener('click', () => { this.pressed(0) });
        document.getElementById('btn-1').addEventListener('click', () => { this.pressed(1) });
        document.getElementById('btn-2').addEventListener('click', () => { this.pressed(2) });
        document.getElementById('btn-3').addEventListener('click', () => { this.pressed(3) });
        document.getElementById('btn-4').addEventListener('click', () => { this.pressed(4) });
        document.getElementById('btn-5').addEventListener('click', () => { this.pressed(5) });
        document.getElementById('btn-6').addEventListener('click', () => { this.pressed(6) });
        document.getElementById('btn-7').addEventListener('click', () => { this.pressed(7) });

        // Set listener for keyboard keys
        document.addEventListener('keyup', (e) => {
            let code = e.code;
            switch (code) {
                case "KeyA":
                    this.pressed(0);
                    break;
                case "KeyS":
                    this.pressed(1);
                    break;
                case "KeyD":
                    this.pressed(2);
                    break;
                case "KeyF":
                    this.pressed(3);
                    break;
                case "KeyJ":
                    this.pressed(4);
                    break;
                case "KeyK":
                    this.pressed(5);
                    break;
                case "KeyL":
                    this.pressed(6);
                    break;
                case "Semicolon":
                    this.pressed(7);
                    break;
            }
        });
    }

    pressed(value) {
        console.log(value);
        this.piano.play(value);
    }

}

export let controller = new Context();