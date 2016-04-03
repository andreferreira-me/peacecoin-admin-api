Meteor.methods({

  insertClient: function( client ) {
    check( client, Clients.simpleSchema() );

    try {
      var clientId = Clients.insert( client );
      return clientId;
    } catch( exception ) {
      return exception;
    }
  },
  updateClient: function( updates ) {
    check( updates, Object );

    try {
      Clients.update( { "_id": updates._id }, {
        $set: updates
      } );
    } catch( exception ) {
      return exception;
    }
  },
  removeClient: function( clientId ) {
    check( clientId, String );

    try {
      Client.remove( clientId );
    } catch( exception ) {
      return exception;
    }
  },
  regenerateApiKey: function( clientId ){
    check( clientId, String );
    var newKey = Random.hexString( 32 );
    try {
        Clients.update( { "_id": clientId }, {
        $set: { "token": newKey }
      });
    } catch(exception) {
      return exception;
    }
  }
});
