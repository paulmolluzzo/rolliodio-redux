EnterGame = React.createClass({

  getInitialState() {
    return {gameName: ''};
  },

  targetGame(event) {
    this.setState({
      gameName: event.target.value
    });
  },

  enterGame() {
    if (Games.findOne({slug: this.state.gameName})) {
      FlowRouter.go('currentgame', {slug: this.state.gameName});
    } else {
      Session.set('alert', {type: 'error', message: 'That game doesn\'t exist'});
    }
  },

  render() {
    return (
      <div className="enter-game">
        <p>OR</p>
        <input id="enter-game-name" type="text" placeholder="Join a Live Game!" onChange={this.targetGame} />
        <input type="button" className="enter-game" value="»" onClick={this.enterGame} />
      </div>
    );
  }
});
