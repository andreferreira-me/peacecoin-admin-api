Meteor.publish('clients', function() {
  return clients.find();
});
