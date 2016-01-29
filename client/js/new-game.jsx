NewGame = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    Meteor.subscribe('games');
    return {}
  },

  validateName(name) {
    Session.set('error', undefined);

    if (name.length === 0) {
      Session.set('error', 'Name can\'t be blank');
      return false;
    }

    if (Games.findOne({slug: name})) {
      Session.set('error', 'Game already exists. Try again.');
      return false;
    }

    return true;
  },

  validCreation(i, h, m, d) {
    if (this.validateName(h)) {
        Games.update({_id: i}, {$set:{slug:h}});
        Session.set("current_game", h);
        Dice.insert({type: "d6", sides: 6, game: h, date: d, result: "-", rolled: "never"});
        FlowRouter.go('currentgame', {slug: h});
        // _gaq.push(['_trackEvent', 'games', 'new_game']);
    } else {
        m = (Math.floor(Math.random()*9+1)) + i;
        h = m.substring(0, 6);
        this.validCreation(i, h, m);
    }
  },

  createGame() {
    let currentdate = new Date().getTime();
    let newId = Games.insert({date: currentdate});
    let modifiedId = newId;
    let newHash = modifiedId.substring(0, 6);
    Session.set("no_game", null);
    this.validCreation(newId, newHash, modifiedId);

  },

  render() {
    return (
      <div className="new-game">
        <input type="button" className="generate" value="Start a New Game!" onClick={this.createGame} />
        <p>no signup required</p>
      </div>
    )
  }
});
