import $ from 'jquery';
import cookieconsent from 'cookieconsent';

(function($) {
    if (typeof window === 'undefined') return;
    console.log('footer/main.js loaded');
    console.log(cookieconsent);
    window.addEventListener("load", function(){
      
        window.cookieconsent.initialise({
          palette: {
              "popup": {
                "background": "#000"
              },
              "button": {
              "background": "transparent",
              "text": "#FFFFFF",
              "border": "#FFFFFF"
              }          
          },
          type: "info",
          showLink: false,
          position: "bottom",
          content: {
            header: 'Cookies used on the website!',
            message: 'By continuing to use this site without changing your settings, you agree to the use of cookies in accordance with our <a href=\'/cookie-policy\'>Cookie Policy</a>.',
            dismiss: 'Agreed',
            link: 'Learn more',
            href: '/cookie-policy/',
            close: '&#x274c;',
          }     
        })
      });

})($);