FlowRouter.route('/', {
  action() {
    ReactLayout.render(Main, {content: <Home />});
  }
});

FlowRouter.notFound = {
    action() {
      ReactLayout.render(Main, {content: <NotFound />});
    }
};
