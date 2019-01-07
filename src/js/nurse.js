import anime from 'animejs'
import config from 'config.json'
import Icon from 'icon'

class Nurse extends Icon {
    constructor(element) {
        super();

        this.el = element;
        this.elPath = this.el.querySelector('path');
        Icon.prototype.fadeIn.call(this);

        this.init();
    }

    init() {
        this.animation = anime.timeline({
            targets: this.elPath,
            easing: 'easeOutQuad',
            autoplay: false,
            begin: () => {
                this.animating = true;
            },
            complete: () => {
                this.animating = false;
            }
        }).add({
            fill: 'rgba(255,255,255,0)',
            duration: (config.duration * 0.25), // 500 default
        }).add({
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'linear',
            duration: (config.duration * 0.75), // 1500 default
            offset: 0,
        }).add({
            fill: 'rgba(255,255,255,1)',
            stroke: 'rgba(255,255,255,0)',
            duration: (config.duration * 0.25), // 500 default
            offset: '-=' + (config.duration * 0.375), // 750 default
        })

        this.setListeners();
    }

    animate() {
        if (this.animating) return;

        anime.remove(this.el); // Remove any other animation commands attached to the el

        this.animation.restart();
    }

    setListeners() {
        this.el.addEventListener('mouseup', this.animate.bind(this));
        this.el.addEventListener('mouseover', this.animate.bind(this));
    }
}

export default Nurse;