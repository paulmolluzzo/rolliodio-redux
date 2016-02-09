Dashboard = React.createClass({
  // getting data from the collections
  mixins: [ReactMeteorData],

  getMeteorData() {
    let data = {};

    // Subscribe to all games
    let allGames = Meteor.subscribe('games');

    // when the subscription is ready
    if (allGames.ready())
      data.allGames = Games.find().fetch();

    return data;
  },

  enterGame(index) {
    console.log(this.data.allGames[index]);
  },

  listGames() {
    return this.data.allGames.map((game, index) => {
      return (
        <li>
          <input type="button" className="generate" value={game.slug} onClick={this.enterGame.bind(this, index)} />
        </li>
      )
    });
  },

  render() {
    return (
      <div className="dashboard">
        <LoginSignupForm />
        <NewGame />
        <ul>
          {this.data.allGames ? this.listGames() : ''}
        </ul>
      </div>
    );
  }
});
