App = React.createClass({
  render() {
    return (
      <div>
        <Alerts />
        <NavBar />
        <main>{this.props.content}</main>
      </div>
    );
  }
});
