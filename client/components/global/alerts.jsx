Alerts = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      alert: Session.get('alert')
    };
  },

  clearAlerts() {
    setTimeout(() => {
      Session.set('alert', null);
    }, 3500);
  },

  alertContent() {
    this.clearAlerts();
    return (
      <div className={this.data.alert.type} >
        <h3>{this.data.alert.message}</h3>
      </div>
    );
  },

  render() {
    return (
      <div className="alert">
        { this.data.alert ? this.alertContent() : ''}
      </div>
    );
  }
});
