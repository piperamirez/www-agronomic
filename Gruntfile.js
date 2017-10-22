module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Copy web assets from bower_components to more convenient directories.
    copy: {
      main: {
        files: [
          // Vendor scripts.
          {
            expand: true,
            cwd: 'bower_components/bootstrap-sass/assets/javascripts/',
            src: ['**/*.js'],
            dest: 'www/js/bootstrap-sass/'
          },
          {
            expand: true,
            cwd: 'bower_components/jquery/dist/',
            src: ['**/*.js', '**/*.map'],
            dest: 'www/js/jquery/'
          },

          // Fonts.
          {
            expand: true,
            filter: 'isFile',
            flatten: true,
            cwd: 'bower_components/',
            src: ['bootstrap-sass/assets/fonts/**'],
            dest: 'www/fonts/'
          },

          // Stylesheets
          {
            expand: true,
            cwd: 'bower_components/bootstrap-sass/assets/stylesheets/',
            src: ['**/*.scss'],
            dest: 'scss/'
          }
        ]
      },
    },

    // Compile SASS files into minified CSS.
    sass: {
      options: {
        includePaths: ['bower_components/bootstrap-sass/assets/stylesheets'],
        livereload: true
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'www/css/bootstrap-agronomic.css': 'scss/app.scss'
        }
      }
    },

    // Watch these files and notify of changes.
    watch: {
      options: {
        livereload: true
      },
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: [
          'scss/**/*.scss'
        ],
        tasks: ['sass']
      },

      html: {
        files: [
          'www/*.html'
        ]
      }
    },

    connect: {
      server: {
        options: {
          address: '0.0.0.0',
          port: 9000,
          base: 'www'
        }
      }
    }
  });

  // Load externally defined tasks.
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Establish tasks we can run from the terminal.
  grunt.registerTask('build', ['sass', 'copy']);
  grunt.registerTask('default', ['build', 'watch']);
  grunt.registerTask('serve', ['build', 'connect', 'watch']);
  grunt.registerTask('heroku', ['build']);
}
