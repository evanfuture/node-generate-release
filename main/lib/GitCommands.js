// Generated by CoffeeScript 1.12.5

/*
  Generate Release
  Kevin Gravier
  MIT License
 */

(function() {
  var AVH_EDITION_REGEX, ChildProcess, FS, GIT_CLEAN_REGEX, GitCommands, Temp, env,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    slice = [].slice;

  FS = require('fs');

  ChildProcess = require('child_process');

  Temp = require('temp');

  env = process.env;

  env.GIT_MERGE_AUTOEDIT = 'no';

  GIT_CLEAN_REGEX = /^nothing to commit,? \(?working (directory|tree) clean\)?$/m;

  AVH_EDITION_REGEX = /AVH Edition/;

  GitCommands = (function() {
    GitCommands.checkForCleanWorkingDirectory = function() {
      var status_result;
      status_result = ChildProcess.execSync('git status', {
        env: env
      });
      if (!GIT_CLEAN_REGEX.test(status_result.toString())) {
        throw new Error('Working directory is not clean, not ready for release');
      }
    };

    GitCommands.isAvhEdition = function() {
      var version_result;
      version_result = ChildProcess.execSync('git flow version', {
        env: env
      });
      return AVH_EDITION_REGEX.test(version_result);
    };

    GitCommands.prototype.master_branch = 'master';

    GitCommands.prototype.develop_branch = 'develop';

    GitCommands.prototype.release_branch = void 0;

    GitCommands.prototype.remote = 'origin';

    GitCommands.prototype.current_version = void 0;

    GitCommands.prototype.next_version = void 0;

    GitCommands.prototype.release_message = void 0;

    GitCommands.prototype.skip_git_flow_finish = false;

    GitCommands.prototype.is_avh = false;

    function GitCommands(opts) {
      this.finishAvh = bind(this.finishAvh, this);
      this.finishNonAvh = bind(this.finishNonAvh, this);
      this.finish = bind(this.finish, this);
      this.commit = bind(this.commit, this);
      this.addDeletedFiles = bind(this.addDeletedFiles, this);
      this.start = bind(this.start, this);
      this.reset = bind(this.reset, this);
      this.push = bind(this.push, this);
      this.pull = bind(this.pull, this);
      if (opts.master_branch != null) {
        this.master_branch = opts.master_branch;
      }
      if (opts.develop_branch != null) {
        this.develop_branch = opts.develop_branch;
      }
      if (opts.current_version != null) {
        this.current_version = opts.current_version;
      }
      if (opts.next_version != null) {
        this.next_version = opts.next_version;
      }
      if (opts.release_message != null) {
        this.release_message = opts.release_message;
      }
      if (opts.remote != null) {
        this.remote = opts.remote;
      }
      if (opts.skip_git_flow_finish != null) {
        this.skip_git_flow_finish = opts.skip_git_flow_finish;
      }
      this.release_branch = "release/" + this.next_version;
      this.is_avh = GitCommands.isAvhEdition();
      if (!this.current_version) {
        throw new Error('Current Version is not set');
      }
      if (!this.next_version) {
        throw new Error('New Version is not set');
      }
    }

    GitCommands.prototype.git = function() {
      var args, result;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      result = ChildProcess.spawnSync('git', args, {
        env: env,
        stdio: 'pipe'
      });
      if (result.status !== 0) {
        throw new Error("git " + (args.join(' ')) + " returned " + result.status + ". \n\n Output: \n\n " + result.stderr);
      }
      if (result.stdout) {
        return result.stdout.toString();
      } else {
        return '';
      }
    };

    GitCommands.prototype.pull = function() {
      this.git('fetch', this.remote);
      this.git('checkout', this.develop_branch);
      this.git('pull', this.remote, this.develop_branch, '--rebase');
      this.git('checkout', this.master_branch);
      return this.git('reset', '--hard', this.remote + "/" + this.master_branch);
    };

    GitCommands.prototype.push = function() {
      if (!this.skip_git_flow_finish) {
        this.git('push', this.remote, this.develop_branch);
        this.git('push', this.remote, this.master_branch);
        return this.git('push', this.remote, '--tags');
      } else {
        return this.git('push', '-u', this.remote, this.release_branch);
      }
    };

    GitCommands.prototype.reset = function() {
      this.git('checkout', this.develop_branch);
      this.git('reset', '--hard', 'HEAD');
      return this.git('branch', '-D', "release/" + this.next_version);
    };

    GitCommands.prototype.start = function() {
      this.git('checkout', this.develop_branch);
      return this.git('flow', 'release', 'start', this.next_version);
    };

    GitCommands.prototype.addDeletedFiles = function() {
      var file, files, i, len, results;
      files = this.git('ls-files', '--deleted').split('\n');
      results = [];
      for (i = 0, len = files.length; i < len; i++) {
        file = files[i];
        if (file !== '') {
          results.push(this.git('rm', '--cached', file));
        }
      }
      return results;
    };

    GitCommands.prototype.commit = function(files) {
      var file, i, len;
      this.addDeletedFiles();
      for (i = 0, len = files.length; i < len; i++) {
        file = files[i];
        this.git('add', file);
      }
      return this.git('commit', '-m', this.release_message);
    };

    GitCommands.prototype.finish = function() {
      if (this.is_avh) {
        return this.finishAvh();
      } else {
        return this.finishNonAvh();
      }
    };

    GitCommands.prototype.finishNonAvh = function() {
      return this.git('flow', 'release', 'finish', '-m', this.release_message, this.next_version);
    };

    GitCommands.prototype.finishAvh = function() {
      var release_message_file;
      release_message_file = Temp.path();
      FS.writeFileSync(release_message_file, this.release_message);
      this.git('flow', 'release', 'finish', '-f', release_message_file, this.next_version);
      return FS.unlinkSync(release_message_file);
    };

    return GitCommands;

  })();

  module.exports = GitCommands;

}).call(this);
