Footer = React.createClass({
  render() {
    return (
      <footer>
        <div className="container">
          <ul>
            <li><a className="nav-link" href={ FlowRouter.path('dashboard') }>Dashboard</a></li>
            <li><LoginLogoutLink /></li>
            <li>© 2016 RollioDio</li>
          </ul>
        </div>
      </footer>
    );
  }
});
