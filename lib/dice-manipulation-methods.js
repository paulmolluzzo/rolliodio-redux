// These are methods for dice that should return an equal result on the client and the server
//
// No "random" events should occur in these methods

Meteor.methods({
  updateDie(die, newValue) {
    Dice.update({_id: die._id}, {$set: {sides: newValue, type: 'd' + newValue}}, null, (e) => {
      if (e) {
        isoErrors.error('bad-die-update', 'Something went wrong!');
      }
    });
  },

  // delete a single die :(
  deleteDie(die) {
    Dice.remove(die._id, (e) => {
      if (e) {
        isoErrors.error('bad-die-delete', 'Something went wrong!');
      }
    });
  }
});
