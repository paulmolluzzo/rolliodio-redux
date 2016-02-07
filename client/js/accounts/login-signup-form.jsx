LoginSignupForm = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    let data = {
      user: false
    }

    data.user = Meteor.user();

    return data;
  },

  getInitialState() {
    return {
      username: '',
      password: ''
    };
  },

  collectData(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  },

  handleSignup(event) {
    event.preventDefault();
    Accounts.createUser(
      this.state,
      (error) => {
        if (!error) {
          console.log('Signed Up');
        } else {
          console.log(error);
        }
      }
    );
  },

  render() {
    return (
      <div className="login-signup-block">
        <form className="signup" onSubmit={this.handleSignup} >
          <input name="username" onChange={this.collectData} />
          <input type="password" name="password" onChange={this.collectData} />
          <input type="submit" />
        </form>
      </div>
    );
  }
});




