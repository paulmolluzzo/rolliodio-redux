CurrentGame = React.createClass({

  // getting data from the collections
  mixins: [ReactMeteorData],

  getMeteorData() {
    let data = {};

    // Subscribe to all games
    let currentgame = Meteor.subscribe('currentgame', this.props.slug);

    // when the subscription is ready
    if (currentgame.ready()) {
      // add the game to the data
      data.game = Games.findOne();

      // set the session with the ID
      Session.set('_currentGame', data.game._id);

      // grab all the dice with that ID
      let gameDice = Meteor.subscribe('dice', data.game._id);

      // check for dice being available after the game is fetched from DB
      // and add all those dice to the data
      if (gameDice && gameDice.ready())
        data.dice = Dice.find({game: data.game._id}).fetch();
    }

    return data;
  },

  // layout for the entire game, each die is rendered and the component for adding a die is also rendered
  gameLayout() {
    return (
      <div>
        <div className="currentgame">
          <div className="game-header clearfix">
            <div className="game-name clearfix">
              <h3>rolliodio.com/</h3>
              <input id="update-game-name" type="text" placeholder={this.data.game.slug} />
            </div>
            <div className="game-actions clearfix">
              <a className="exit-game" href={FlowRouter.path('dashboard')}>Exit</a>
              <input type="button" className="roll-all" value="Roll All" onClick={this.rollAll} />
            </div>
          </div>
          {this.data.dice ? this.renderDice() : ''}
        </div>
        <NewDice />
      </div>
    );
  },

  // rendering all the dice for the game
  renderDice() {
    return this.data.dice.map((die) => {
      return <SingleDie key={die._id} die={die} />;
    });
  },

  // rolling all the dice in the game
  rollAll() {
    Meteor.call('rollAllDice', this.data.game._id, (e, r) => {
      if (e)
        Session.set('alert', {'type': 'error', 'message': e.reason});
    });
  },

  render() {
    return (
      <div>
        {this.data.game ? this.gameLayout() : <Loading />}
      </div>
    );
  }
});
