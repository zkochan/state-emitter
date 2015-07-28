'use strict';

function StateEmitter() {
  this._stateCallbacks = {};
  this._stateArguments = {};
}

StateEmitter.prototype.once = function(state, cb) {
  if (!state || typeof state !== 'string') {
    throw new Error('state is required and has to be a string');
  }
  if (!cb || typeof cb !== 'function') {
    throw new Error('cb is required and has to be a function');
  }

  if (this._stateArguments[state]) {
    cb.apply(this, this._stateArguments[state]);
    return;
  }

  if (!this._stateCallbacks[state]) {
    this._stateCallbacks[state] = [];
  }

  this._stateCallbacks[state].push(cb);
};

StateEmitter.prototype.emit = function(state) {
  if (!state || typeof state !== 'string') {
    throw new Error('state is required and has to be a string');
  }

  this._stateArguments[state] = Array.prototype.slice.call(arguments, 1);

  while(this._stateCallbacks[state] && this._stateCallbacks[state].length) {
    var cb = this._stateCallbacks[state].shift();
    cb.apply(this, this._stateArguments[state]);
  }
};

module.exports = StateEmitter;
