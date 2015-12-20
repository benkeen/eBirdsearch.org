module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var appFiles = [
    './lang/*',
    './core/*.js',
    './core/*.jsx',
		'./core/i18n/*.jsx',
    './components/**/*.js',
    './components/**/*.jsx'
  ];

  var config = {
		pkg: grunt.file.readJSON('package.json'),

		/*
		template: {
			dev: {
				options: {
					data: {
						ENV: "DEV"
					}
				},
				files: {
					'index.php': ['grunt_templates/index.template.tpl']
				}
			},
			prod: {
				options: {
					data: {
						ENV: "PROD",
						APP_START_PATH: ""
					}
				},
				files: {
					'index.php': ['grunt_templates/index.template.tpl']
				}
			}
		},
		*/

		babel: {
			options: {
				plugins: ['transform-react-jsx'],
				sourceMap: true,
				presets: ['es2015', 'react']
			},
			jsx: {
				files: [{
					expand: true,
					cwd: './',
					src: appFiles,
					dest: 'dist',
					ext: '.js'
				}]
			}
		},

    browserify: {
      dist: {
        cwd: './',
        files: {
          "dist/bundle.js": "dist/core/start.js"
        }
      }
    },

    watch: {
      scripts: {
        files: appFiles,
        tasks: ['babel:jsx', 'browserify']
      }
    },

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'dist/css/styles.css': 'css/sass/styles.scss'
        }
      }
    },

		copy: {
			// fonts need to be loaded real-time because they're browser-dependent
			fonts: {
				src: './css/fonts/*',
				dest: 'dist/fonts/',
				flatten: true,
				expand: true,
				filter: 'isFile'
			}
		}

		/*
		uglify: {
			my_target: {
				files: {
					'build/core-js.min.js': [
						'libs/html5shiv.js',
						'libs/modernizr-2.0.6.min.js',
						'libs/jquery-ui-1.10.3.custom.min.js',
						'libs/jquery.tablesorter.min.js',
						'libs/jquery.tablesorter.widgets.js',
						'libs/jquery.metadata.js',
						'libs/spinners.min.js',
						'libs/gmaps.inverted.circle.js',
						'libs/bootstrap-modal.js',
						'libs/bootstrap-transition.js',
						'libs/require.min.js',
						'core/requireConfig.js'
					]
				}
			},
			options: {
				report: "min",
					compress: false
			}
		},

		md5: {
			prod: {
				files: {
					'build/appStart.min.js': 'build/appStart.min.js'
				},
				options: {
					after: function(fileChanges) {
						config.template.prod.options.data.APP_START_PATH = fileChanges[0].newPath;
					}
				}
			}
		},

		requirejs: {
			compile: {
				options: {
					name: "core/appStart",
					baseUrl: "./",
					mainConfigFile: "core/requireConfig.js",
					out: "./build/appStart.min.js"
				}
			}
		}
	 */
	};

	grunt.initConfig(config);
  grunt.registerTask('local', ['babel:jsx', 'browserify', 'sass', 'copy:fonts']);

	//grunt.registerTask('default', ['uglify', 'requirejs', 'template']);
	//grunt.registerTask('dev', ['uglify', 'requirejs', 'template:dev']);
	//grunt.registerTask('prod', ['uglify', 'requirejs', 'md5', 'template:prod']);

};
