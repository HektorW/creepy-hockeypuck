
import BaseControl from './BaseControl';

var MouseButtons = {
  'left': 0,
  'middle': 1,
  'right': 2
};
var EventCodes = {};
Object.keys(MouseButtons).forEach(key => EventCodes[MouseButtons[key]] = key);


class MouseControl extends BaseControl {

  constructor() {
    this.x = -1;
    this.y = -1;

    this.pressedDuration = {
      'left': 0.0,
      'right': 0.0,
      'middle': 0.0
    };
  }

  // methods
  // __init__: function() {
  //   this.supr();
  //
  //   this.scene = null;
  // },

  // init: function(game) {
    // this.supr(game);
    // this.loadCursor();
    // this.bindEvents();
  // },

  // loadCursor: function() {
  //   this.cursor = new Three.Mesh(
  //     new Three.BoxGeometry(0.7, 0.7, 0.7),
  //     new Three.MeshPhongMaterial({
  //       map: Three.ImageUtils.loadTexture('res/crosshair4.png'),
  //       transparent: true
  //     })
  //   );
  // },
  //
  // setScene: function(scene) {
  //   if (this.scene) {
  //     this.scene.remove(this.cursor);
  //   }
  //
  //   this.scene = scene;
  //   this.scene.add(this.cursor);
  // },

  bindEvents: function() {
    this.$window = $(window);

    _.bindAll(this,
      'mouseup',
      'mousedown',
      'mousemove',
      'contextmenu'
    );

    this.$window
      .on('mouseup', this.mouseup)
      .on('mousedown', this.mousedown)
      .on('mousemove', this.mousemove)
      .on('contextmenu', this.contextmenu);
  },

  mouseup: function(event) {
    event.preventDefault();

    var btn = EventCodes[event.button];
    this.pressedDuration[btn] = 0.0;

    this.x = event.pageX;
    this.y = event.pageY;

    this.trigger('mouse:up', {
      button: btn,
      x: this.x,
      y: this.y
    });
  },
  mousedown: function(event) {
    event.preventDefault();

    var btn = EventCodes[event.button];
    this.pressedDuration[btn] = performance.now();

    this.x = event.pageX;
    this.y = event.pageY;

    this.trigger('mouse:down', {
      button: btn,
      x: this.x,
      y: this.y
    });
  },
  mousemove: function(event) {
    event.preventDefault();

    this.x = event.pageX;
    this.y = event.pageY;

    this.trigger('mouse:move', {
      x: this.x,
      y: this.y
    });
    // this.triggerDirection(event.pageX, event.pageY);
  },
  contextmenu: function(event) {
    event.preventDefault();
  },


  triggerDirection: function(mouseX, mouseY) {
    var ox = this._baseObject.instance.position.x;
    var oy = this._baseObject.instance.position.y;

    ox = window.innerWidth / 2;
    oy = window.innerHeight / 2;

    var v = new Three.Vector2(
      mouseX - ox,
      mouseY - oy
    );
    v.normalize();

    var angle = Math.atan2(v.y, v.x);

    this.trigger('direction', {
      dirX: v.x,
      dirY: v.y,
      angle: angle
    });
  },


  updateCursor: function(camera) {
    var w_coords = camera.screenToWorldPosition(this.x, this.y);

    this.cursor.position.x = w_coords[0];
    this.cursor.position.y = w_coords[1];
  }

}


export MouseButtons;
export default MouseControl;
