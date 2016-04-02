Meteor.methods({

  insertClient: function( client ) {
    debugger
    check( client, Client.simpleSchema() );
    
    try {
      var clientId = Client.insert( client );
      return clientId;
    } catch( exception ) {
      return exception;
    }
  },
  updateClient: function( updates ) {
    check( updates, Object );

    try {
      Client.update( { "_id": updates._id }, {
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
    debugger
    check( clientId, String );
    var newKey = Random.hexString( 32 );
    try {
        Client.update( { "_id": clientId }, {
        $set: { "token": newKey }
      });
    } catch(exception) {
      return exception;
    }
  }
});
