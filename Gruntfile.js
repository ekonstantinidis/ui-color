'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    less: {
      options: {
        cleancss: true
      },
      main: {
        files: {
          'build/css/style.css': 'src/less/style.less'
        }
      }
    },

    copy: {
      main: {
        files: [
          {expand: true, cwd: "src/", src: 'index.html', dest: 'build/'},
          {expand: true, cwd: "src/images/", src: '**', dest: 'build/images/'},
          {expand: true, cwd: "node_modules/bootstrap/fonts/", src: '**', dest: 'build/fonts/'},
          {expand: true, cwd: "node_modules/font-awesome/fonts/", src: '**', dest: 'build/fonts/'}
        ]
      }
    },

    watch: {
      less: {
        files: 'src/less/*',
        tasks: ['less'],
      },
      indexAndImages: {
        files: ['src/index.html', 'src/images/*'],
        tasks: ['copy'],
      },
    },

    clean: {
        files: ["build/"]
    },

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['less', 'copy']);
  grunt.registerTask('release', ['clean', 'build']);

};