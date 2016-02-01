// These are methods for dice that probably won't equal result on the client and the server
//
// All "random" events should be handled with these methods

Meteor.methods({
  rollDie(die) {
    let currentDate = new Date();
    let dateTime = (currentDate.getMonth()+1) + "/"
                    + (currentDate.getDate())  + "/"
                    + currentDate.getFullYear() + " @ "
                    + currentDate.getHours() + ":"
                    + currentDate.getMinutes() + ":"
                    + currentDate.getSeconds();
    let e = Math.floor(Math.random()*die.sides + 1);
    Dice.update({_id:die._id}, {$set:{result:e, rolled:dateTime}}, null, (e,r) => {
      if (e)
        isoErrors.error('bad-die-roll', 'Something went wrong!');
    });
  },

  rollAllDice(gameSlug) {
    let currentDate = new Date();
    let dateTime = (currentDate.getMonth()+1) + "/"
                    + (currentDate.getDate())  + "/"
                    + currentDate.getFullYear() + " @ "
                    + currentDate.getHours() + ":"
                    + currentDate.getMinutes() + ":"
                    + currentDate.getSeconds();
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
