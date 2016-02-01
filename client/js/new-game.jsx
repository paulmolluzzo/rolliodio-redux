NewGame = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    Meteor.subscribe('games');
    return {}
  },

  validateSlug(slug) {
    Session.set('error', undefined);

    if (slug.length === 0) {
      Session.set('error', 'Name can\'t be blank');
      return false;
    }

    if (Games.findOne({slug})) {
      Session.set('error', 'Game already exists. Try again.');
      return false;
    }

    return true;
  },

  validCreation(_id, slug, modifiedId) {
    if (this.validateSlug(slug)) {
        Games.update({_id}, {$set:{slug}});
        Session.set("_currentGame", _id);
        Dice.insert({type: "d6", sides: 6, game: _id, result: "-", rolled: "never"});
        FlowRouter.go('currentgame', {slug});
        // _gaq.push(['_trackEvent', 'games', 'new_game']);
    } else {
        modifiedId = (Math.floor(Math.random()*9+1)) + _id;
        slug = modifiedId.substring(0, 6);
        this.validCreation(_id, slug, modifiedId);
    }
  },

  createGame() {
    let currentdate = new Date().getTime();
    let gameID = Games.insert({date: currentdate});
    let slug = gameID.substring(0, 6);
    Session.set("no_game", null);
    this.validCreation(gameID, slug, gameID);
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
