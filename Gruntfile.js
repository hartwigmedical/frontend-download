/* eslint-disable */
'use strict';

module.exports = function (grunt) {
  var appName = 'hmfdownloads';
  var buildNumber = grunt.option('buildNumber') || 'dev'; //build nr or dev

  // Prints the time each grunt task took
  require('time-grunt')(grunt);

  grunt.initConfig({
    appName: appName,
    buildNumber: buildNumber,
    pkg: grunt.file.readJSON('package.json'),

    babel: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.js', '!**/*.spec.js'],
            dest: 'src_transpiled/'
          }]
      },
      dev: {
        src: 'src/<%= appName %>.js',
        dest: 'src_transpiled/<%= appName %>.js'
      },
      e2e: {
        files: [
          {
            expand: true,
            cwd: 'tests/',
            src: ['e2e/**/*.js'],
            dest: 'tests_transpiled/'
          }]
      },
      unit: {
        files: [
          {
            expand: true,
            src: [
              'src/**/*.js',
              'tests/fixtures/*.js'
            ],
            dest: 'tests_transpiled/'
          }]
      }
    },

    // browser sync
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'build/<%= appName %>.dev.css',
            'build/templates.js',
            'src_transpiled/**/*.js'
          ]
        },
        options: {
          watchTask: true,
          open: false,
          ui: false,
          server: {
            directory: false
          }
        }
      }
    },

    clean: {
      build: './build/*',
      reports: './reports/*',
      transpiled_src: './src_transpiled/*',
      transpiled_tests: './tests_transpiled/*'
    },

    compress: {
      build: {
        options: {
          archive: 'build/frontend-<%= appName %>.<%= buildNumber %>.tgz'
        },
        files: [
          {
            src: ['**/*'],
            expand: true,
            cwd: 'build/'
          }]
      }
    },

    copy: {
      // Copies the needed bower_components to the build folder
      // needed for now because of loading css files
      bower_components: {
        files: [
          {
            expand: true,
            dest: 'build/bower_components',
            cwd: 'bower_components',
            src: [
              'mdi/**/*',
              'angular-material/angular-material.min.css',
              'angular-material-data-table/dist/md-data-table.min.css'
            ],
            flatten: false
          }, {
            expand: true,
            dest: 'build/fonts',
            cwd: 'bower_components',
            src: [
              'mdi/**/*'
            ],
            flatten: false
          }]
      },
      assets: {
        files: [
          {
            expand: true,
            dest: 'build/assets',
            cwd: 'src/assets',
            src: [
              '**/*'
            ],
            flatten: false
          }
        ]
      },
      build: {
        files: {
          'build/almond.js': 'bower_components/almond/almond.js',
          'build/browser-polyfill.min.js': 'node_modules/babel-core/browser-polyfill.min.js'
        }
      }
    },

    env: {
      unittest: {
        PHANTOMJS_BIN: 'phantomjs'  // use globally installed phantomJS
      }
    },

    eslint: {
      options: {
        configFile: '.eslintrc'
      },
      local: {
        src: ['src/**/*.js']
      }
    },

    karma: {
      unit: {
        browsers: ['PhantomJS'],
        configFile: 'tests/config/karma.conf.js',
        jenkinsReporter: {
          outputFile: 'reports/unit-test-results.xml'
        },
        logLevel: 'ERROR',
        singleRun: true
      }
    },

    //connect less
    less: {
      options: {
        sourceMap: true,
        sourceMapURL: '<%= appName %>.<%= buildNumber %>.css.map',
        compress: true,
        plugins: [new (require('less-plugin-autoprefix'))({
          browsers: ['last 2 versions', 'ie > 9'],
          cascade: false
        })]
      },
      prod: {
        options: {
          rootpath: '/hmfdownloads'
        },
        files: {
          'build/<%= appName %>.<%= buildNumber %>.css': 'src/<%= appName %>.less'
        }
      },
      dev: {
        options: {
          rootpath: '/build'
        },
        files: {
          'build/<%= appName %>.<%= buildNumber %>.css': 'src/<%= appName %>.less'
        }
      }
    },

    ngtemplates: {
      app: {
        src: 'src/**/**/*.html',
        dest: 'build/templates.js',

        options: {
          htmlmin: {
            collapseWhitespace: true,
            collapseBooleanAttributes: true
          },
          prefix: '/',
          bootstrap: function (module, script) {

            return 'define(["angular"], function (ng) {\n' +
              '    "use strict";\n' +
              '    ng.module("ng").run([\n' +
              '        "$templateCache", function ($templateCache) {\n' +
              '      ' + script +
              '        }\n' +
              '    ]);\n' +
              '});';
          }
        }
      },
      test: {
        src: 'src/**/**/*.html',
        dest: 'build/templates-test.js',

        options: {
          htmlmin: {
            collapseWhitespace: true,
            collapseBooleanAttributes: true
          },
          prefix: '/static/apps/' + appName + '/',
          bootstrap: function (module, script) {

            return 'define("templates-test", ["angular"], function (ng) {\n' +
              '    "use strict";\n' +
              '    ng.module("ng").run([\n' +
              '        "$templateCache", function ($templateCache) {\n' +
              '      ' + script +
              '        }\n' +
              '    ]);\n' +
              '});';
          }
        }
      }
    },

    processhtml: {
      options: {
        data: {
          buildNumber: buildNumber
        }
      },
      build: {
        files: {
          'build/index.html': ['index.html']
        }
      }
    },

    protractor: {
      options: {
        // Default config file to use
        configFile: './tests/config/protractor.parent.conf.js ',
        // Arguments being passed, can be used later on in the config files
        args: {
          params: {
            baseUrl: 'http://localhost:8000',
            login: {},
            junit: {
              outputDirectory: 'reports/junit'
            }
          }
        }
      },
      local: {
        options: {
          configFile: './tests/config/protractor.local.conf.js'
        }
      },
      jenkins: {
        options: {
          configFile: './tests/config/protractor.jenkins.conf.js'
        }
      },
      saucelabs: {
        options: {
          configFile: './tests/config/protractor.sauce.conf.js',
          keepAlive: true // Keep alive so Grunt can close the sauce connect tunnel
        }
      }
    },

    protractor_webdriver: {
      start: {
        options: {
          path: './node_modules/.bin/',
          command: 'webdriver-manager start'
        }
      }
    },

    remapIstanbul: {
      unit: {
        src: 'reports/coverage/lcov.json',
        options: {
          reports: {
            'lcovonly': 'reports/coverage/lcov-remapped.info',
            'cobertura': 'reports/coverage/cobertura-remapped.xml',
            'text-summary': null,
            'html': 'coverage/html'
          }
        }
      }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: 'src_transpiled',
          generateSourceMaps: true,
          preserveLicenseComments: false,
          optimize: 'uglify2',
          mainConfigFile: 'requirejs-config.js',
          out: 'build/' + [appName, buildNumber, 'js'].join('.'),
          name: appName,
          include: ['../build/templates'],
          insertRequire: ['../build/templates'],
          uglify2: {
            mangle: false
          }
        }
      }
    },

    watch: {
      less: {
        files: ['src/**/*.less'],
        tasks: ['less:dev'],
        options: {
          interrupt: true,
          spawn: true
        }
      },
      html: {
        files: ['src/**/*.html'],
        tasks: ['ngtemplates:app'],
        options: {
          interrupt: true,
          spawn: true
        }
      },
      transpile: {
        files: [
          'src/**/*.js'
        ],
        tasks: [
          'babel:dev'
        ],
        options: {
          nospawn: true
        }
      },
      e2e_tests: {
        files: [
          'tests/e2e/**/*.js'
        ],
        tasks: [
          'babel:e2e'
        ],
        options: {
          interrupt: true,
          nospawn: true
        }
      }
    }
  });

  // transpile only one file on watch:
  grunt.event.on('watch', function (action, filepath) {
    grunt.config([
      'babel',
      'dev',
      'src'
    ], filepath);
    grunt.config([
      'babel',
      'dev',
      'dest'
    ], filepath.replace('src/', 'src_transpiled/'));
  });

  //load tasks
  grunt.loadNpmTasks('remap-istanbul');
  grunt.file.expand('node_modules/grunt-*/tasks').forEach(grunt.loadTasks);

  grunt.registerTask('build', [
    'clean',
    'eslint',
    'less:prod',
    'copy',
    'processhtml:build',
    'babel:build',
    'ngtemplates',
    'requirejs',
    'compress'
  ]);

  grunt.registerTask('buildjs', [
    'babel:build',
    'ngtemplates',
    'requirejs'
  ]);

  grunt.registerTask('dev', [
    'clean',
    'less:dev',
    'copy',
    'babel:build',
    'babel:e2e',
    'babel:unit',
    'ngtemplates',
    'browserSync',
    'watch'
  ]);

  grunt.registerTask('e2e', [
    'protractor:local'
  ]);

  grunt.registerTask('lint', ['eslint']);

  grunt.registerTask('test-jenkins', [
    'protractor_webdriver:start',
    'protractor:jenkins'
  ]);
};
