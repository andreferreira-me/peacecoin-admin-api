Session.setDefault('latestBlock', {});

Template.dashboard.helpers({
  clients: function () {
    return clients.find();
  },
  myClients: function () {
    return clients.find({ ownerId : Meteor.userId()});
  }
});

Template.blockchainStatus.helpers({
    currentBlock: function () {
        return JSON.stringify(Session.get('latestBlock'), null, 2);
    }
});

Template.deposits.helpers({
    deposits: function () {
        return deposits.find({},{sort: {blockNumber: -1}});
    },
    value: function(){
        return web3.fromWei(this.value, 'ether') + ' ETH';
    }
});

Template.sendETH.events({
  'click button': function (e, template) {
      web3.eth.sendTransaction({from: web3.eth.accounts[0], to: contractInstance.address, value: web3.toWei(template.find('input').value)});
  }
});

Template.guessNumber.events({
    'click button.guess': function (e, template) {
        alert(template.find('input').value +' is '+ contractInstance.guessNumber(template.find('input').value));
        template.find('input').value = '';
    },
    'click button.set': function (e, template) {
        console.log(contractInstance.setNumber(template.find('input').value, {from: web3.eth.accounts[0], gas: 50000}));
        template.find('input').value = '';
    },
    'click a.switch': function (e, template) {
        TemplateVar.set('setNumber', !TemplateVar.get('setNumber'));
    }
});
