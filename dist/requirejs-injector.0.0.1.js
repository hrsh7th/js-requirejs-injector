/*! requirejs-injector - v0.0.1 - 2014-10-16
* Copyright (c) 2014 hrsh7th <hrsh7th@gmail.com>; Licensed MIT */
(function (root, factory) {
  'use strict';

  root.injector = factory();
}(this, function () {
  'use strict';

  var
    context = 'inject_' + Math.floor(Math.random() * 1000) + '_',
    injectCount = 0;

  function Injector() {
    this.context = context + injectCount++;
    this.req = require.config({ context: this.context });
    this.defined = require.s.contexts[this.context].defined;

    this.require = bind(this.require, this);
    this.require.inject = bind(this.inject, this);
    this.require.uninject = bind(this.uninject, this);
  }

  Injector.prototype.require = function (deps, callback) {
    this.req(deps, callback);
  };

  Injector.prototype.inject = function (name, object) {
    this.defined[name] = object;
    return this;
  };

  Injector.prototype.uninject = function(name) {
    delete this.defined[name];
    return this;
  };

  function bind(fn, ctx) {
    return function() {
      return fn.apply(ctx, Array.prototype.slice.call(arguments));
    };
  }

  return function() {
    if (
      !require ||
      !require.s ||
      !require.s.contexts ||
      !require.s.contexts._
    ) {
      throw new Error('`require` is not found.');
    }

    return new Injector();
  }
}));

