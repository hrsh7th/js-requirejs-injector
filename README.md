# inject.

## description.

dependency injection for requirejs.


## usage.

```javascript:module1.js
define([], function () {

  return {
    name: 'module1'
  };

});
```

```javascript:runner.js
asyncTest(function () {
  inject('module1', function () {
    return {
      name: 'injected-module1'
    };
  }).
  require(['module1'], function (module1) {
    ok(module1.name === 'injected-module1'); // module1 injected!
  });
});
```

