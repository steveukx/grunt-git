module.exports = function(grunt) {

   'use strict';

   var Git = require('simple-git');

   grunt.registerMultiTask('git', 'release preparation', function() {

      var options = this.options({
         message: "Committing file"
      });

      var target = this.target;
      var done = this.async();

      var allFiles = [];

      var listAllFiles = function(files) {
         files.forEach(function(file) {
            if (file.src && Array.isArray(file.src)) {
               listAllFiles(file.src);
            }
            else {
               allFiles.push(file);
            }
         });
      };

      listAllFiles(this.files);

      new Git()
          .add(allFiles)
          .commit(options.message, allFiles, function(err, result) {
             grunt.log.write(command);
             done(!err);
          });
   });
};
