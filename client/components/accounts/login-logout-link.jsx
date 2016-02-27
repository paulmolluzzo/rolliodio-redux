LoginLogoutLink = React.createClass({
  render() {
    if (Meteor.user())
      return (<a className="nav-link" href={ FlowRouter.path('logout') }>Log Out</a>)

    return (<a className="nav-link" href={ FlowRouter.path('login') }>Login</a>)
  }
});
