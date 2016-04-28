//Players = new Meteor.Collection("players");

if (Meteor.isServer) {
  Meteor.startup(function () {
    collectionApi = new CollectionAPI({
      authToken: undefined,              // Require this string to be passed in on each request
      apiPath: 'smartcontrats',          // API path prefix
      listenPort: 3005,                  // Port to listen to (stand-alone only)
      listenHost: undefined,             // Host to bind to (stand-alone only)
      timeOut: 120000
    });
    collectionApi.addCollection(Clients, 'clients',{
      authenticate: function(token, method, requestMetadata) {

        debugger
        console.log("authen");
        console.log("token: " + token);
        console.log("method: " + method);
        console.log("requestMetadata: " + JSON.stringify(requestMetadata));
        if (token === undefined) {
          return false;
        }

        var client = Clients.findOne({"Token":token} );

        if (!client) {
          return false;
        }
        return true;
      }
    });
    collectionApi.start();
  });
}
