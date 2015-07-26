
import $ from 'jQuery';

// DEBUG
var _slice = Array.prototype.slice;

// Create $elem
var $elem = $('<div>');
$elem.css({
  position: 'fixed',
  left: '10px',
  top: '10px',
  fontFamily: 'monospace'
});

$elem.attr('id', 'debug');
$(document.body).append($elem);

function DEBUG(id, message) {
  if (message === undefined) {
    message = id;
    id = null;
  }

  if (id) {
    var name = id;
    id = id.replace(' ', '-');
    var $id = $elem.find('#'+id);

    if (!$id.length) {
      var $temp = $('<p>' + name + ': <span id="'+ id + '"></span></p>');
      $elem.append($temp);
      $id = $temp.find('#' + id);
    }

    message = _slice.call(arguments, 1).join(', ');

    $id.html(message);
  } else {
    $elem.append('<p>' + message + '</p>');
  }
}


// Exported function
export default DEBUG;
window.DEBUG = DEBUG;
