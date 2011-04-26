var assert = require('assert')
  , jellyfish = require('jellyfish');

var done = [];

var test = function(b) {
  b.go("http://www.google.com")
    .js("document.title", function(o) {
      assert.equal(o.result,"Google");
    })
    .user("type", { query:'input[name="q"]', text:'jellyfish'}, function(o) {
      console.log(o.result);
    })
    .js("$jfQ('input[name=\"q\"]')[0].value", function(o) {
      console.log(o.result);
    })
    .user("click", { query:'input[name="btnG"]' }, function(o) {
      console.log(o.result);
    })
    .jsfile("./test.js", function(o) {
      console.log(o.result);
    })
    .jsurl("http://jelly.io/test.js", function(o) {
      console.log(o.result);
      b.stop();
    });
};

var browsers = [];
var url = "http://www.google.com"
browsers.push(jellyfish.createFirefox(url));
browsers.push(jellyfish.createChrome(url));
browsers.push(jellyfish.createZombie(url));
browsers.push(jellyfish.createSafari(url));

browsers.forEach(function(o) {
  test(o);
  o.on('command', function(cmd, args){
   console.log(' \x1b[33m%s\x1b[0m: %s', cmd, args);
  });
  o.on('output', function(cmd, args){
   console.log(' \x1b[33m%s\x1b[0m: %s', cmd, args);
  });
});