import anime from 'animejs'
import animConfig from 'animConfig.json'

class Monitor {
    constructor(el) {
        this.el = el;
        this.animating = true;

        this.init();
    }

    init() {
        this.animation =
            anime({
                targets: this.pulseLine,
                scale: [1, 1.2, 1, 1.2, 1, 1],
                easing: 'easeOutQuad',
                duration: 1000,
                loop: 2,
                complete: () => {
                    this.animating = false;
                }
            })

        this.setListeners();
    }

    restart() {
        if (this.animating) return;

        anime.remove(this.el); // Remove any other animation commands attached to the el
        this.animating = true;

        this.animation.restart();
    }

    setListeners() {
        this.el.addEventListener('mouseup', this.restart.bind(this));
        this.el.addEventListener('mouseover', this.restart.bind(this));
    }
}

export default Monitor;