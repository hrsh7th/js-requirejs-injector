/*global test:false, ok:false */

(function() {
  'use strict';

  /**
   * inject(path, factory).require([path], function(path) {
   * });
   */
  asyncTest('Injectable Module.', function() {
    var ctx = injector();

    // inject Module1.
    ctx.inject('mock/Module1', (function() {

      function InjectedModule1() {}

      InjectedModule1.id = 'InjectedModule1';

      return InjectedModule1;

    })());

    // require on injected context.
    ctx.require(['mock/Module1'], function(Module1) {
      ok(Module1.id === 'InjectedModule1', Module1.id);
      start();
    });
  });

  /**
   * inject(path, factory).require([otherpath], function(otherpath) {
   * });
   */
  asyncTest('Injectable Nested Module.', function() {
    var ctx = injector();

    // inject Module1.
    ctx.inject('mock/Module1', (function() {

      function InjectedModule1() {}

      InjectedModule1.id = 'InjectedModule1';

      return InjectedModule1;

    })());

    // require on injected context.
    ctx.require(['mock/Module2'], function(Module2) {
      ok(Module2.deps.Module1.id === 'InjectedModule1', Module2.deps.Module1.id);
      start();
    });
  });

  /**
   * inject(path, factory).require([], function() {
   *   require();
   * });
   */
  asyncTest('Injected Require with Standard Require.', function() {
    var ctx = injector();

    // inject Module1.
    ctx.inject('mock/Module1', (function() {

      function InjectedModule1() {}

      InjectedModule1.id = 'InjectedModule1';

      return InjectedModule1;

    })());

    // require on injected context.
    ctx.require(['mock/Module1'], function(Module1) {
      require(['mock/Module2'], function(Module2) {
        ok(Module2.deps.Module1.id === 'Module1', Module2.deps.Module1.id);
        start();
      });
    });
  });

  /**
   * inject(path, factory).require(['require'], function(require) {
   * });
   */
  asyncTest('Injected Require with Injected Require.', function() {
    var ctx = injector();

    // inject Module1.
    ctx.inject('mock/Module1', (function() {

      function InjectedModule1() {}

      InjectedModule1.id = 'InjectedModule1';

      return InjectedModule1;

    })());

    // require on injected context.
    ctx.require(['require', 'mock/Module1'], function(require, Module1) {
      /* Override require function. */
      require(['mock/Module2'], function(Module2) {
        ok(Module2.deps.Module1.id === 'InjectedModule1', Module2.deps.Module1.id);
        start();
      });
    });
  });

  /**
   * inject(path1, factory).inject(path2, factory)...require([path], function(path1) {
   * });
   */
  asyncTest('Chainable Inject Call.', function() {
    var ctx = injector();

    // inject Module1.
    ctx.inject('mock/Module1', (function() {

      function InjectedModule1() {}

      InjectedModule1.id = 'InjectedModule1';

      return InjectedModule1;

    })());

    // inject Module2.
    ctx.inject('mock/Module2', (function() {

      function InjectedModule2() {}

      InjectedModule2.id = 'InjectedModule2';

      return InjectedModule2;

    })());

    // require on injected context.
    ctx.require(['mock/Module1', 'mock/Module2'], function(Module1, Module2) {
      ok(Module1.id === 'InjectedModule1', Module1.id);
      ok(Module2.id === 'InjectedModule2', Module2.id);
      start();
    });
  });

}());

