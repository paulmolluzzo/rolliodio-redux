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

  signupForm() {
    return (
      <form className="signup" onSubmit={this.handleSignup} >
        <input name="username" onChange={this.collectData} />
        <input type="password" name="password" onChange={this.collectData} />
        <input type="submit" />
      </form>
    )
  },

  signoutAction() {
    let signoutLink = FlowRouter.path('logout');
    return (
      <div className="signout">
        <a href={signoutLink}>Log Out</a>
      </div>
    )
  },

  render() {
    return (
      <div className="login-signup-block">
        {this.data.user || Meteor.loggingIn() ? this.signoutAction() : this.signupForm() }
      </div>
    );
  }
});




