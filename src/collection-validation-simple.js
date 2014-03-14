(function (root) {

  function patch(Backbone) {
    var parentSet = Backbone.Collection.prototype.set

    Backbone.Collection.prototype.set = function (models, options) {
      var parentResult = parentSet.apply(this, arguments)
      if (options && options.validate) {
        if (_.isFunction(this.validate)) {
          var errors = this.validate()
          if (errors) {
            this.trigger('invalid', this, errors)
          }
        } else {
          throw new Error('Cannot validate a collection without the `validate` method')
        }
      }
      return parentResult
    }
  }

  if (typeof define === "function" && define.amd) {
    define(['backbone'], function (backbone) {
      patch(backbone)
    })
  } else if (typeof exports !== 'undefined') {
    patch(require('backbone'))
  } else {
    patch(root.Backbone)
  }

}(this))