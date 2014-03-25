###About
This project intents to enable `Backbone.Collection` with `validate` method. It offers two variants of implementation. First is [the simple validation](src/collection-validation-simple.js). The second is [the advanced validation](src/collection-validation-advanced.js). Both implementations are very straightforward and short. So it's better for you to look at them and decide for yourself will you use it or not.
As result you can validate collection like this:

```js
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
```

The more detailed example can be found at [test/spec.js](test/spec.js)

#####P.S.
I came to the idea of this project when I was solving task from [CargoMedia](http://www.cargomedia.ch/). So, this project is kind of their fault too. Guys, I hope you don't mind that I took your `JSON` file for tests in this project.
