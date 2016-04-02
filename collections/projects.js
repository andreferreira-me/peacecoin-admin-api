projects = new Meteor.Collection( 'projects' );

ProjectSchema = new SimpleSchema({
  "ownerId": {
    type: String,
    label: "Project Owner"
  },
  "name": {
    type: String,
    label: "Project Name"
  },
  "description": {
    type: String,
    label: "Project Description"
  },
  "active": {
    type: Boolean,
    label: "Project isActive?"
  }
});

projects.attachSchema( ProjectSchema );
