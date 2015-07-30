'use strict';

var STATE_IS_REQUIRED = 'state is required and has to be a string';

function StateEmitter() {
  this._stateCallbacks = {};
  this._stateArguments = {};
}

/**
 * Adds a listener to a state.
 * @function
 * @param {String} state - the name of the state to listen to.
 * @param {Function} cb - the function to call if the state was switched on.
 **/
StateEmitter.prototype.once = function(state, cb) {
  if (!state || typeof state !== 'string') {
    throw new Error(STATE_IS_REQUIRED);
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

/**
 * Switches a state on.
 * @function
 * @param {String} state - the name of the state to switch on.
 * @param {...*} args - the arguments to pass to the state listeners.
 **/
StateEmitter.prototype.state = function(state) {
  if (!state || typeof state !== 'string') {
    throw new Error(STATE_IS_REQUIRED);
  }

  this._stateArguments[state] = Array.prototype.slice.call(arguments, 1);

  while(this._stateCallbacks[state] && this._stateCallbacks[state].length) {
    var cb = this._stateCallbacks[state].shift();
    cb.apply(this, this._stateArguments[state]);
  }
};

/**
 * Returns the arguments of a state if the state is active or undefined if the
 * state is not active.
 * @function
 * @param {String} state - the name of the state.
 * @return {Array} args - the arguments of the state.
 **/
StateEmitter.prototype.getState = function(state) {
  if (!state || typeof state !== 'string') {
    throw new Error(STATE_IS_REQUIRED);
  }

  return this._stateArguments[state];
};

module.exports = StateEmitter;
