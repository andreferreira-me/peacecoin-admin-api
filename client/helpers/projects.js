Template.projects.helpers({
  projects: function () {
    return projects.find();
  },
  myProjects: function () {
    return projects.find({ ownerId : Meteor.userId()});
  }
});

Template.projects.events({
  'submit #new-project'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    var newProject = {
      "ownerId" : Meteor.userId(),
      "name": "teste",
      "description": "$('description').val()",
      "active": true
    };

    projects.insert( newProject, { validate: false });

  }
});
