Template.clients.helpers({
  clients: function () {
    return clients.find();
  },
  myClients: function () {
    return clients.find({ ownerId : Meteor.userId()});
  }
});

Template.clients.events({
  'submit #new-client'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    var newClient = {
      "ownerId" : Meteor.userId(),
      "name": "teste",
      "description": "$('description').val()",
      "active": true
    };

    clients.insert( newClient, { validate: false });

  }
});
