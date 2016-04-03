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
      "name": $('#name').val(),
      "description": $('#description').val(),
      "active": true,
      "token": Random.hexString( 32 )
    };

    clients.insert( newClient, { validate: false });
  },

  'click .regenerate-api-key': function(event){
     event.preventDefault();
     var clientId = "yH2bn3HpFpMSBFhy6";
     var confirmRegeneration = confirm( "Você tem certeza? Isso irá invalidar sua chave atual! " );
     if ( confirmRegeneration ) {
       Meteor.call( "regenerateApiKey", clientId, function( error, response ) {
         if ( error ) {
           Bert.alert( error.reason, "danger" );
         } else {
           Bert.alert( "All done! You have a new API key.", "success" );
         }
       });
     }
  }

});
