(function(){
  "use strict";
  
  var base = require("./base.js");


  var TestView, _ptype;

  TestView = function(){};

  _ptype = TestView.prototype = base.getProto("std");
  _ptype._view_name = "TestView";
  _ptype._template  = "Test.jade";

  module.exports = TestView;
}());
