
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    babel: {
        options: {
            sourceMap: true,
            presets: ['es2015']
        },
        dist: {
            files: {
                'src/js/mainBabel.js': 'src/js/main.js',
                'src/js/bgBabel.js' : 'src/js/bg.js'
            }
        }
    },
    browserify: {
      dist: {
        files: {
          'dist/js/module.js': ['src/js/mainBabel.js'],
          'dist/js/bg.js' : ['src/js/bgBabel.js']
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
      files: ['src/js/main.js', 'src/js/bg.js', 'src/js/components/**/*.js', 'src/sass/**/*.sass', 'src/jade/**/*.jade'],
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

  require('load-grunt-tasks')(grunt)



  grunt.registerTask('build', ['babel', 'browserify', 'uglify', 'sass', 'cssmin', 'jade']);

};