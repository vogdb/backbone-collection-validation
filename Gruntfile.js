module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json')

    ,banner: '/*!\n <%= pkg.title || pkg.name %> - v<%= pkg.version %> - '
      + '<%= grunt.template.today("yyyy-mm-dd") %>\n'
      + ' Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n'
      + ' Licensed <%= pkg.license %>\n*/\n'

    ,concat: {
      options:{
        banner: '<%= banner %>'
      }
      ,simple: {
        src: ['src/wrappers/prefix.js', 'src/collection-validation-simple.js', 'src/wrappers/suffix.js']
        ,dest: 'dist/<%= pkg.name %>.js'
      }
      ,advanced: {
        src: ['src/wrappers/prefix.js', 'src/collection-validation-advanced.js', 'src/wrappers/suffix.js']
        ,dest: 'dist/<%= pkg.name %>.js'
      }
    }

    ,mochaTest: {
      dist: {
        options: {
          reporter: 'spec'
          ,require: [
            function(){Backbone = require('backbone')}
            ,function(){_ = require('backbone/node_modules/underscore')}
            ,function(){fs = require('fs')}
            ,'./dist/<%= pkg.name %>.js'
          ]
        }
        ,src: 'test/**/*.js'
      }
    }

    ,uglify: {
      options:{
        banner: '<%= banner %>'
      }
      ,dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': 'dist/<%= pkg.name %>.js'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['concat:advanced', 'mochaTest', 'uglify'])

};
