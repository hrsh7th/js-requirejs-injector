define(function (require) {

  'use strict';

  function Module1() {}

  Module1.id = 'Module1';

  if (!define.Module1LoadCount) {
    define.Module1LoadCount = 0;
  }
  define.Module1LoadCount++;

  return Module1;

});

