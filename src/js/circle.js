import anime from 'animejs'
import config from 'config.json'
import Icon from 'icon'

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
            },
            complete: () => {
                this.animating = false;
            }
        })

        this.setListeners();
    }

    animate() {
        if (this.animating) return;

        anime.remove(this.el); // Remove any other animation commands attached to the el
        this.animating = true;

        this.animation.restart();
    }

    setListeners() {
        this.el.addEventListener('mouseup', this.animate.bind(this));
        this.el.addEventListener('mouseover', this.animate.bind(this));
    }
}

export default Circle;