
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    browserify: {
      dist: {
        files: {
          'dist/js/module.js': ['src/js/main.js'],
          'dist/js/bg.js' : ['src/js/bg.js']
        }
      }
    },
  uglify: {
    options: {
      beautify: true
    },
    my_target: {
      files: {
        'dist/js/main.min.js': ['dist/js/module.js']
      }
    }
  },
  sass: {
    options: {
      sourceMap: true
    },
    dist: {
      files: {
        'dist/css/style.css': 'src/sass/style.sass'
      }
    }
  },
  jade: {
    compile: {
      options: {
        data: {
          debug: false
        }
      },
      files: {
        "dist/html/main.html": ["src/jade/main.jade"]
      }
    }
  },
  watch: {
    scripts: {
      files: ['src/js/**/*.js', 'src/sass/**/*.sass', 'src/jade/**/*.jade'],
      tasks: ['build'],
      options: {
        interrupt: true,
      },
    },
  },
    cssmin: {
      options: {
        shorthandCompacting: true,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/css/style.min.css': 'dist/css/style.css'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('build', ['browserify', 'uglify', 'sass', 'cssmin', 'jade']);

};