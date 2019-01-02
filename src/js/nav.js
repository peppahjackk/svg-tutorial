import anime from 'animejs'
import animConfig from 'animConfig.json'
import { Linear } from 'gsap';

class Nav {
  constructor() {
    this.mob_menu_btn = document.querySelector('#hamburger');
    this.mob_menu_content_el = document.getElementsByClassName('mob-menu-content')[0];

    this.mob_menu_active = false;
    this.mob_menu_animating = false;

    this.mob_menu_icon = this.mob_menu_btn.querySelectorAll('path');
  }
  
  init() {
    this.mob_menu_btn.addEventListener('click', () => {
      this.toggleMobMenu();
    })

  }

  toggleMobMenu() {
    if (this.mob_menu_animating) return;

    this.mob_menu_animating = true;
    if (this.mob_menu_active) {
      this.mob_menu_active = false;

      this.animateHamburgerClosed();
      this.closeMobMenu(()=>{
        // this.mob_menu_content_el.style.display = 'none';	
        this.mob_menu_animating = false;
      });
    } else {
      this.mob_menu_active = true;
      // this.mob_menu_content_el.style.display = 'block';	

      this.animateHamburgerOpen();
      this.openMobMenu(()=>{
        this.mob_menu_animating = false;
      });
    }
  }

  animateHamburgerOpen() {
    anime({
      targets: this.mob_menu_icon[0],
      duration: animConfig.durationShort,
      // translateX: '3px',
      // translateY: '8px',
      rotate: '45deg',
      easing: 'easeOutExpo',
    })

    anime({
      targets: this.mob_menu_icon[2],
      duration: animConfig.durationShort,
      // translateX: '2px',
      // translateY: '-7px',
      rotate: '-45deg',
      easing: 'easeOutExpo',
    })

    anime({
      targets: this.mob_menu_icon[1],
      duration: animConfig.durationShort,
      // translateX: '2px',
      // translateY: '-7px',
      // width: 0,
      easing: 'easeOutExpo',
      rotate: '45deg',
      // elasticity: 0
    })
  }

  animateHamburgerClosed() {
    anime({
      targets: this.mob_menu_icon[0],
      duration: animConfig.durationShort,
      rotate: '0deg',
      // translateX: 0,
      easing: 'easeOutExpo',
    })

    anime({
      targets: this.mob_menu_icon[2],
      duration: animConfig.durationShort,
      rotate: '0deg',
      // translateX: 0,
      easing: 'easeOutExpo',
    })

    anime({
      targets: this.mob_menu_icon[1],
      duration: animConfig.durationShort,
      // scale: 1,
      easing: 'easeOutExpo',
      // elasticity: 0
      // easing: function(t) {return t}
      rotate: '0deg'
    })
    
  }

  openMobMenu(callback) {

    callback();
  }
  
  closeMobMenu(callback) {
    
    callback();
  }
}

export default Nav;