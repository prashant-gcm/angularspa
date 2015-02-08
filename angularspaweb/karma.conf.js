// Karma configuration file
// See http://karma-runner.github.io/0.10/config/configuration-file.html
module.exports = function (config) {
    config.set({
        basePath: '',

        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
          // libraries
          'test/Specs/jquery-1.8.1.min.js',
          'scripts/angular.js',
          'scripts/angular-mocks.js',
          'scripts/angular-route.js',

          // our app
          'scripts/exruleseditor.js',

          // tests
          'test/Specs/exruleseditortests.js',

          // templates
          'templates/exruleseditor/*.html',
          'test/Data/*.json'
        ],

        // generate js files from html templates
        preprocessors: {
            'templates/exruleseditor/*.html': 'ng-html2js',
            'test/Data/*.json': 'ng-html2js'
        },

        autoWatch: true,
        browsers: ['Chrome']
    });
};
