Meteor.methods({
  insertTransaction: function( transaction ) {

    console.log(transaction);
    check( transaction, Transactions.simpleSchema() );

    var ethTransaction = {
      "from": transaction.from,
      "to": transaction.to,
      "value": transaction.value
    };

    try {
      var hashTransaction = web3.eth.sendTransaction(ethTransaction);

      var newTransaction = {
        "date" : new Date(),
        "from": transaction.from,
        "to": transaction.to,
        "value": transaction.value,
        "hash": hashTransaction,
        "token": transaction.token,
        "adminId": transaction.adminId
      };

      var transactionId = Transactions.insert( newTransaction );

      return transactionId;
    } catch( exception ) {
      return exception;
    }
  }
});
