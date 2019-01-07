import anime from 'animejs'
import config from 'config.json'
import Icon from './icon'

class Monitor extends Icon {
    constructor(element) {
        super();

        this.el = element;
        this.atEnd = true;

        Icon.prototype.fadeIn.call(this);

        this.init();
    }

    init() {
        this.pulseLine = this.el.querySelector('#pulse-line');

        this.animation = anime.timeline({
            targets: this.pulseLine,
            easing: 'easeOutQuad',
            duration: (config.duration * 0.75), // 1500 default
            autoplay: false,
            easing: 'linear',
            direction: 'forwards',
            begin: () => {
                this.animating = true;
            },
            complete: () => {
                this.animating = false;
                this.atEnd = true;
            }
        }).add({
            scale: [1, 1.2, 1, 1.2, 1, 1, 1, 1.2, 1, 1.2, 1, 1],
        })
        .add({
            clipPath: ['polygon(0 0, 0% 0, 0% 100%, 0% 100%)', 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'],
            offset: 0,
        })

        this.resetAnimation = anime({
            targets: this.pulseLine,
            clipPath: ['polygon(0 0, 100% 0, 100% 100%, 0% 100%)', 'polygon(0 0, 0% 0, 0% 100%, 0% 100%)'],
            easing: 'linear',
            duration: (config.duration * 0.25), // 500 defualt
            autoplay: false,
            begin: () => {
                this.animating = true;
            },
            complete: (anim, x) => {
                this.animating = false;
                this.atEnd = false;

                this.animation.restart();
            }
        })

        this.setListeners();
    }

    animate() {
        if (this.animating) return;

        if (this.atEnd) {
            this.resetAnimation.restart();
        } else {
            this.animation.restart();
        }

    }

    setListeners() {
        this.el.addEventListener('mouseup', this.animate.bind(this));
        this.el.addEventListener('mouseover', this.animate.bind(this));
    }
}

export default Monitor;