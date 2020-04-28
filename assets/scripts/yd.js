(function () {

  // 这一段作为兼容的写法，可以去掉
  var root = typeof self == 'object' && self.self === self && self ||
    typeof global == 'object' && global.global === global && global ||
    Function('return this')() ||
    {};
  
    var ArrayProto = Array.prototype, ObjProto = Object.prototype;
    var push = ArrayProto.push

  // 测试  _ 能否被外部访问
  function _(obj) {
    if (!(this instanceof _)) return new _(obj)
    this._wrapped = obj
    // return _  // 必须返回**在之后修改到最底下导出全局属性  _
  }

  // 节流
  _.throttle = function (fn, wait = 500) {
    let timer
    return function (...args) {
      if (timer == null) { // 不能写三个等号,小细节
        // 默认500ms之内，用户多次点击，代码也值执行一次
        timer = setTimeout(()=>{timer = null},wait)
        return fn.apply(this,args)
      }
    }
  }

  _.each = function (obj, callback) {
    if (Array.isArray(obj)) {
      for (let item of obj) {
        callback && callback.call(_,item)
      }
    }
  }

  _.map = function (wrapped, callback) {
    // console.log('map')
    console.log('🍎', wrapped)
    console.log('🍌', callback)
  }

  _.isFunction = function (obj) {
    return typeof obj == 'function' || false;
  };
  _.functions = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  }
 

  // 依据源码模式有两种调用方式：需要混合两种模式
  _.mixin = function (obj) {
    _.each(_.functions(obj), function (name) {
      //        _.xx     = function(){}
      var func = _[name] = obj[name];
      _.prototype[name] = function () {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return func.apply(_, args);
        // return chainResult(this, func.apply(_, args));
      };
    });
    return _;
  }

  // // 把自己混入自己的方法中
  _.mixin(_)

  // 暴露给外部使用的全局属性
  root._ = _

})();