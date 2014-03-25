  }

  if (typeof define === "function" && define.amd) {
    define(['backbone'], function (backbone) {
      patch(backbone);
    })
  } else if (typeof exports !== 'undefined') {
    patch(require('backbone'))
  } else {
    patch(root.Backbone);
  }

}(this));
