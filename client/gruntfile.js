module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.initConfig({
    /*
    uglify: {
      my_target: {
        options: {
          mangle: false
        },
        files: [{
            expand : true,
            cwd    : './src',
            src    :  ***.js,
            dest   : build/
        }] //files
      } //my_target
    }, //uglify*/
    compass: {
      dev: {
        options: {
          config: 'compass_config.rb'
        } //options
      }, //dev
      foundation: {
        options: {
          config: 'compass_foundation_config.rb'
        } //options
      } //foundation

    }, //compass
    watch: {
      options: { livereload: true },
      scripts: {
        files: [
                  'src/*.js',
                  'src/components/home/*.js',
                  'src/components/dashboard/*.js',
                  'src/components/profile/*.js',
                  'src/components/upload/*.js'
                ],
        //tasks: ['clean','uglify'],
        //tasks: ['copy']
      }, //script
      sass: {
        files: [
                  'src/components/home/home.scss',
                  'src/components/dashboard/dashboard.scss',
                  'src/components/profile/profile.scss',
                  'src/components/upload/upload.scss'
                ],
        tasks: [
                  'compass:dev',
                ]
      }, //sass
      sass_foundation: {
        files: [
                  'src/assets/vendor/foundation/scss/foundation.scss',
                  'src/assets/vendor/foundation/scss/foundation/*.scss',
                  'src/assets/vendor/foundation/scss/foundation/components/*.scss'
                ],
        tasks: ['compass:foundation']
      }, //sass_foundation
      html: {
        files: [
                  'src/*.html',
                  'src/components/home/home.html',
                  'src/components/dashboard/dashboard.html',
                  'src/components/profile/profile.html',
                  'src/components/upload/upload.html',
                  'src/shared/directives/*.html', 
                  'src/partials/*.html'
                ]
      }
    }, //watch
    express: {
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          script: 'server.js'
        }
      }
  }
  }) //initConfig
  grunt.registerTask('default', ['express:dev', 'watch']);
} //exports