Projects = new Mongo.Collection( 'projects' );

Projects.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Projects.deny({
  insert: () => false,
  update: () => false,
  remove: () => false
});

ProjectSchema = new SimpleSchema({
  "_id": {
    type:  String,
    label: "ID"
  },
  
  "clientId": {
    type: String,
    label: "Client ID"
  },

  "walletAddress": {
    type: String,
    label: "Project Wallet Address"
  }
});

Projects.attachSchema( ProjectSchema );
