import anime from 'animejs'
import config from 'config.json'
import Icon from './icon'

class Pin extends Icon {
    constructor(element) {
        super();
        this.el = element;

        Icon.prototype.fadeIn.call(this);

        this.init();
    }
    
    init() {
        this.circle = this.el.querySelector('.circle');

        this.animation = anime.timeline({
            duration: config.duration, // Default 2000
            autoplay: false,
            begin: () => {
                this.animating = true;
            },
            complete: () => {
                this.animating = false;
            }
        }).add({
            targets: this.el,
            rotateY: '+=180',
            translateY: [
                {value: 0, duration: 1, easing: 'easeInOutQuad'},
                {value: 20, duration: config.duration * 0.075, delay: config.duration * 0.05, easing: 'easeInQuad'},
                {value: 0, duration: config.duration * 0.05, delay: 0, easing: 'easeInQuad'}
            ],
        }).add({
            targets: this.circle,
            rotateY:  '+=180',
            elasticity: 600,
            offset: 0,
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

export default Pin;