'use strict';

var assert = require('node:assert/strict');
var test = require('node:test');

test('registers CSS with the HTML injector instead of modifying post content', function() {
  var filters = [];
  var injections = [];

  global.hexo = {
    extend: {
      filter: {
        register: function(name, callback) {
          filters.push({name: name, callback: callback});
        }
      },
      injector: {
        register: function(entry, value) {
          injections.push({entry: entry, value: value});
        }
      }
    }
  };

  delete require.cache[require.resolve('../index')];
  require('../index');
  delete global.hexo;

  assert.deepEqual(filters.map(function(filter) {
    return filter.name;
  }), ['before_post_render']);
  assert.equal(injections.length, 1);
  assert.equal(injections[0].entry, 'head_end');
  assert.match(injections[0].value, /hint\.min\.css/);
  assert.match(injections[0].value, /list-style:none!important/);
  assert.match(injections[0].value, /@media\(max-width:480px\)/);
});
