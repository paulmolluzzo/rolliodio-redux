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

  // take an ID and slug, if the slug is unique then update the Game
  validCreation(_id, slug) {

    // if there's a game with the slug
    // change the slug and the recurse the function
    if (Games.findOne({slug})) {
      slug = ((Math.floor(Math.random()*9+1)) + _id).substring(0, 6);
      this.validCreation(_id, slug);
    } else {
      // must be unique, update the game
      Games.update({_id}, {$set:{slug}});

      // set session for accessing the ID everywhere
      Session.set("_currentGame", _id);

      // create the first die
      Dice.insert({type: "d6", sides: 6, game: _id, result: "-", rolled: "never"});

      // go to the page
      FlowRouter.go('currentgame', {slug});
      // _gaq.push(['_trackEvent', 'games', 'new_game']);
    }
  },

  createGame() {
    let currentdate = new Date().getTime();
    let gameID = Games.insert({owner: Meteor.userId(), date: currentdate});
    let slug = gameID.substring(0, 6);
    this.validCreation(gameID, slug);
  },

  render() {
    return (
      <div className="row new-game">
        <input type="button" className="generate btn btn-primary col-sm-12" value="Start a New Game!" onClick={this.createGame} />
      </div>
    )
  }
});
