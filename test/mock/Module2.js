define(['mock/Module1'], function (Module1) {

  'use strict';

  function Module2() {}

  Module2.id = 'Module2';

  Module2.deps = {
    Module1: Module1
  };

  return Module2;

});

