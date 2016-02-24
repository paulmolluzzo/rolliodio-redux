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
      <div data-id={this.props.die._id} className="row">
        <div className="card col-xs-12">
          <div className="card-block" >
            <form className="form-inline">
              <div className="form-group">
                <label for="die-count">Count:</label>
                <input type="text" className="form-control" id="die-count" placeholder={this.props.die.sides} onBlur={this.updateSides} />
              </div>
              <div className="form-group">
                <label for="die-sides">Sides:</label>
                <input type="text" className="form-control" id="die-sides" placeholder={this.props.die.sides} onBlur={this.updateSides} />
              </div>
              <div className="form-group">
                <label for="die-keep">Keep:</label>
                <input type="text" className="form-control" id="die-keep" placeholder={this.props.die.sides} onBlur={this.updateSides} />
              </div>
              <div className="form-group">
                <label for="die-multiply">Multiply:</label>
                <input type="text" className="form-control" id="die-multiply" placeholder={this.props.die.sides} onBlur={this.updateSides} />
              </div>
              <div className="form-group">
                <input type="button" className="form-control" className="btn btn-success" value="Roll" />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
});
