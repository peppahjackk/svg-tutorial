import anime from 'animejs';
import Pin from 'pin';
import Icon from 'icon';

var icons = document.querySelectorAll('.icon');
var iconList = [];
for (var i = 0; i < icons.length; i++) {
  if (icons[i].classList.contains('pin')) {
    iconList.push(new Pin(icons[i]))
  }
  // new Icon(icons[i])
}
