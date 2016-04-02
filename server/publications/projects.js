Meteor.publish('projects', function() {
  return projects.find({});
});
