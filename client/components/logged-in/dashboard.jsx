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
          <a href={FlowRouter.path('currentgame', {slug: game.slug})} className="button twelve columns">{game.slug}</a>
        </li>
      )
    });
  },

  render() {
    return (
      <div className="row dashboard">
        <LoginSignupForm />
        <h3>Dashboard</h3>
        <NewGame />
        <h4>Active Games</h4>
        <ul className="row">
          {this.data.myGames ? this.listGames() : ''}
        </ul>
      </div>
    );
  }
});
