module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json')

    ,banner: '/*!\n <%= pkg.title || pkg.name %> - v<%= pkg.version %> - '
      + '<%= grunt.template.today("yyyy-mm-dd") %>\n'
      + ' Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n*/\n'

    ,concat: {
      options:{
        banner: '<%= banner %>'
      }
      ,dist: {
        src: ['src/collection-validation.js']
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
            ,'./src/collection-validation-simple.js'
          ]
        }
        ,src: 'test/**/*.js'
      }
    }

  })

  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-mocha-test')

  grunt.registerTask('default', ['mochaTest', 'concat'])

}