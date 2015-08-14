module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        report: 'gzip'
      },
      dist: {
        files: {
          'dist/anzeixer.min.js': ['src/anzeixer.js']
        }
      }
    },

    jshint: {
      options: {jshintrc: '.jshintrc'},
      all: ['Gruntfile.js', 'src/**/*.js']
    },

    copy: {
      demo: {
        src: 'dist/anzeixer.min.js',
        dest: 'demo/js/anzeixer.js',
      },
      dist: {
        src: 'src/anzeixer.js',
        dest: 'dist/anzeixer.js',
      }
    },
    
    sass: {
      options: {
        sourceMap: true,
        outputStyle: 'compressed'
      },
      dist: {
        files: {
          'demo/css/styles.css': 'demo/styles/styles.scss'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('default', ['sass', 'jshint', 'uglify', 'copy']);
  grunt.registerTask('build', ['sass', 'jshint', 'uglify', 'copy']);

};