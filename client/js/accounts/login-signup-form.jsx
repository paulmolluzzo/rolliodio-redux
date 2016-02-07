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
      doSignup: 'signup',
      username: '',
      password: ''
    };
  },

  collectData(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  },

  toggleSignupLogin(event) {
    this.setState({
      doSignup: event.target.name
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

  handleLogin(event) {
    event.preventDefault();
    Meteor.loginWithPassword(
      this.state.username,
      this.state.password,
      (error) => {
        if (!error) {
          console.log('Logged In');
        } else {
          console.log(error);
        }
      }
    );
  },

  signupForm() {
    return (
      <form className="signup" onSubmit={this.handleSignup} >
        <h2>Sign Up</h2>
        <input type="text" name="username" value={this.state.username} onChange={this.collectData} />
        <input type="password" name="password" value={this.state.password} onChange={this.collectData} />
        <input type="submit" />
      </form>
    )
  },

  loginForm() {
    return (
      <form className="login" onSubmit={this.handleLogin} >
        <h2>Log In</h2>
        <input type="text" name="username" value={this.state.username} onChange={this.collectData} />
        <input type="password" name="password" value={this.state.password} onChange={this.collectData} />
        <input type="submit" />
      </form>
    )
  },

  signupLoginForms() {
    return (
      <div className="forms">
        <button name="signup" className="choose signup" onClick={this.toggleSignupLogin} >Signup</button>
        <button name="login" className="choose login" onClick={this.toggleSignupLogin} >Log In</button>
        {this.state.doSignup === 'signup' ? this.signupForm() : this.loginForm() }
      </div>
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
        {this.data.user || Meteor.loggingIn() ? this.signoutAction() : this.signupLoginForms() }
      </div>
    );
  }
});
