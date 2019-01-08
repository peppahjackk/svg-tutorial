import DeviceDetect from 'template/DeviceDetect';
import PageLayout from 'template/PageLayout';

import Pin from 'icons/pin';
import Monitor from 'icons/monitor';
import Nurse from 'icons/nurse';
import Circle from 'icons/circle';

var devices;

document.addEventListener("DOMContentLoaded", () => {
  // runUtils();
  initIcons();
})

var initIcons = () => {
  var icons = document.querySelectorAll('.icon');
  
  for (var i = 0; i < icons.length; i++) {
    var iconClassList = icons[i].getAttribute('class');
    console.log(iconClassList);
    if (iconClassList.indexOf('pin') >= 0) {
      new Pin(icons[i]);
    } else if (iconClassList.indexOf('monitor') >= 0) {
      new Monitor(icons[i]);
    } else if (iconClassList.indexOf('nurse') >= 0) {
      new Nurse(icons[i]);
    } else if (iconClassList.indexOf('circle') >= 0) {
      new Circle(icons[i]);
    }
  }
}

var runUtils = () =>  {
  devices = new DeviceDetect();
  new PageLayout();
}