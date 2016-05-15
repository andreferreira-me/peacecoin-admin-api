//Players = new Meteor.Collection("players");

if (Meteor.isServer) {

  // Global API configuration
  var Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true,
    apiPath: 'smartcoin',
    version: 'v1',
    defaultHeaders: {
      'Content-Type': 'application/json'
    }

  });


  //Metododo responsavel em cadatrar projeto
  //Retorna json com o projeto cadastrado

  Api.addRoute('project',{
    post: {
      action: function(){

        if(typeof web3 === 'undefined')
          web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

        token = this.bodyParams.token;

        client = Clients.findOne({'token': token});

        if(client){

          name = this.bodyParams.name;
          description = this.bodyParams.description;
          projectIdCli = this.bodyParams.projectId;
          isActive = true;
          var project =  { "_id" : incrementCounter('countCollection', 'projectId'),
                           "clientId" : client._id,
                           "projectId": projectIdCli,
                           "name" : name,
                           "description":description,
                           "isActive": isActive,
                           "walletAddress": web3.personal.newAccount("123456") };

          console.log(project);
          try {
            var projectId = Projects.insert( project );
            var prj = Projects.findOne({"_id":projectId});
            console.log(prj);
            return {statusCode: 200,
                    status : "success",
                    data: prj
            };
          } catch( exception ) {
            return {statusCode: 404,
                    status : "error",
                    body: 'Erro ao salvar o projeto.' + exception
                   }
          }
        }else{
          return {statusCode: 404,
                  status : "error",
                  body: 'Token Inválido'};
        }

        return {};
      }
    }
  });

  //Metododo responsavel em vericar saldo de uma carteira.
  //Recebe como paramentro :
  //token -> Validar qual o cliente está realizado a solicitação.
  //walletAddress -> Endereço da carteira que deseja consultar o saldo disponivel.
  //Retorna o saldo disponivel da carteira.
  Api.addRoute('balance',{
    get: {
      action: function(){

        if(typeof web3 === 'undefined')
          web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

        var token = this.queryParams.token;
        var client = Clients.findOne({'token': token});
        var walletAddress = this.queryParams.walletAddress;

        console.log("Inicio Consulta Saldo Carteira");

        if(client){
          try {

            console.log("Cliente - " + client.name );
            console.log("Wallet - " +  walletAddress);

            var balance = web3.eth.getBalance(walletAddress);

            var walletBalance =  { "walletAddress":walletAddress,
                                   "balance": EthTools.formatBalance(balance, '0,0.0[00] unit', 'ether'),
                                   "usd" : EthTools.formatBalance(balance, '0,0.0[00] unit', 'usd'),
                                   "btc" :EthTools.formatBalance(balance, '0,0.0[00] unit', 'btc')
                                 };

            console.log("Saldo - " +  walletBalance.balance);
            return {statusCode: 200,
                    status : "success",
                    data: walletBalance
            };
          } catch( exception ) {

            console.log("Erro ao recuperar saldo." + exception);
            return {statusCode: 404,
                    status : "error",
                    body: 'Erro ao recuperar saldo.' + exception
                  };
          }
        }else{
          console.log("Token Invalido");
          return {statusCode: 404,
                  status : "error",
                  body: 'Token Inválido'};
          }

        return {};
      }
    }
  });

  //Metododo responsavel em realizar tarnsferecia de fundos .
  //Recebe como paramentro :
  //token -> Validar qual o cliente está realizado a solicitação.
  //walletAddressFrom->Endereço da carteira de onde irá debitar o valor.
  //walletAddressTo->Endereço da carteira de onde irá creditar o valor
  //-> Endereço da carteira de onde irá debitar o valor .
  //Retorna o saldo disponivel da carteira.
  Api.addRoute('transaction',{
    post: {
      action: function(){

        if(typeof web3 === 'undefined')
          web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

        token = this.bodyParams.token;
        client = Clients.findOne({'token': token});

        if(client){
          try {

            console.log("Transferencia de Fundos");
            walletAddressFrom = this.bodyParams.walletAddressFrom;
            walletAddressTo = this.bodyParams.walletAddressTo;
            value = this.bodyParams.value;

            var ethTransaction = {
              "from": walletAddressFrom,
              "to": walletAddressTo,
              "value": web3.toWei(value, "ether")
            };

            console.log(ethTransaction);
            var hashTransaction = web3.eth.sendTransaction(ethTransaction);

            console.log("Transferencia de Fundos - Efetuada");

            console.log("Transferencia de Fundos - Salvar Transação");
            var newTransaction = {
              "date" : new Date(),
              "from": walletAddressFrom,
              "to": walletAddressTo,
              "value": value,
              "hash": hashTransaction,
              "token": token,
              "clientId": client._id
            };

            console.log(newTransaction);
            var transactionId = Transactions.insert( newTransaction );
            var ethTransaction = web3.eth.getTransaction(hashTransaction);

            console.log("Transferencia de Fundos - " );
            console.log(ethTransaction);

            return {statusCode: 200,
                    status : "success",
                    data: ethTransaction
            };
          } catch( exception ) {
            return {statusCode: 404,
                    status : "error",
                    body: 'Erro realizar transferecia de fundos.' + exception
                  };
          }
        }else{
          return {statusCode: 404,
                  status : "error",
                  body: 'Token Inválido'};
          }

        return {};
      }
    }
  });

  //Metododo responsavel em cadastrar colaborador e criar a sua carteira
  //Retorna json com o colaborador cadastrado
  Api.addRoute('collaborator',{
    post: {
      action: function(){

        console.log("Cadstro de Colaborador");
        if(typeof web3 === 'undefined')
          web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

        token = this.bodyParams.token;
        client = Clients.findOne({'token': token});

        if(client){
          name = this.bodyParams.name;
          cpf = this.bodyParams.cpf;
          isActive = true;

          console.log("Cadstro de Colaborador - Cliente :" + client.name);
          var collaborator =  { "_id" : incrementCounter('countCollection', 'collaboratorId'),
                           "clientId" : client._id,
                           "name" : name,
                           "cpf":cpf,
                           "active":isActive,
                           "walletAddress": web3.personal.newAccount("123456") };

          console.log(collaborator);
          try {
            var collaboratorId = Collaborators.insert( collaborator );
            var cbt = Collaborators.findOne({"_id":collaboratorId});
            console.log("Cadstro de Colaborador - Cadastrado com Sucesso.");
            return {statusCode: 200,
                    status : "success",
                    data: cbt
            };
          } catch( exception ) {
            console.log("Cadstro de Colaborador - Error: :" + exception);
            return {statusCode: 404,
                    status : "error",
                    body: 'Erro ao salvar o colaborador.' + exception
                   }
          }
        }else{
          console.log("Cadstro de Colaborador - Token Invalido");
          return {statusCode: 404,
                  status : "error",
                  body: 'Token Inválido'};
        }

        return {};
      }
    }
  });


}
