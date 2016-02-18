NewDice = React.createClass({

  createDice(){
    let currentID = Session.get("_currentGame");
    Dice.insert({type: "d6", sides: 6, game: currentID, result:"-", rolled: "never"},(e, r) => {
      if (e)
        Session.set('alert', {'type': 'error', 'message': e.reason});
    });
    // _gaq.push(['_trackEvent', 'dice', 'add_die', currentID]);
  },

  render(){
    return (
      <div className="newdie">
        <input type="button" className="generate-die btn btn-block btn-primary" value="Add another Die" onClick={this.createDice} />
      </div>
    )
  }
});
