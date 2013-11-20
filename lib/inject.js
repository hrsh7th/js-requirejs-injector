(function (root, factory) {
  'use strict';

  root.inject = factory();
}(this, function () {
  'use strict';

  var
    context = 'inject_' + Math.floor(Math.random() * 1000) + '_',
    injectCount = 0;

  function inject(name, factory) {
    if (
      !require ||
      !require.s ||
      !require.s.contexts ||
      !require.s.contexts._
    ) {
      throw new Error('`require` is not found.');
    }

    function Injector(name, factory) {
      this.context = context + injectCount++;
      this.req = require.config({ context: this.context });
      this.defined = require.s.contexts[this.context].defined;
      this.inject(name, factory);
    }

    Injector.prototype.require = function (deps, callback) {
      this.req(deps, callback);
    };

    Injector.prototype.inject = function (name, factory) {
      this.defined[name] = factory();
      return this;
    };

    return new Injector(
      name,
      factory
    );
  }

  return inject;
}));

