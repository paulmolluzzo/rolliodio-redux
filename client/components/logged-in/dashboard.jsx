Dashboard = React.createClass({
  // getting data from the collections
  mixins: [ReactMeteorData],

  getMeteorData() {
    let data = {};

    // Subscribe to all games
    let myGames = Meteor.subscribe('mygames');

    // when the subscription is ready
    if (myGames.ready())
      data.myGames = Games.find().fetch();

    return data;
  },

  enterGame(index) {
    console.log(this.data.myGames[index]);
  },

  listGames() {
    return this.data.myGames.map((game, index) => {
      return (
        <li>
          <a href={FlowRouter.path('currentgame', {slug: game.slug})} >{game.slug}</a>
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
          {this.data.myGames ? this.listGames() : ''}
        </ul>
      </div>
    );
  }
});
