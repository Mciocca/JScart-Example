module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'nested'
        },
        files: {
          'public/stylesheets/css/app.css': 'public/stylesheets/sass/app.scss'
        }        
      }
    },
      
    cssmin: {
      minify: {
        src: 'public/stylesheets/css/app.css',
        dest: 'public/stylesheets/css/app.min.css'
      }
    },

    watch: {
      css:{
        files: ['public/stylesheets/sass/*.scss'],
        tasks: ['sass', 'cssmin']
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('build', ['sass']);
  grunt.registerTask('default', ['build','watch','cssmin']);
}