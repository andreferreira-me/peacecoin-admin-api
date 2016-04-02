Template.dashboard.helpers({
  projects: function () {
    return projects.find();
  },
  myProjects: function () {
    return projects.find({ ownerId : Meteor.userId()});
  }
});
