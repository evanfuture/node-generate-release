// Generated by CoffeeScript 1.12.7

/*
  Generate Release
  Kevin Gravier
  MIT License
 */

(function() {
  var Inquirer, informational_message;

  Inquirer = require('inquirer');

  informational_message = '# Please write your release message above\n#\n# Any line which starts with "#" will be ignored.';

  module.exports = function(new_version) {
    var args;
    args = {
      type: 'editor',
      name: 'message',
      message: 'Please write a release message.',
      "default": "Release " + new_version + "\n\n\n" + informational_message,
      filter: function(result) {
        return result.replace(/^#.*$/gm, '').replace(/\n+$/g, '');
      },
      validate: function(result) {
        if (result.length === 0) {
          return 'Release message can not be empty.';
        } else {
          return true;
        }
      }
    };
    return Inquirer.prompt(args).then(function(result) {
      return result.message;
    });
  };

}).call(this);
