var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var fs = require('fs');

var app = express();


///////////////////////////////////////////////////////////////////////////////////////////////
//
// This defines the template engine
// TODO: implement as an external module similar to jade?
/*
app.engine('jst', function (filePath, options, callback) {
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(new Error(err));

    var PureJS = (function () {

      // TODO: complete support of html5 tags
      var elements = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "div", "ul", "li", "a", "html", "head", "title", "body"];
      var selfClosingElements = ["br", "hr", "img"];

      // TODO: declare 'locals' inside the options object as vars here,
      // so that they can be used by the template engine?

      function generateElements(elements) {
        for (var i = 0; i < elements.length; i++) {
          global[elements[i]] = elementFactory(elements[i]);
        }
      }

      generateElements(elements.concat(selfClosingElements));

      function elementFactory(elementType) {

        var initialize = function() {
          var args = Array.prototype.slice.call(arguments);

          var str = openTag(elementType, args);
          if (!selfClosingElements.contains(elementType)) {
            str += tagBody(args);
            str += endTag(elementType);
          }
          return str;
        }

        function openTag(elementType, args) {
          var str = "<" + elementType;
          if (isObjLiteral(args[0])) {
            str += processAttributes(args.shift());
          }
          str += ">";
          return str;
        }

        function tagBody(args) {
          var str = "";
          for (var i = 0; i < args.length; ++i) {
            str += args[i];
          }
          return str;
        }

        function endTag(elementType) {
          return "</" + elementType + ">";
        }

        function processAttributes(attributes) {
          var attributesStr = " ";

          // <type id="some_id" class="class_name1 class_name2">
          for (var key in attributes) {
            if (attributes.hasOwnProperty(key)) {
              attributesStr += key + "='" + attributes[key] + "'";
            }
          }

          return attributesStr;
        }

        return initialize;

      }

      function isObjLiteral(_obj) {
        var _test = _obj;
        return (typeof _obj !== 'object' || _obj === null ?
          false :
          (
            (function() {
              while (!false) {
                if (Object.getPrototypeOf(_test = Object.getPrototypeOf(_test)) === null) {
                  break;
                }
              }
              return Object.getPrototypeOf(_obj) === _test;
            })()
          )
        );
      }

      Array.prototype.contains = function(obj) {
        var i = this.length;
        while (i--) {
          if (this[i] == obj) {
            return true;
          }
        }
        return false;
      }

    })();

    var rendered = eval(content.toString()).toString();

    return callback(null, rendered);
  })
});
*/
app.engine('jst', require('just')); //.__express removed
//
///////////////////////////////////////////////////////////////////////////////////////////////

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// register the template engine
// replace jade with jst!
// app.set('view engine', 'jade');
app.set('view engine', 'jst');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
})
//app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
