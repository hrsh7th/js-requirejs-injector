define(function (require) {

  'use strict';

  var Module1 = require('mock/Module1');

  function Module2() {}

  Module2.id = 'Module2';

  Module2.deps = {
    Module1: Module1
  };

  return Module2;

});

