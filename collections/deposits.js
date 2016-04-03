deposits = new Mongo.Collection( 'deposits' );

deposits.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

deposits.deny({
  insert: () => false,
  update: () => false,
  remove: () => false
});

DepositSchema = new SimpleSchema({
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
  },
  "token": {
    type: String,
    label: "Token"
  }
});

deposits.attachSchema( DepositSchema );
