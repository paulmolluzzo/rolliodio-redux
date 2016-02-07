ReactLayout.setRootProps({
  className: "page-wrap clearfix"
});

FlowRouter.route('/', {
  action() {
    ReactLayout.render(Main, {content: <Home />});
  }
});

FlowRouter.route('/login', {
  action() {
    ReactLayout.render(Main, {content: <LoginSignupForm />});
  }
});

FlowRouter.route('/:slug', {
  name: 'currentgame',
  action(params) {
    ReactLayout.render(Main, {content: <CurrentGame {...params} />});
  }
});

FlowRouter.notFound = {
    action() {
      ReactLayout.render(Main, {content: <NotFound />});
    }
};
