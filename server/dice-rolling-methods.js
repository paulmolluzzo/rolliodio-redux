// These are methods for dice that probably won't equal result on the client and the server
//
// All "random" events should be handled with these methods

Meteor.methods({
  rollDie(die) {
    let dateTime = moment(new Date()).format('MM/DD/YYYY @ HH:mm:ss');
    let e = Math.floor(Math.random()*die.sides + 1);
    Dice.update({_id:die._id}, {$set:{result:e, rolled:dateTime}}, null, (e,r) => {
      if (e)
        isoErrors.error('bad-die-roll', 'Something went wrong!');
    });
  },

  rollAllDice(gameSlug) {
    let dateTime = moment(new Date()).format('MM/DD/YYYY @ HH:mm:ss');
    let allDice = Dice.find({game: gameSlug}).fetch();

    allDice.map((die) => {
      let e = Math.floor(Math.random()*die.sides + 1);
      Dice.update({_id:die._id}, {$set:{result:e, rolled:dateTime}}, null, (e,r) => {
        if (e)
          isoErrors.error('bad-all-die-roll', 'Something went wrong!');
      });
    });
  }
})
