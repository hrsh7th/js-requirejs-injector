/*! requirejs-injector - v0.0.2 - 2014-10-17
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

    this.req = require.config(extend({}, require.s.contexts._.config, { context: this.context }));
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

  function extend(newObject, baseObject, override) {
    override = override ? override : {};

    var key;
    for (key in baseObject) {
      if (baseObject.hasOwnProperty(key) && !newObject.hasOwnProperty(key)) {
        newObject[key] = baseObject[key];
      }
    }
    for (key in override) {
      if (override.hasOwnProperty(key)) {
        newObject[key] = override[key];
      }
    }
    return newObject;
  }

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

