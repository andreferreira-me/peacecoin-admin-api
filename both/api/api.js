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
        token = this.bodyParams.token;

        client = Clients.findOne({'token': token});

        if(client){

          name = this.bodyParams.name;
          description = this.bodyParams.description;
          isActive = true;
          var project =  { "_id" : incrementCounter('countCollection', 'projectId'),
                           "clientId" : client._id,
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
        var token = this.queryParams.token;
        var client = Clients.findOne({'token': token});
        var walletAddress = this.queryParams.walletAddress;

        Logger.info("Inicio Consulta Saldo Carteira");
        Logger.info("Cliente - " - client.name );
        Logger.info("Wallet - " -  walletAddress);

        if(client){
          try {
            var walletBalance =  { "walletAddress":walletAddress,
                                   "balance": web3.fromWei(web3.eth.getBalance(walletAddress))
                                 };

            Logger.info("Saldo - " -  walletBalance);
            return {statusCode: 200,
                    status : "success",
                    data: walletBalance
            };
          } catch( exception ) {

            Logger.log("Erro ao recuperar saldo." + exception);
            return {statusCode: 404,
                    status : "error",
                    body: 'Erro ao recuperar saldo.' + exception
                  };
          }
        }else{
          Logger.log("Token Invalido");
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
        token = this.bodyParams.token;
        client = Clients.findOne({'token': token});

        if(client){
          try {

            walletAddressFrom = this.bodyParams.walletAddressFrom;
            walletAddressTo = this.bodyParams.walletAddressFrom;
            value = this.bodyParams.value;

            var ethTransaction = {
              "from": walletAddressFrom,
              "to": walletAddressTo,
              "value": value
            };

            var hashTransaction = web3.eth.sendTransaction(ethTransaction);

            var newTransaction = {
              "date" : new Date(),
              "from": walletAddressFrom,
              "to": walletAddressTo,
              "value": value,
              "hash": hashTransaction,
              "token": token,
              "clientId": client._id
            };

            var transactionId = Transactions.insert( newTransaction );

            console.log(newTransaction);

            var ethTransaction = web3.eth.getTransaction(hashTransaction);

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
}
