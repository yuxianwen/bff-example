(function () {
  var root =
    (typeof self == "object" && self.self === self && self) ||
    (typeof global == "object" && global.global === global && global) ||
    Function("return this")() ||
    {};

  var _ = function (obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function (obj) {
    _.each(_functions(obj), function (name) {
      var func = (_[name] = obj[name]);
      _.prototype[name] = function () {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return chainResult(this, func.apply(_, args));
      };
    });
    return _;
  };

  //   _.mixin(_);

  _.each = function (array, fn) {
    for (let i = 0; i < array.length; i++) {
      fn(array[i], i);
    }
    return array;
  };

  // 函数节流
  // 1.第一次立即执行
  // 2.每隔一段时间执行一次
  // 3.在间隔时间内触发，会在间隔末尾在执行一次

  _.throttle = function (callback, timer) {
    var isFirst = true;
    var firsDate = +new Date();
    var timeId;
    return function () {
      if (isFirst) {
        // 第一次立即执行
        callback();
        isFirst = false;
      } else {
        var currDate = +new Date();
        if (currDate - firsDate >= timer) {
          callback();
          firsDate = currDate;
        } else {
          var waitTime = firsDate + timer - currDate;
          if (timeId) {
            clearTimeout(timeId);
          }
          timeId = setTimeout(function () {
            callback();
            firsDate = +new Date();
          }, waitTime);
        }
      }
    };
  };

  root._ = _;
})();
