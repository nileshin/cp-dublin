export const htmlentities = {
  // FROM: https://ourcodeworld.com/articles/read/188/encode-and-decode-html-entities-using-pure-javascript
  /*
   * Converts a string to its html characters completely.
   *
   * @param {String} str String with unescaped HTML characters
   **/
  encode: function(str) {
    var buf = [];

    for (var i = str.length - 1; i >= 0; i--) {
      buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
    }

    return buf.join('');
  },
  /**
   * Converts an html characterSet into its original character.
   *
   * @param {String} str htmlSet entities
   **/
  decode: function(str) {
    return str.replace(/&#(\d+);/g, function(match, dec) {
      return String.fromCharCode(dec);
    });
  },
};

export const stripTags = s => {
  return htmlentities.decode(s.replace(/<[^>]+>/g, ''));
};

export const slugify = s => {
  return s.toLowerCase().replace(/\s+/, '-');
};


// Check for passive event listeners
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners
let passiveIfSupportedComputed = false;
(() => {
  if (typeof window === 'undefined') return;
  try {
    // eslint-disable-next-line
    window.addEventListener("test", null, Object.defineProperty({}, "passive", { get: function() { passiveIfSupportedComputed = { passive: true }; } }));
  } catch(err) {}
})();
export const passiveIfSupported = passiveIfSupportedComputed;
