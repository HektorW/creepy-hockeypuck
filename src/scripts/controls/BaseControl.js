
import EventEmitter from 'EventEmitter';

class BaseControl {
  constructor() {
    this.pressedDuration = {};
    this.lastPressedDuration = {};

    this.game = null;
  },

  init(game) {
    this.game = game;
  }

  update() {
    for (let key in this.pressedDuration) {
      this.lastPressedDuration[key] = this.pressedDuration[key];
    }
  }


  // return true if buttons is currently down
  isButtonDown(btn) {
    return this.pressedDuration[btn] > 0.0;
  },

  isButtonDownLast(btn) {
    return this.lastPressedDuration[btn] > 0.0;
  },

  // return true if button is up but was down last frame
  isButtonPressed(btn) {
    return !this.isButtonDown(btn) && this.isButtonDownLast(btn);
  },

  buttonDownDuration(btn) {
    var t = this.pressedDuration[btn];
    return t > 0.0 ? performance.now() - t : 0.0;
  }
}

Object.assign(BaseControl.prototype, EventEmitter);

export default BaseControl;
