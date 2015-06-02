/*!
 * NoHTML / pure js templating
 */

//TODO:
//-handle elements:
// -demonstrate use of control statements: conditionals and loops

// -comments <!-- -->
// -doctype <!doctype html>
// -check space at end of free-standing text,

var PureJS = (function () {

  var elements = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "div", "ul", "li", "a", "html", "head", "title", "body"];
  var selfClosingElements = ["br", "hr", "img"];

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


var x = 1;
var msg = "Hello!"
var collection = ["item1", "item2", "item3"];

var http = require('http');
http.createServer(function (req, res) {
res.writeHead(200, {'Content-Type': 'text/html'});
res.write(
  html(
    head(
      title("PureJS")
    ),
    body(
        h1("This is a h1 header"),
        p("Welcome to NoHTML / pure js templating demo"),

        h2("This is a h2 header"),
        p("This is a paragraph"),

        h2("Using variables within the template"),
        p("The value of x is: " + x),
        p("The value of msg is:" + message),

        div( {class : "anything", id : "div_01"},
          h2("Header inside a div"),
          p("paragraph inside a div"),
          "some free-standing text 1",
          br(),
          "some free-standing text 2"
        ),

        h2("links"),
        a( {href : "http://www.google.com"},
          "Google"
        ),

        h2("static lists"),
        ul(
          li("item 1"),
          li("item 2"),
          li(
            "item 3",
            p("paragraph inside a list"),
            p("paragraph inside a list 2")
          )
        ),

        h2("dynamic lists"),
        ul(
          function() {
            var str = "";
            for (var i = 0; i < collection.length; i++) {
              str += li(collection[i]);
            }
            return str;
          }()
        ),

        img({src : "http://upload.wikimedia.org/wikipedia/commons/9/96/Sacred_kingfisher_nov08.jpg"}),

        h3("This is a h3 header"),
        h4("This is a h4 header"),
        h5("This is a h5 header"),
        h6("This is a h6 header"),
        "some free-standing text"
    )
  )
);
res.end();
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');