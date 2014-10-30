module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jasmine: {
            components: {
                src: [
                    'www/js/lib/jquery/*js',
                    'www/js/lib/underscore/*js',
                    'www/js/lib/boostrap/*js',
                    'www/js/lib/backbone/*js',
                    'www/js/*js',
                    'www/js/transactions/**.js',
                    'www/js/friends/**.js'
                ],
                options: {
                    specs: 'spec/spec/*.js',
                    keepRunner: true,
                    //helpers: 'test/spec/*.js'
                }
            }
        },
        watch: {
            tests: {
                files: ['src/**', 'spec/**'],
                tasks: ['travis']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    // Default task(s).
    grunt.registerTask('travis', ['jasmine']);
    grunt.registerTask('test-reload', ['travis', 'watch:tests']);

};