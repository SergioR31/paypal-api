var express = require('express');
var router = express.Router();

/* POST variables to '/pago' and render view 'pago'. */
router.post('/pago', function(req, res, next) {

  var precio = req.body.precio;
  var curso = req.body.curso;

  res.render('pago', { title: 'PayPal API', precio: precio, curso: curso });
});

module.exports = router;