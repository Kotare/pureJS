/*!
 * NoHTML / pure js templating
 */

//TODO:
//-handle elements:
// -both attributes and content <a>, <abbr>,
// -with no closing tag <img>, ..
// -empty elements <br>, ..
// -demonstrate use of control statements: conditionals and loops

// -comments <!-- -->
// -doctype <!doctype html>
// -check space at end of free-standing text,

var elements = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "div", "ul", "li"];
var selfClosingElements = ["br", "hr", "img"];

function generateElements(elements) {
  for (var i = 0; i < elements.length; i++) {
    window[elements[i]] = elementFactory(elements[i]);
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