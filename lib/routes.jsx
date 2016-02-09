// General Settings for ReactLayout

ReactLayout.setRootProps({
  className: "page-wrap clearfix"
});

// group permissions for specific routes

let everyone = FlowRouter.group({});

let loggedInUsers = FlowRouter.group({
  name: 'loggedInUsers',
  triggersEnter: [(context, redirect) => {
    if (!Meteor.loggingIn() && !Meteor.user()) {
      let route = FlowRouter.current()
      if (route.route.name !== 'login') {
        Session.set('redirectAfterLogin', route.path);
      }
      return FlowRouter.go('login')
    }
  }]
});

// Handling redirects for secured routes

Accounts.onLogin(() => {
    Meteor.logoutOtherClients();

    let redirect = Session.get('redirectAfterLogin');

    Session.set ('loggedIn', true);

    if (redirect !== null && redirect !== '/login')
      return FlowRouter.go(redirect);
});

// Public Routes

everyone.route('/', {
  action() {
    ReactLayout.render(App, {content: <Home />});
  }
});

everyone.route('/login', {
  name: 'login',
  action() {
    ReactLayout.render(App, {content: <LoginSignupForm />});
  }
});

everyone.route('/logout', {
  triggersEnter(context, redirect) {
    Meteor.logout();
    redirect('/');
  },
  action() {
    ReactLayout.render(App, {content: <Home />});
  }
});

// Secured Routes

loggedInUsers.route('/dashboard', {
  name: 'dashboard',
  action(params) {
    ReactLayout.render(App, {content: <Dashboard />});
  }
});

loggedInUsers.route('/game/:slug', {
  name: 'currentgame',
  action(params) {
    ReactLayout.render(App, {content: <CurrentGame {...params} />});
  }
});

// Not Found

FlowRouter.notFound = {
    action() {
      ReactLayout.render(App, {content: <NotFound />});
    }
};
