Meteor.publish('games', function(){
  return Games.find();
});

Meteor.publish('currentgame', function(slug){
  return Games.find({slug});
});

Meteor.publish('dice', function(currentGame){
  return Dice.find({game: currentGame});
});

Games.allow({
  insert: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user
    // return (userId && doc.owner === userId);

    // return true for everyone
    return true
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    // return doc.owner === userId;

    // return true for everyone
    return true
  },
  remove: function (userId, doc) {
    // can't delete
    return false;
  },
});

Dice.allow({
  insert: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user
    // return (userId && doc.owner === userId);

    // return true for everyone
    return true
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    // return doc.owner === userId;

    // return true for everyone
    return true
  },
  remove: function (userId, doc) {
    // can only remove your own documents
    return doc.owner === userId;

    // return true for everyone
    return true
  },
});
