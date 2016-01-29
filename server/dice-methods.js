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
    Dice.update({_id:die._id}, {$set:{result:e, rolled:dateTime}});
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
      Dice.update({_id:die._id}, {$set:{result:e, rolled:dateTime}});
    });
  },

  updateDie(die, newValue) {
    try {
      Dice.update({_id:die._id}, {$set:{sides:newValue, type:"d"+newValue}});
    } catch (e) {
      throw new Meteor.Error('bad-die-update', 'Something went wrong!');
    }
  },

  // delete a single die :(
  deleteDie(die) {
    Dice.remove(die._id);
  }
})
