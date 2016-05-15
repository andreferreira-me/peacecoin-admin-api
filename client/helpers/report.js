
Template.report.helpers({
  transactions: function () {
    Transactions.join(Clients,"clientId", "client",["name"]);
    console.log(Transactions.find().fetch());
    return Transactions.find().fetch();
  },
  reports:function(){
    Transactions.join("Clients","clientId", "client",["name","description"]);
    var ret = Transactions.find();
    Console.log(ret);
    return  ret;
  }

});
