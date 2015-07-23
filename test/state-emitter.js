'use strict';

var sinon = require('sinon');
var StateEmitter = require('../');

describe('StateEmitter', function() {
  it('calls handler with correct arguments', function() {
    var emitter = new StateEmitter();
    var handler = sinon.spy();
    emitter.once('ready', handler);
    emitter.emit('ready', 23, 43);

    expect(handler.calledWithExactly(23, 43)).to.be.true;
  });

  it('calls handlers in correct order with correct arguments', function() {
    var emitter = new StateEmitter();
    var handler1 = sinon.spy();
    var handler2 = sinon.spy();
    emitter.once('ready', handler1);
    emitter.once('ready', handler2);
    emitter.emit('ready', 23, 43);

    sinon.assert.callOrder(handler1, handler2);
    expect(handler1.calledWithExactly(23, 43)).to.be.true;
    expect(handler2.calledWithExactly(23, 43)).to.be.true;
  });

  it('calls handler immediately if the state was already changed', function() {
    var emitter = new StateEmitter();
    var handler = sinon.spy();
    emitter.emit('ready', 23, 43);
    emitter.once('ready', handler);

    expect(handler.calledWithExactly(23, 43)).to.be.true;
  });
});
