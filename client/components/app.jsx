App = React.createClass({
  render() {
    return (
      <div>
        <Alerts />
        <NavBar />
        <div className="container">{this.props.content}</div>
        <Footer />
      </div>
    );
  }
});
