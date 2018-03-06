var express = require('express');
var router = express.Router();
nodeMailer = require('nodemailer'),

/* POST variables to '/sendMail' and render view 'index'. */
router.post('/sendMail', function(req, res, next) {

    var precio = req.body.precio;
    var curso = req.body.curso;
    var subject = 'Pago del Curso: ' + curso;
    var cliente = req.body.name + ' ' + req.body.lastName;
    var telefonoCliente = req.body.phone;
    var companyCliente = req.body.company;

    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'pago.curso.paypal@gmail.com',
            pass: 'pagocursopaypal'
        }
    });

    let mailOptions = {
        from: 'Cursos Chidos <cursos.chidos@gmail.com>', // sender address
        to: req.body.to, // list of receivers
        subject: subject, // Subject line
        // text: 'Hola, muchas gracias por pagarnos al curso, eso es todo porque nunca te volveremos a contactar ni tu a nosotros. MUAHAHAHA' // plain text body
        html: '<h1>Gracias '+ cliente +' por tu pago de $' + precio + '.00</h1><br><br><h2>A partir de ahora ya no nos comunicaremos contigo porque te acabamos de estafar MUAHAHAHA</h2><br><br><h3>Por cierto tambien tenemos tu numero de telefono: '+telefonoCliente+', que lo venderemos a las compañias publicitarias</h3><br><h3>Y le avisaremos a su compñia "'+companyCliente+'" que es un criminal muy peligroso para que lo despidan.</h3><p>Por su atencion muchas gracias. :)</p>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }else{
            res.send(!error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        
        });
  });
  
  module.exports = router;