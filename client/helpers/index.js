Template.index.helpers({
  countTransactions: function () {
    var count=0;
    var cursor=Transactions.find();
    cursor.forEach(function(transaction){
      count = count + 1
    });
    console.log(count);
    return count;
  },
  sumTransactions: function(){

    var sum=0;
    var cursor=Transactions.find();
    cursor.forEach(function(transaction){
      sum = sum + transaction.value
    });
    return sum +' ether';
   }
});
