describe('white box tests', function () {
  var Collection;

  before(function () {
    Collection = Backbone.Collection.extend({
      validate: function (collection) {
        var nonExistIds = [];
        _.forEach(collection, function (model) {
          var friends = model.get('friends');
          if (friends && friends.length) {
            for (var i = friends.length - 1; i >= 0; i--) {
              if (!this.get(friends[i])) {
                nonExistIds.push(friends[i]);
              }
            }
          }
        }, this);
        if (nonExistIds.length) {
          return 'Persons with id: ' + nonExistIds + ' don\'t exist in the collection.';
        }
      }
    })
  });

  beforeEach(function () {
    this.collection = new Collection()
  });

  it('should fail validation', function (done) {
    fs.readFile(
      './test/data/invalid.json'
      ,{encoding: 'utf8'}
      ,function (err, models) {
        var originalNumber = this.collection.length;
        this.collection.on("invalid", function (collection, error) {
          var message = 'No models should be added in case of failed validation';
          assert(error.length, message);
          assert(originalNumber === collection.length && originalNumber === this.collection.length, message);
          _.forEach(models, function(model) {
            assert(!collection.get(model.id), message + '. Failed model has id: ' + model.id);
          });
          done()
        }.bind(this));
        this.collection.set(JSON.parse(models), {validate: true})
      }.bind(this)
    )
  });

  it('should pass validation', function (done) {
    fs.readFile(
      './test/data/valid.json'
      ,{encoding: 'utf8'}
      ,function (err, models) {
        models = JSON.parse(models);
        this.collection.set(models, {validate: true});
        var message = 'All models must be added to collection';
        assert(models.length === this.collection.length, message);
        _.forEach(models, function(model) {
          assert(this.collection.get(model.id), message + '. Failed model has id: ' + model.id);
        }.bind(this));
        done()
      }.bind(this)
    )
  })
});
