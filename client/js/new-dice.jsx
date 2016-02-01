NewDice = React.createClass({

  createDice(){
    let currentdate = new Date().getTime();
    let currentId = Session.get("_currentGame");
    Dice.insert({type: "d6", sides: 6, game: currentId, result:"-", rolled: "never"},(e, r) => {
      if (e)
        Session.set('alert', {'type': 'error', 'message': e.reason});
    });
    // _gaq.push(['_trackEvent', 'dice', 'add_die', currentId]);
  },

  render(){
    return (
      <div className="newdie">
        <input type="button" className="generate-die" value="Add another Die" onClick={this.createDice} />
      </div>
    )
  }
});
