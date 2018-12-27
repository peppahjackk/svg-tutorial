import anime from 'animejs';
import Pin from 'pin';

var pins = document.querySelectorAll('.icon.pin');

for (var i = 0; i < pins.length; i++) {
  new Pin(pins[i])
}

