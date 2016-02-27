Home = React.createClass({
  render() {
    return (
      <div className="home">
        <h2>Roll dice with friends!</h2>
        <p>Using RollioDio you can create and share virtual dice with friends. Dice rolled on one player's device automatically update every other players' screen.</p>
        { Meteor.user() ? '' : <LoginSignupForm /> }
      </div>
    );
  }
});
