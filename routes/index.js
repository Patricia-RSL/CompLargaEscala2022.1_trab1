var express = require('express');
var router = express.Router();
const request = require('request');
const soap = require('soap');

/* GET home page. */
router.get('/consulta/:cep', function(req, res, next) {
  var arg = req.params.cep;
  var url = 'https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl'
  soap.createClient(url, function (err, client) {
    client.consultaCEP({cep: arg}, function(err, result) {
        if(err) return console.log(err);
        res.send(result)
    })
  })
});

module.exports = router;
