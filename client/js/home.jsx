Home = React.createClass({
  render() {
    return (
      <div className="home">
        <header>
            <a href="/"><h1><span>R</span>ollio<span>D</span>io</h1></a>
        </header>
        <h2>Roll dice with friends!</h2>
        <p className="intro">Using <span>RollioDio</span> you can create and share virtual dice with friends. Dice rolled on one player's device automatically update every other players' screen.</p>
        <NewGame />
        <EnterGame />
    </div>
    );
  }
});
