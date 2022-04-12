const express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var soap = require('soap');
var bodyParser = require('body-parser');
const app = express();
app.use(express.json());
const port = process.env.PORT || 8082;

var serviceObj = {
  TempConverterEndpointService: {
    TempConverterEndpointPort: {
      CelsiusToFahrenheit : function(args) {
              var n = (args.celsius*1.8)+32;
              return { fahrenheit : n };
          }
      }
  }
}
var xml = require('fs').readFileSync('wscalc.wsdl', 'utf8');

var server = app.listen(port, ()=>{  
  var host = '127.0.0.1',
  port = server.address().port;
  console.log(`Listening on port: ${port}`);
});
soap.listen(server,'/wsdl', serviceObj, xml)

app.get('/', (req, res) => res.send(`Computação em Larga Escala/2022.1 UFF. \n Para consultar um cep vá até localhost:${port}/consulta/seucep`));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
