// Karma configuration file
// See http://karma-runner.github.io/0.10/config/configuration-file.html
module.exports = function (config) {
    config.set({
        basePath: '',

        frameworks: ['jasmine'],

        reporters: ['progress', 'html'],

        // the default configuration
        htmlReporter: {
            outputDir: 'test/karma_html', // where to put the reports
            //templatePath: null, // set if you moved jasmine_template.html
            focusOnFailures: true, // reports show failures on start
            namedFiles: false, // name files instead of creating sub-directories
            pageTitle: null, // page title for reports; browser info by default
            urlFriendlyName: false//, // simply replaces spaces with _ for files/dirs


            // experimental
            //preserveDescribeNesting: false, // folded suites stay folded
            //foldAll: false // reports start folded (only with preserveDescribeNesting)
        },

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
