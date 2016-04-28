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

  Api.addRoute('project',{
    post: {
      action: function(){
        token = this.bodyParams.token;
        client = Clients.findOne({'token': token});

        if(client){

          var project =  { "_id" : incrementCounter('countCollection', 'projectId'),
                           "clientId" : client._id,
                           "walletAddress": web3.personal.newAccount("123456") };

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
                    body: 'Erro ao salvar o projeto.' + exception
            }
          }
        }else{
          return {statusCode: 404,body: 'Token Inválido'};
        }

        return {};
      }
    }
  });

  Api.addRoute('validaToken',{
    get: {
      action: function() {

        var token = this.queryParams.token;
        console.log(token);

        client = Clients.findOne({'token': token});
        console.log(client);
        if(client){
          return client;
        }else{
          return {};
        }
      }
    },
    post: {
      action: function(){
        token = this.bodyParams.token;
        console.log(token);

        var teste = this.bodyParams.teste;
        console.log(teste);

        var name = this.bodyParams.name;
        console.log(name);
        return {"msg":"Deu Certo !!!"};
      }
    }

  });
}
