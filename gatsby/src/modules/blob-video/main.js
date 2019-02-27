import $ from 'jquery';

(function($) {
  if (typeof window === 'undefined') return;
  var getHeight, getWidth;
  calcAspectRatio();
  $(window).resize(function() {
    calcAspectRatio();
  }); 

  function calcAspectRatio() {
    getHeight = (window.innerWidth * 1080) / 1920;
    getWidth = (1920 * window.innerHeight) / 1080;
    if (getHeight < window.innerHeight) {
      $(".blob iframe").width(getWidth);
      $(".blob iframe").height(window.innerHeight);
    } else {
      $(".blob iframe").width(window.innerWidth);
      $(".blob iframe").height(getHeight);
    }
  }

})($);