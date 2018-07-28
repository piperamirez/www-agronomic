module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

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
  })

  // Load externally defined tasks.
  grunt.loadNpmTasks('grunt-sass')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-connect')

  // Establish tasks we can run from the terminal.
  grunt.registerTask('build', [])
  grunt.registerTask('default', ['build', 'watch'])
  grunt.registerTask('serve', ['build', 'connect', 'watch'])
  grunt.registerTask('heroku', ['build'])
}
