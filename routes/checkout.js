var express = require('express');
var router = express.Router();
var braintree = require('braintree');

router.post('/', function(req, res, next) {
  var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: 'dgcp86fqrbmb2ddw',
    publicKey: 'jn5kgpzj3pmws4vh',
    privateKey: '454c78d076815a2659a8dc63c0c87365'
  });

  // Use the payment method nonce here
  var nonceFromTheClient = req.body.paymentMethodNonce;

  //Get the value from amount
  var precio = req.body.amount;

  // var nombre = req.body.name;
  // var apellido = req.body.lastName;
  // var compania = req.body.company;
  // var telefono = req.body.phone;
  // var mail = req.body.email;
  // var calle = req.body.calle;
  // var municipio = req.body.municipio;
  // var colonia = req.body.colonia;
  // var estado = req.body.estado;
  // var codigoPostal = req.body.codigo-postal;

  // Create a new transaction for $10
  var newTransaction = gateway.transaction.sale({
    amount: precio,

    // customer: {
    //   firstName: nombre,
    //   lastName:  apellido,
    //   company: compania,
    //   phone: telefono,
    //   email: mail
    // },
    
    // billing: {
    //   firstName: nombre,
    //   lastName: apellido,
    //   company: compania,
    //   streetAddress: calle,
    //   extendedAddress: municipio,
    //   locality:colonia,
    //   region: estado,
    //   postalCode: codigoPostal,
    //   countryCodeAlpha2: "MX"
    // },

    paymentMethodNonce: nonceFromTheClient,
    options: {
      // This option requests the funds from the transaction
      // once it has been authorized successfully
      submitForSettlement: true
    }
  }, function(error, result) {
      if (result) {
        res.send(result);
      } else {
        res.status(500).send(error);
      }
  });
});

module.exports = router;