# state-emitter

An emitter that auto-triggers new handlers once a state was switched on.

[![Dependency Status](https://david-dm.org/zkochan/state-emitter/status.svg?style=flat)](https://david-dm.org/zkochan/state-emitter)
[![Build Status](https://travis-ci.org/zkochan/state-emitter.svg?branch=master)](https://travis-ci.org/zkochan/state-emitter)
[![npm version](https://badge.fury.io/js/state-emitter.svg)](http://badge.fury.io/js/state-emitter)


# Installation

```
npm install --save state-emitter
```


## Usage

```js
var StateEmitter = require('state-emitter');

var stateEmitter = new StateEmitter();
stateEmitter.once('ready', function(msg) {
  /* some code on ready */
});

stateEmitter.emit('ready', 'Hello world');

/* this one will be executed immediately because already ready */
stateEmitter.once('ready', function(msg) {
  /* some code on ready */
});
```


## License

MIT
