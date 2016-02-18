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
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="card">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 className="card-header text-xs-center">{game.slug}</h4>
            <div className="card-block">
              <p className="card-text">Players: ###</p>
              <p className="card-text">Dice: ###</p>
              <a href={FlowRouter.path('currentgame', {slug: game.slug})} className="btn btn-success btn-block">Enter Game</a>
            </div>
          </div>
        </div>
      )
    });
  },

  render() {
    return (
      <div className="dashboard">
        <LoginSignupForm />
        <h3>Dashboard</h3>
        <NewGame />
        <h4>Active Games</h4>
        <section className="row">
          {this.data.myGames ? this.listGames() : ''}
        </section>
      </div>
    );
  }
});
