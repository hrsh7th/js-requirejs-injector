(function (global, factory) {
  'use strict';

  global.injector = factory(global);
}(this, function (global) {
  'use strict';

  var context = 'inject_' + Math.floor(Math.random() * 1000) + '_';
  var injectCount = 0;
  var contextMap = {};
  var namedModuleMap = {};

  /**
   * overrideDefineFunction.
   */
  (function overrideDefineFunction() {
    var originalDefine = global.define;

    global.define = function(name, deps, callback) {
      if (typeof name === 'string') {
        namedModuleMap[name] = [name, deps, callback];
        for (var key in contextMap) {
          if (contextMap.hasOwnProperty(key)) {
            require.s.contexts[key].defQueue.push([name, deps, callback]);
          }
        }
      }
      originalDefine(name, deps, callback);
    };
  })();

  /**
   * Injector.
   */
  function Injector() {
    this.context = contextMap[context + injectCount++] = context + injectCount++;

    this.req = require.config(extend({}, require.s.contexts._.config, { context: this.context }));
    this.defined = require.s.contexts[this.context].defined;
    this.defQueue = require.s.contexts[this.context].defQueue;

    for (var key in namedModuleMap) {
      if (namedModuleMap.hasOwnProperty(key)) {
        this.defQueue.push(namedModuleMap[key]);
      }
    }

    this.inject = bind(this.inject, this);
    this.uninject = bind(this.uninject, this);
    this.require = bind(this.require, this);
    this.require.inject = this.inject;
    this.require.uninject = this.uninject;
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

  /**
   * extend.
   */
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

  /**
   * bind.
   */
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
  };

}));

