SingleDie = React.createClass({

  propTypes: {
    die: React.PropTypes.object.isRequired
  },

  rollDie() {
    Meteor.call('rollDie', this.props.die, (e, r) => {
      if (e)
        Session.set('alert', {'type': 'error', 'message': e.reason});
    });
  },

  deleteDie() {
    Meteor.call('deleteDie', this.props.die, (e, r) => {
      if (e)
        Session.set('alert', {'type': 'error', 'message': e.reason});
    });
  },

  updateSides(event) {
    let newValue = event.target.value;
    if (!isNaN(newValue) && (newValue > 1)) {
        Meteor.call('updateDie', this.props.die, newValue, (e, r) => {
          if (e)
            Session.set('alert', {'type': 'error', 'message': e.reason});
        });
        event.target.value = '';
        // _gaq.push(['_trackEvent', 'dice', 'update_sides', newValue]);
    } else {
        event.target.value = '';
    }
  },

  render() {
    return (
      <div data-id={this.props.die._id} className="row single-die">
        <div className="card col-xs-12 die-wrap">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.deleteDie}>
            <span aria-hidden="true">&times;</span>
          </button>
          <div className="card-block">
            <form className="form-inline">
              <div className="form-group">
                <label for="die-count" className="sides">Sides:</label>
                <input id="die-count" className="side-selector" type="text" placeholder={this.props.die.sides} onBlur={this.updateSides} />
              </div>
              <div className="form-group results">
                <label className={this.props.die.type}>{this.props.die.result}</label>
              </div>
            </form>
          </div>
          <p className="roll-time">As of: {this.props.die.rolled}</p>
          <div className="card-block">
            <input type="button" className="btn  btn-block btn-success" value="Roll" onClick={this.rollDie}/>
          </div>
        </div>
      </div>
    )
  }
});
