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
        files: {
          'build/components/home.js': ['src/components/home.js'],
          'build/components/home.controller.js': ['src/components/home.controller.js'],
          'build/components/dashboard.js': ['src/components/dashboard.js'],
          'build/components/dashboard.controller.js': ['src/components/dashboard.controller.js'],
          'build/components/profile.js': ['src/components/profile.js'],
          'build/components/profile.controller.js': ['src/components/profile.controller.js'],
          'build/components/upload.js': ['src/components/upload.js'],
          'build/components/upload.controller.js': ['src/components/upload.controller.js'],
        } //files
      } //my_target
    }, //uglify*/
    copy: {
      files: {
            expand : true,
            cwd    : './',
            src    : './src/**',
            dest   : 'build/'
      }
    },
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
                  'src/components/home/*.js',
                  'src/components/dashboard/*.js',
                  'src/components/profile/*.js',
                  'src/components/upload/*.js'
                ],
        //tasks: ['clean','uglify'],
        tasks: ['copy']
      }, //script
      sass: {
        files: [
                  'src/components/home.scss',
                  'src/components/dashboard.scss',
                  'src/components/profile.scss',
                  'src/components/upload.scss'
                ],
        tasks: [
                  'compass:dev',
                  'compass:foundation'
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
                  'src/components/home.html',
                  'src/components/dashboard.html',
                  'src/components/profile.html',
                  'src/components/upload.html',
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