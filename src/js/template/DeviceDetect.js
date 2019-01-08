var that;
class DeviceDetect {
    constructor() {
        this.isIe = false;
        this.isEdge = false;
        that = this;

        this.init();
    }

    init() {
        this.detectIE();
    }

    detectIE() {
            /* Check if the browser is IE */
    var body = document.querySelector('body');
    var classString = body.className; /* returns the string of all the classes for myDiv */
    var bodyClass;
  if (window.CanvasPixelArray) {
      if (typeof window.CanvasPixelArray.prototype.set !== 'function') {
        /* Set an IE identifier, referenced in the CSS */
        bodyClass = classString.concat(" ie"); /* Adds the class "main__section" to the string (notice the leading space) */
  
        this.isIe = true;
      }
    }
    var isIE = /*@cc_on!@*/false || !!document.documentMode; /* Internet Explorer 6-11 */
    var isEdge = !isIE && !!window.StyleMedia; /* Edge 20+ */
  
    /* Check if Internet Explorer 6-11 OR Edge 20+ */
    if (isEdge) {
      bodyClass += ' edge';
      this.isEdge = true;
    }
    body.className = bodyClass;

    console.log(this);
    }

    checkIe() {
        return this.isIe;
    }
}

export default DeviceDetect;