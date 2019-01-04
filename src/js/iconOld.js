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
      this.circle = this.el.querySelector('.circle');
      this.pinAnim();

      this.el.addEventListener('mouseup', this.pinAnim.bind(this));
      this.el.addEventListener('mouseover', this.pinAnim.bind(this));

    } else if (classes.contains('nurse')) {
      this.elPath = this.el.querySelector('path');

      this.initNurseAnim();

      this.el.addEventListener('mouseup', this.nurseAnimTrigger.bind(this));
      this.el.addEventListener('mouseover', this.nurseAnimTrigger.bind(this));
    } else if (classes.contains('circle')) {
      this.circleAnimInit();
      this.circle = new CircleIcon(this.el);
      this.circle.init();

      this.el.addEventListener('mousedown', this.circle.restart.bind(this));
      this.el.addEventListener('mouseover', this.circle.restart.bind(this));
    } else if (classes.contains('pulse')) {
      this.pulseLine = this.el.querySelector('#pulse-line');

      this.monitorAnim();

      this.el.addEventListener('mousedown', this.monitorAnim.bind(this));
      this.el.addEventListener('mouseover', this.monitorAnim.bind(this));
    }
  }

  async handleAnimState(callback) {
    if (this.animating) return this.animating;

    anime.remove(this.el); // Remove any other animation commands attached to the el
    this.animating = true;

    return false;
  }

  circleAnimInit(deg = '360') {

    // this.handleAnimState().then((cancelAnim) => {
    this.animating = true;
    // if (cancelAnim) return;

    this.animation = anime({
      targets: this.el.querySelector('#circle-outer'),
      rotate: {
        value: '+=' + deg
      },
      duration: animConfig.duration,
      complete: () => {
        this.animating = false;
        console.log(this);
      }
    })
    // })
  }

  circleAnimTrigger() {
    if (this.animating) return;

    anime.remove(this.el); // Remove any other animation commands attached to the el
    this.animating = true;

    this.animation.restart();
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

  initNurseAnim(e) {
    this.nurseAnim = anime.timeline({
      easing: 'easeOutQuad',
      complete: () => {
        this.animating = false;
        this.animated = true;
      }
    }).add({
      easing: 'linear',
      targets: this.elPath,
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 1500,
    }).add({
      targets: this.elPath,
      fill: '#ffffff',
      duration: 500,
      offset: '-=750',
    }).add({
      targets: this.elPath,
      stroke: 'rgba(0,0,0,0)',
      duration: 500,
      offset: '-=500',

    })
  }

  nurseAnimTrigger(e) {
    if (this.animating) return;

    anime.remove(this.el); // Remove any other animation commands attached to the el
    this.animating = true;

    if (this.animated) {
      anime({
        targets: this.elPath,
        easing: 'easeOutQuad',
        fill: 'rgba(0,0,0,0.01)',
        duration: 500,
        complete: () => {
          this.animated = false;
          this.nurseAnim.restart();
        }
      })
    } else {
      this.nurseAnim.restart();
    }

  }

  monitorAnim() {
    if (this.animating) return;
    anime.remove(this.el); // Remove any other animation commands attached to the el
    this.animating = true;

    if (this.el.classList.contains('reveal')) {
      console.log('has reveal');
      this.el.classList.add('hide');
      window.setTimeout(() => {
        this.el.classList.remove('reveal', 'hide');
        this.el.classList.add('reveal');
        this.animPulseLine();
      }, 550)
    } else {
      this.el.classList.add('reveal'); // Triggers a CSS animation of clip-path
      console.log(this);
      this.animPulseLine();
    }
  }

  animPulseLine() {
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
  }
}

class CircleIcon extends Icon {
  constructor(el) {
    super(el)
    // this.animating = false;
  }

  init() {
    console.log(this);
    this.animating = true;
    this.animation =
      anime({
        targets: this.el.querySelector('#circle-outer'),
        rotate: {
          value: '+=' + deg
        },
        duration: animConfig.duration,
        complete: () => {
          this.animating = false;
        }
      })
  }

  restart() {
    this.animation.restart();
  }
}

export default Icon;