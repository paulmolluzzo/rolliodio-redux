SingleDie = React.createClass({

  propTypes: {
    die: React.PropTypes.object.isRequired
  },

  rollDie() {
    Meteor.call('rollDie', this.props.die);
  },

  render() {
    return (
      <div className="single-die clearfix">
        <div className="die-wrap clearfix" data-id={this.props.die._id}>
          <p className="sides">Sides:</p>
          <input id={this.props.die._id} className="side-selector" type="text" placeholder={this.props.die.sides} />
          <p className="arrow"></p>
          <div className="result">
            <p className={this.props.die.type}>{this.props.die.result}</p>
          </div>
          <p className="roll-time">As of: {this.props.die.rolled}</p>
        </div>
        <div className="delete-roll">
          <input type="button" className="delete-die" value="Delete»»" />
          <input type="button" className="roll" value="««Roll It" onClick={this.rollDie}/>
        </div>
      </div>
    )
  }
});


