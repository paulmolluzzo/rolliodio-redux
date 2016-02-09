Signout = React.createClass({
  logout(event) {
    event.preventDefault();
    event.stopPropagation();
    Meteor.logout();
  },

  render() {
    let signoutLink = FlowRouter.path('logout');
    return (
      <div className="signout">
        <a href={signoutLink} onClick={this.logout} >Log Out</a>
      </div>
    );
  }
});
