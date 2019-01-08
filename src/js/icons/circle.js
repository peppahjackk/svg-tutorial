import DeviceDetect from '../template/DeviceDetect'
import anime from 'animejs'
import config from 'config.json'
import Icon from './icon'

class Circle extends Icon {
    constructor(element) {
        super();

        this.el = element;
        this.innerCircle = this.el.querySelector('#circle-inner');

        Icon.prototype.fadeIn.call(this);

        this.init();
    }

    init() {
        this.animation = anime({
            targets: this.innerCircle,
            rotate: {
                value: '+=360'
            },
            duration: config.duration, // Default 2000
            autoplay: false,
            begin: () => {
                this.animating = true;
                console.log(this, 'animating');
            },
            complete: () => {
                this.animating = false;
            }
        })

        this.setListeners();
    }

    animate() {
        if (this.animating) return;

        this.animation.restart();
    }

    setListeners() {
        this.el.addEventListener('mouseup', this.animate.bind(this));
        this.el.addEventListener('mouseover', this.animate.bind(this));
    }
}

export default Circle;