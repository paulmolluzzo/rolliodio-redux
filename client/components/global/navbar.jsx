NavBar = React.createClass({
  loginLogoutLink() {
    if (Meteor.user()) {
      return (<a className="nav-link" href={ FlowRouter.path('logout') }>Log Out</a>);
    }

    return (<a className="nav-link" href={ FlowRouter.path('login') }>Login</a>);
  },
  render() {
    return (
      <header className="row">
        <nav className="navbar navbar-dark bg-primary bg-faded navbar-fixed-top">
          <button className="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar2">
            &#9776;
          </button>
          <div className="collapse navbar-toggleable-xs" id="exCollapsingNavbar2">
            <a className="navbar-brand" href="/">RollioDio</a>
            <ul className="nav navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href={ FlowRouter.path('dashboard') }>Dashboard</a>
              </li>
              <li className="nav-item active">
                <LoginLogoutLink />
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
});
