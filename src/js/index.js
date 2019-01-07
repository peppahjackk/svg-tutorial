import Pin from 'icons/pin';
import Monitor from 'icons/monitor';
import Nurse from 'icons/nurse';
import Circle from 'icons/circle';

var icons = document.querySelectorAll('.icon');

for (var i = 0; i < icons.length; i++) {
  if (icons[i].classList.contains('pin')) {
    new Pin(icons[i]);
  } else if (icons[i].classList.contains('monitor')) {
    new Monitor(icons[i]);
  } else if (icons[i].classList.contains('nurse')) {
    new Nurse(icons[i]);
  } else if (icons[i].classList.contains('circle')) {
    new Circle(icons[i]);
  }
}