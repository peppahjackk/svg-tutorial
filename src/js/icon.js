import anime from 'animejs'
import animConfig from 'animConfig.json'
import Pin from 'pin';

class Icon {
    constructor() {
        this.animating = true;
    }

    fadeIn() {
        anime({
            targets: this.el,
            opacity: [0, 1],
            easing: 'easeInQuad',
            duration: animConfig.duration,
            begin: ()=>{
                this.animating = true;
            },
            complete: ()=>{
                this.animating = false;
                console.log(this);
            }
        })
    }
}

export default Icon;