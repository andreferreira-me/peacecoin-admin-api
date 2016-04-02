Template.dashboard.onCreated( function() {
  this.subscribe( 'client', function() {
    console.log( "Clients data ready.");
  });
});
