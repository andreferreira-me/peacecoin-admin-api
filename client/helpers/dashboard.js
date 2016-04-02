Template.dashboard.helpers({
  clients: function () {
    return clients.find();
  },
  myClients: function () {
    return clients.find({ ownerId : Meteor.userId()});
  }
});
