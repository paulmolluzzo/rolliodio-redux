Home = React.createClass({
  render() {
    return (
      <div className="row home">
        <header className="row">
          <h1 className="four columns"><a href="/">RollioDio</a></h1>
          <nav className="eight columns">
            <ul>
              <li><a href={ FlowRouter.path('login') }>Login</a></li>
              <li><a href={ FlowRouter.path('dashboard') }>Dashboard</a></li>
            </ul>
          </nav>
        </header>
        <h2>Roll dice with friends!</h2>
        <p>Using RollioDio you can create and share virtual dice with friends. Dice rolled on one player's device automatically update every other players' screen.</p>
        { Meteor.user() ? '' : <LoginSignupForm /> }
      </div>
    );
  }
});
