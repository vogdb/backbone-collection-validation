describe('white box tests', function () {
  var Collection

  before(function () {
    Collection = Backbone.Collection.extend({
      validate: function (collection) {
        var nonExistIds = []
        _.forEach(collection, function (model) {
          var friends = model.get('friends')
          if (friends && friends.length) {
            for (var i = friends.length - 1; i >= 0; i--) {
              if (!this.get(friends[i])) {
                nonExistIds.push(friends[i])
              }
            }
          }
        }, this)
        if (nonExistIds.length) {
          return 'Persons with id: ' + nonExistIds + ' don\'t exist in the collection.'
        }
      }
    })
  })

  beforeEach(function () {
    this.collection = new Collection()
  })

  it('should fail validation', function (done) {
    fs.readFile(
      './test/data/invalid.json'
      ,{encoding: 'utf8'}
      ,function (err, models) {
        this.collection.on("invalid", function (collection, error) {
          console.log(error)
          done()
        })
        this.collection.set(JSON.parse(models), {validate: true})
      }.bind(this)
    )
  })

  it('should pass validation', function (done) {
    fs.readFile(
      './test/data/valid.json'
      ,{encoding: 'utf8'}
      ,function (err, models) {
        models = JSON.parse(models)
        this.collection.set(models, {validate: true})
        if (models.length === this.collection.length) {
          done()
        }
      }.bind(this)
    )
  })
})