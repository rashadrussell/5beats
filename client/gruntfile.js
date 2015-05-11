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
      app: {
        options: {
          config: 'compass_app_config.rb'
        } //options
      }, //app
      components: {
        options: {
          config: 'compass_components_config.rb'
        } //options
      }, //components
      foundation: {
        options: {
          config: 'compass_foundation_config.rb'
        } //options
      }, //foundation
      shared: {
        options: {
          config: 'compass_shared_config.rb'
        } //options
      } //shared

    }, //compass
    watch: {
      options: { livereload: true },
      scripts: {
        files: [
                  'src/**/*.js',
                ],
        //tasks: ['clean','uglify'],
        //tasks: ['copy']
      }, //script
      sass_app: {
        files: [
                  'src/app_scss/*.scss'
                ],
        tasks: [
                  'compass:app',
                  'compass:components',
                  'compass:shared',
                  'compass:foundation'
                ]
      }, //sass_app
      sass_components: {
        files: [
                  'src/components/**/*.scss'
                ],
        tasks: [
                  'compass:components',
                  'compass:app'
                ]
      }, //sass_components
      sass_foundation: {
        files: [
                  'src/assets/vendor/foundation/scss/foundation.scss',
                  'src/assets/vendor/foundation/scss/foundation/*.scss',
                  'src/assets/vendor/foundation/scss/foundation/components/*.scss'
                ],
        tasks: ['compass:foundation']
      }, //sass_foundation
      shared: {
        files: [
                 'src/shared/**/*.scss',
               ],
        tasks: [
                 'compass:shared',
                 'compass:app'
               ]
      }, //sass_shared
      html: {
        files: [
                  'src/**/*.html',
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