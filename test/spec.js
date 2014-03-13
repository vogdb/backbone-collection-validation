describe('white box tests', function () {
  var Collection

  before(function () {
    Collection = Backbone.Collection.extend({
      validate: function () {
        var nonExistIds = []
        this.forEach(function (model) {
          var friends = model.friends
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
    this.collection.url = 'data/invalid.json'
    this.collection.on("invalid", function (error) {
      console.log(error)
      done()
    })
    this.collection.fetch({
      validate: true
    })
  })

  it('should pass validation', function (done) {
    var validDataUrl = 'data/valid.json'
    Backbone.ajax({
      dataType: 'json',
      url: validDataUrl,
      success: function (persons) {
        this.collection.url = validDataUrl
        this.collection.fetch({
          success: function (collection) {
            //here we can't rely just on `success` callback because it will be
            //launched even if all items of collection are invalid. In this case
            //the collection parameter will be just an empty array. So if all
            //items of fetched collection are present then this test is passed.
            if (persons.length === collection.length) {
              done()
            }
          },
          validate: true
        })
      }.bind(this)
    })
  })
})