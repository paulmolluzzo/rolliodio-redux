ReactLayout.setRootProps({
  className: "page-wrap clearfix"
});

FlowRouter.route('/', {
  action() {
    ReactLayout.render(Main, {content: <Home />});
  }
});

FlowRouter.route('/:slug', {
  action(params) {
    ReactLayout.render(Main, {content: <CurrentGame {...params} />});
  }
});

FlowRouter.notFound = {
    action() {
      ReactLayout.render(Main, {content: <NotFound />});
    }
};
