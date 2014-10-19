module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jasmine: {
            components: {
                src: [
                    'spec/src/*js'
                ],
                options: {
                    specs: 'spec/spec/*.js',
                    keepRunner: true,
                    //helpers: 'test/spec/*.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    // Default task(s).
    grunt.registerTask('travis', ['jasmine']);


};