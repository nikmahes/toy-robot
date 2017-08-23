// Karma configuration
// Generated on Wed Aug 23 2017 23:38:55 GMT+0530 (IST)

module.exports = function(config) {
    config.set({

        basePath: '',
        frameworks: ['browserify', 'jasmine'],

        files: [
            'robot.js',
            'robot_test.js'
        ],

        exclude: [
        ],

        preprocessors: {
            'robot.js': ['browserify'],
            'robot_test.js': ['browserify']
        },

        browserify: {
            debug: true,
            transform: [ 'babelify' ]
        },

        // define reporters, port, logLevel, browsers etc.
    });
};
