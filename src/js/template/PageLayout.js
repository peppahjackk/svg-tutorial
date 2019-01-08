class PageLayout {
    constructor () {
        this.init();
    }

    init() {
        this.normalizeGridMeasurments();
    }

    normalizeGridMeasurments() {
        var svgContainers = document.querySelectorAll('.svg-container');
        var maxContHeight = 0;
        var maxContWidth = 0;
        
        for (var i = 0; i < svgContainers.length; i++) {
          if (svgContainers[i].offsetHeight > maxContHeight) {
            maxContHeight = svgContainers[i].offsetHeight;
          }
          if (svgContainers[i].offsetWidth > maxContWidth) {
            maxContWidth = svgContainers[i].offsetWidth;
          }
        }
        
        for (var i = 0; i < svgContainers.length; i++) {
          if (svgContainers[i].offsetHeight < maxContHeight) {
            svgContainers[i].style.minHeight = maxContHeight + 'px';
          }
          if (svgContainers[i].offsetWidth < maxContWidth) {
            svgContainers[i].style.minWidth = maxContWidth + 'px';
          }
        }
    }
}
  
export default PageLayout;