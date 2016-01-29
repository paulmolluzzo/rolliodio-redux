Main = React.createClass({
  render() {
    return (
      <div className="page-wrap clearfix">
        <main>{this.props.content}</main>
      </div>
    );
  }
});
