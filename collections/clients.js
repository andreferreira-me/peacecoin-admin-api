clients = new Mongo.Collection( 'clients' );

clients.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

clients.deny({
  insert: () => false,
  update: () => false,
  remove: () => false
});

ClientSchema = new SimpleSchema({
  "ownerId": {
    type: String,
    label: " Owner"
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

clients.attachSchema( ClientSchema );
