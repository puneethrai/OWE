module.exports = function (grunt) {
    var browsers = [{
        browserName: "chrome",
        platform: "XP"
    }, {
        browserName: "chrome",
        platform: "linux"
    }, {
        browserName: 'Safari',
        platformVersion: '8.1',
        platformName: 'iOS'
    }];

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    base: "",
                    port: 9999
                }
            }
        },
        'saucelabs-jasmine': {
            all: {
                options: {
                    urls: ["http://127.0.0.1:9999/_SpecRunner.html"],
                    tunnelTimeout: 5,
                    build: process.env.TRAVIS_JOB_ID,
                    concurrency: 3,
                    browsers: browsers,
                    testname: "OWE tests",
                    tags: ["master"]
                }
            }
        },

        jasmine: {
            components: {
                src: [
                    'www/js/*js',
                    'www/js/transactions/**.js',
                    'www/js/friends/**.js'
                ],
                options: {
                    specs: 'spec/spec/*.js',
                    keepRunner: true,
                    vendor: [
                        'www/js/lib/jquery/*js',
                        'www/js/lib/underscore/*js',
                        'www/js/lib/boostrap/*js',
                        'www/js/lib/backbone/*js',
                        'spec/vendor/jasmine-jquery.js',
                        'spec/vendor/jasmine-jsreporter.js'
                    ],
                    template: "spec/SpecRunner.tmpl"
                    //helpers: 'test/spec/*.js'
                }
            }
        },
        watch: {
            tests: {
                files: ['www/**', 'spec/**'],
                tasks: ['travis']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-saucelabs');
    grunt.loadNpmTasks('grunt-contrib-connect');
    // Default task(s).
    grunt.registerTask('travis', ['jasmine']);
    grunt.registerTask('test-reload', ['travis', 'watch:tests']);
    grunt.registerTask("dev", ["connect", "watch:tests"]);
    grunt.registerTask("test", ["connect", "saucelabs-jasmine"]);

};