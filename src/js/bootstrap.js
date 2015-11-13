
/* ===== BOOTSTRAP ===== */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')
  }
}(jQuery);

// = partials/bootstrap/transition.js

// = partials/bootstrap/alert.js

// = partials/bootstrap/button.js

// = partials/bootstrap/carousel.js

// = partials/bootstrap/collapse.js

// = partials/bootstrap/dropdown.js

// = partials/bootstrap/modal.js

// = partials/bootstrap/tooltip.js

// = partials/bootstrap/popover.js

// = partials/bootstrap/scrollspy.js

// = partials/bootstrap/tab.js

// = partials/bootstrap/affix.js
