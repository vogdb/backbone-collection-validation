//This implementation is called simple because it
// * allows to set invalid models into collection. Validation only will trigger
//   an event 'invalid' and nothing more.
var parentSet = Backbone.Collection.prototype.set

Backbone.Collection.prototype.set = function (models, options) {
  var parentResult = parentSet.apply(this, arguments)
  if (options && options.validate) {
    if (!_.isFunction(this.validate)) {
      throw new Error('Cannot validate a collection without the `validate` method')
    }
    var errors = this.validate(this.models)
    if (errors) {
      this.trigger('invalid', this, errors)
    }
  }
  return parentResult
}