SingleDie = React.createClass({

  propTypes: {
    die: React.PropTypes.object.isRequired
  },

  rollDie() {
    Meteor.call('rollDie', this.props.die);
  },

  deleteDie() {
    Meteor.call('deleteDie', this.props.die);
  },

  updateSides(event) {
    let newValue = event.target.value;
    if (!isNaN(newValue) && (newValue > 1)) {
        Meteor.call('updateDie', this.props.die, newValue);
        event.target.value = '';
        // _gaq.push(['_trackEvent', 'dice', 'update_sides', newValue]);
    } else {
        event.target.value = '';
    }
  },

  render() {
    return (
      <div className="single-die clearfix">
        <div className="die-wrap clearfix" data-id={this.props.die._id}>
          <p className="sides">Sides:</p>
          <input id={this.props.die._id} className="side-selector" type="text" placeholder={this.props.die.sides} onBlur={this.updateSides} />
          <p className="arrow"></p>
          <div className="result">
            <p className={this.props.die.type}>{this.props.die.result}</p>
          </div>
          <p className="roll-time">As of: {this.props.die.rolled}</p>
        </div>
        <div className="delete-roll">
          <input type="button" className="delete-die" value="Delete»»" onClick={this.deleteDie} />
          <input type="button" className="roll" value="««Roll It" onClick={this.rollDie}/>
        </div>
      </div>
    )
  }
});


