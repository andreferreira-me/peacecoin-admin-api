let recoverPassword = ( options ) => {
  _validate( options.form, options.template );
};

let _validate = ( form, template ) => {
  $( form ).validate( validation( template ) );
};

let validation = ( template ) => {
  return {
    rules: {
      emailAddress: {
        required: true,
        email: true
      }
    },
    messages: {
      emailAddress: {
        required: 'Você precisa informar um e-mail aqui.',
        email: 'E-mail inválido.'
      }
    },
    submitHandler() { _handleRecovery( template ); }
  };
};

let _handleRecovery = ( template ) => {
  let email = template.find( '[name="emailAddress"]' ).value;

  Accounts.forgotPassword( { email: email }, ( error ) => {
    if ( error ) {
      Bert.alert( error.reason, 'warning' );
    } else {
      Bert.alert( 'Acesse o link enviado para o seu e-mail!', 'success' );
    }
  });
};

Modules.client.recoverPassword = recoverPassword;
