import anime from 'animejs'
import animConfig from 'animConfig.json'

class Icon {
  constructor(el) {
    this.el = el;

    this.animating = false;

    this.init();
  }

  init() {
    this.setAnimations();
  }

  setAnimations() {
    var classes = this.el.classList;
    if (classes.contains('pin')) {
      this.circle = this.el.querySelector('.circle')

      this.el.addEventListener('mouseup', this.pinAnim.bind(this));
      this.el.addEventListener('mouseover', this.pinAnim.bind(this));

    } else if (classes.contains('nurse')) {
      console.log(this);
      this.initNurse();

      this.el.addEventListener('mouseup', this.nurseAnimTrigger.bind(this));
      this.el.addEventListener('mouseover', this.nurseAnimTrigger.bind(this));
    } else if (classes.contains('circle')) {
      this.el.addEventListener('mousedown', this.rotate.bind(this));
      this.el.addEventListener('mouseover', this.rotate.bind(this));
    } else if (classes.contains('pulse')) {

    }
  }

  async handleAnimState(callback) {
    if (this.animating) return this.animating;

    anime.remove(this.el); // Remove any other animation commands attached to the el
    this.animating = true;

    return false;
  }

  rotate(e, el, deg = '360') {
    if (el == null) {
      el = this.el;
    }

    this.handleAnimState().then((cancelAnim) => {
      if (cancelAnim) return;
      anime({
        targets: el,
        rotate: {
          value: '+=' + deg
        },
        duration: animConfig.duration,
        complete: () => {
          this.animating = false;
        }
      })
    })
  }

  pinAnim(e) {
    this.handleAnimState().then((cancelAnim) => {
      if (cancelAnim) return;
      anime.timeline().add({
        targets: this.el,
        rotateY: {
          value: '+=180'
        },
        translateY: [20, 0],
        duration: 2000,
        easing: 'easeOutElastic',
        complete: () => {
          this.animating = false;
        }
      }).add({
        targets: this.circle,
        easing: 'easeOutElastic',
        duration: 2000,
        rotateY: {
          value: '-=180'
        },
        offset: -2000
      })
    })
  }

  initNurse(e) {
    this.elPath = this.el.querySelector('path');

    this.nurseAnim = anime.timeline({
      easing: 'easeOutQuad',
      complete: () => {
        this.animating = false;
        console.log('done', this.animating);
      }
    }).add({
      targets: this.elPath,
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 2000,
    }).add({
      targets: this.elPath,
      fill: '#ffffff',
      duration: 500,
      offset: '-=1500',
    }).add({
      targets: this.elPath,
      stroke: 'rgba(0,0,0,0)',
      duration: 500,
      offset: '-=1000',
      
    })
  }

  nurseAnimTrigger(e) {
    // this.handleAnimState().then((cancelAnim) => {
      // if (cancelAnim) return;
      if (this.animating) return this.animating;

    anime.remove(this.el); // Remove any other animation commands attached to the el
    this.animating = true;
      console.log('about to play', this.nurseAnim.play);
      this.nurseAnim.restart();
    // })
  }
}

export default Icon;