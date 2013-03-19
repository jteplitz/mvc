(function(){
  "use strict";

  var base = require("./base.js"),
      ViewClass = require("../views/Test.js"),

      TestCtrl, _ptype;

  TestCtrl = function(){
    this.payload = {title: ""};
    this._view   = new ViewClass();
  };

  _ptype = TestCtrl.prototype = base.getProto("std");
  _ptype._name = "Test";

  module.exports = TestCtrl;
}());
