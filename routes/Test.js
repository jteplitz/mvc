(function(){
  "use strict";

  var _ = require("underscore"),
          
          handleGet,
          
          handlePost,
          
          handlePut,
          
          handler, dispatch,

          ControllerClass = require("../controllers/Test.js");

  
  handleGet = function(req, res, next){
    
    var control = new ControllerClass();

    var params = {};

    control.renderView(res, params);
    
  };    
  
  handlePost = function(req, res, next){
    
  };    
  
  handlePut = function(req, res, next){
    
  };    
  

  dispatch = {
    
    GET: handleGet,
    
    POST: handlePost,
    
    PUT: handlePut,
    
  };
  handler = function(req, res, next){
    if (_.has(dispatch, req.method)){
      return dispatch[req.method](req, res, next);
    }

    return next(405);
  };
  
  module.exports = handler;
}());
