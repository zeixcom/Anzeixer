
module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			main: {
				src: ['src/anzeixer.js', 'src/script.js'],
				dest: 'dist/anzeixer.js'
			}
		},

		uglify: {
			options: {
				// the banner is inserted at the top of the output
				banner: '/*! <%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
				report: 'gzip'
			},
			dist: {
				files: {
					'dist/anzeixer.min.js': ['<%= concat.main.dest %>']
				}
			}
		},

		jshint: {
			all: ['Gruntfile.js', 'src/**/*.js']
		},

		copy: {
			main: {
				src: 'src/*',
				dest: 'demo/js/',
			},
		},
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['jshint','concat', 'uglify', 'copy']);
	grunt.registerTask('build', ['jshint','concat', 'uglify', 'copy']);

};