import anime from 'animejs'
import config from 'config.json'
import Icon from 'icon'

class Monitor extends Icon {
    constructor(element) {
        super();

        this.el = element;
        Icon.prototype.fadeIn.call(this);

        this.init();
    }

    init() {
        this.pulseLine = this.el.querySelector('#pulse-line');

        this.animation = anime({
            autoplay: false,
            targets: this.pulseLine,
            scale: [1, 1.2, 1, 1.2, 1, 1],
            easing: 'easeOutQuad',
            duration: (config.duration * 0.375), // 750 default
            loop: 2,
            complete: () => {
                this.animating = false;
            }
        })

        this.setListeners();
    }

    animate() {
        if (this.animating) return;

        anime.remove(this.pulseLine); // Remove any other animation commands attached to the el
        this.animating = true;

        if (this.el.classList.contains('reveal')) {
            this.el.classList.add('hide');

            window.setTimeout(() => {
                this.el.classList.remove('reveal', 'hide');
                this.el.classList.add('reveal');
                this.animation.restart();
            }, (config.duration * 0.25)) // 400 default
        } else {
            this.el.classList.add('reveal'); // Triggers a CSS animation of clip-path

            this.animation.restart();
        }

    }

    setListeners() {
        this.el.addEventListener('mouseup', this.animate.bind(this));
        this.el.addEventListener('mouseover', this.animate.bind(this));
    }
}

export default Monitor;