import Pin from 'pin';
import Monitor from 'monitor';
import Nurse from 'nurse';
import Circle from 'circle';

var icons = document.querySelectorAll('.icon');
var iconList = [];
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
