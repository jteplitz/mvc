#!/usr/bin/env node
(function(){
 "use strict";

  var nconf  = require("nconf"),
      fs     = require("fs"),
      async  = require("async"),
      _      = require("underscore"),
      ejs    = require("ejs"),

      routeInfo = {},

      // functions
      getData, capitalize,
      createFile;

  getData = function(){
    nconf.argv({
      "r": {
        alias: "route",
        describe: "The route's path",
        demand: true
      },
      "n": {
        alias: "name",
        describe: "The route's name",
        demand: true
      },
      "m": {
        alias: "methods",
        describe: "A comma seperated list of accepted methods. No spaces",
        demand: true
      }
    });

    routeInfo = {
      name: nconf.get("name"),
      route: nconf.get("route"),
      methods: nconf.get("methods")
    };

    routeInfo.methods = routeInfo.methods.split(",");

    async.parallel([
      createFile(__dirname + "/../templates/route.ejs", "./routes/" + capitalize(routeInfo.name) + ".js"),
      createFile(__dirname + "/../templates/controller.ejs", "./controllers/" + capitalize(routeInfo.name) + ".js"),
      createFile(__dirname + "/../templates/view.ejs", "./views/" + capitalize(routeInfo.name) + ".js")
    ], function(err, data){
      if (err){
        console.log("Error creating files", err);
        return process.exit(0);
      }

      console.log("success");
      return process.exit(0);
    });
  };

  createFile = function(template, path){
    return function(cb){
      var file = fs.readFileSync(template, "utf8");

      file = ejs.render(file, {locals: routeInfo});

      fs.writeFileSync(path, file);
      cb();
    };
  };

  // capitilizes the first letter in a string
  capitalize = function(string){
    string    = string.split("");
    string[0] = string[0].toUpperCase();
    string    = string.join("");
    return string;
  };

  prompt.start();
  getData();
}());
