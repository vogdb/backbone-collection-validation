//This implementation is called advanced because it
// * doesn't allow to set invalid models into collection.

var parentSet = Backbone.Collection.prototype.set;

Backbone.Collection.prototype.set = function (models, options) {
  if (!options || !options.validate) {
    return parentSet.apply(this, arguments);
  } else {
    if (!_.isFunction(this.validate)) {
      throw new Error('Cannot validate a collection without the `validate` method');
    }

    var clones = [];
    _.forEach(this.models, function (model) {
      clones.push(model.clone());
    }, this);
    var exModels = this.models;
    this.reset(clones);
    var exSilent = options.silent;
    options.silent = true;
    parentSet.apply(this, arguments);

    var errors = this.validate(this.models);

    this.reset(exModels);
    if (typeof exSilent === 'undefined') {
      delete options.silent;
    } else {
      options.silent = exSilent;
    }
    if (errors) {
      this.trigger('invalid', this, errors);
      return this;
    } else {
      return parentSet.apply(this, arguments);
    }
  }
};
