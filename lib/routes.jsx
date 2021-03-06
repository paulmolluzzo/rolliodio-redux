// group permissions for specific routes

let everyone = FlowRouter.group({});

let loggedInUsers = FlowRouter.group({
  name: 'loggedInUsers',
  triggersEnter: [() => {
    if (!Meteor.loggingIn() && !Meteor.user()) {
      let route = FlowRouter.current();
      if (route.route.name !== 'login') {
        if (Meteor.isClient) {
          Session.set('redirectAfterLogin', route.path);
        }
      }
      return FlowRouter.go('login');
    }
  }]
});

// Handling redirects for secured routes

Accounts.onLogin(() => {
  if (Meteor.isClient) {
    Meteor.logoutOtherClients();

    let redirect = Session.get('redirectAfterLogin');

    if (redirect !== null && redirect !== '/login') {
      return FlowRouter.go(redirect);
    }
  }
});

// Public Routes

everyone.route('/', {
  action() {
    ReactLayout.render(App, {content: <Home />});
  }
});

everyone.route('/login', {
  name: 'login',
  triggersEnter() {
    if (Meteor.user()) {
      redirect('dashboard');
    }
  },
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
  action() {
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
