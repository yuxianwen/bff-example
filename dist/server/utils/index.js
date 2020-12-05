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

  _.each = function (array, fn) {
    for (let i = 0; i < array.length; i++) {
      fn(array[i], i);
    }
    return array;
  };
  root._ = _;
})();
