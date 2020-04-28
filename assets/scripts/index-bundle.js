System.register([], function (_export, _context) {
  "use strict";

  var data;
  return {
    setters: [],
    execute: function () {
      console.log('zhuwenlong...'); //  new Vue({
      //   el: '#app-5',
      //   data: {
      //     message: 'Hello Vue.js!'
      //   },
      //   methods: {
      //     reverseMessage: function () {
      //       this.message = this.message.split('').reverse().join('')
      //     }
      //   }
      //  })

      data = '定义数据---模块化导出方式';

      _export("default", data);
    }
  };
});
