import anime from 'animejs'
import config from 'config.json'

class Icon {
    constructor() {
        this.animating = false;
    }

    fadeIn() {
        anime({
            targets: this.el,
            opacity: [0, 1],
            easing: 'easeInQuad',
            duration: config.duration,
            begin: ()=>{
                this.animating = true;
            },
            complete: ()=>{
                this.animating = false;
                this.animate();
            }
        })
    }
}

export default Icon;