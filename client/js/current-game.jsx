CurrentGame = React.createClass({

  // getting data from the collections
  mixins: [ReactMeteorData],

  getMeteorData() {
    let data = {};

    Session.set('_currentGame', this.props.slug);
    let allGames = Meteor.subscribe('games');
    let gameDice = Meteor.subscribe('dice', this.props.slug);

    if (allGames.ready() && gameDice.ready()) {
      data.game = Games.findOne({slug: this.props.slug});
      data.dice = Dice.find({game: this.props.slug}).fetch();
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
              <a className="exit-game" href="/">Exit</a>
              <input type="button" className="roll-all" value="Roll All" onClick={this.rollAll} />
            </div>
          </div>
          {this.renderDice()}
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
    Meteor.call('rollAllDice', this.data.game.slug);
  },

  render() {
    return (
      <div>
        {this.data.game ? this.gameLayout() : <Loading />}
      </div>
    );
  }
});
