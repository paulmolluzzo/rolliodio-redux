App = React.createClass({
  render() {
    return (
      <div>
        <Alerts />
        <main>{this.props.content}</main>
      </div>
    );
  }
});
