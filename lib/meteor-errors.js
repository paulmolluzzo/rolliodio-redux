isoErrors = {
  error(error, reason, details) {
    let meteorError = new Meteor.Error(error, reason, details);

    if (Meteor.isClient) {
      return meteorError;
    }

    if (Meteor.isServer) {
      throw meteorError;
    }
  }
};
