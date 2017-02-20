// Generated by CoffeeScript 1.12.4

/*
  Generate Release
  Kevin Gravier
  MIT License
 */

(function() {
  var HelpError,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  HelpError = (function(superClass) {
    extend(HelpError, superClass);

    function HelpError(post) {
      this.message = "generate-release\n\n-p, --package   FILE            Path to package.json file. Default: ./package.json\n-c, --current-version VERSION   Current Version. Default: read from package.json\n-v, --next-version VERSION      Next Version. Default: automatically bumps\n-t, --release-type TYPE         Release Type: patch, minor, major. Ignored when next-version is given. Default: prompt, if next-version is undefined\n-n, --no-confirm                Do not ask for confirmation. Default: prompt for confirmation\n-l, --skip-git-pull             Do not pull from origin and rebase master and dev. Default: Do pull\n-s, --skip-git-push             Do not push to origin when complete. Default: Do push\n-f, --skip-git-flow-finish      Do not finish git-flow release. Default: Do finish\n-d, --release-file FILE         Path to your .release.json file. Default: ./.release.json\n-o, --remote REMOTE             Change the remote. Default: origin\n-q, --quiet                     Less output. Default: Do show output\n-m, release-message [MESSAGE]   Set a release message. If no message given, prompt for one. Will replace\n                                \"{version}\" with the next version. Default: Release {version}\n" + (post || '');
    }

    return HelpError;

  })(Error);

  module.exports = HelpError;

}).call(this);
