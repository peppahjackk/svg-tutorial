import anime from 'animejs'
import animConfig from 'animConfig.json'
import Icon from 'icon'

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
            autoplay: false,
        }).add({
            targets: this.el,
            rotateY: {
                value: '+=180'
            },
            translateY: [
                {value: 0, duration: 1, easing: 'easeInOutQuad'},
                {value: 20, duration: 150, delay: 100, easing: 'easeInQuad'},
                {value: 0, duration: 100, delay: 0, easing: 'easeInQuad'}
            ],
            duration: animConfig.duration,
            update: (x) => {
                if (!x.paused) this.animating = true;
            },
            complete: () => {
                this.animating = false;
            }
        }).add({
            targets: this.circle,
            elasticity: 600,
            duration: animConfig.duration,
            rotateY:  '+=180',
            offset: '-=' + animConfig.duration,
            update: (x) => {
                if (!x.paused) this.animating = true;
            },
            complete: (x) => {
                console.log(this.animating);
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

export default Pin;