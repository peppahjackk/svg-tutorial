import anime from 'animejs'
import animConfig from 'animConfig.json'

class Pin {
  constructor(el){
    this.el = el;
    this.enabled = true;
    this.animating = false;
    
    this.init();
  }

  init() {
    if (!this.enabled) return;


    this.el.addEventListener('mouseup', function(){console.log('click test');});
    this.el.addEventListener('mouseover', this.flipBounce.bind(this));
  }

  flipBounce (e) {
    console.log('attemping FB');
    if (this.animating) return;

    anime.remove(this.el);
    this.animating = true;

    anime({
      targets: this.el,
      rotateY: {
        value: '+=180'
      },
      translateY: [20, 0],
      duration: animConfig.duration,
      complete: () => {
        this.animating = false;
      }
    })
  }
}

export default Pin;