exports.config = {
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    rootElement: '#exRulesEditorApp',
    specs: ['test/E2E/E2E.js'],
    // Options to be passed to Jasmine-node.
    onPrepare: function() {
        // The require statement must be down here, since jasmine-reporters@1.0
        // needs jasmine to be in the global and protractor does not guarantee
        // this until inside the onPrepare function.
        require('jasmine-reporters');
        jasmine.getEnv().addReporter(
            new jasmine.JUnitXmlReporter(null, true, true, 'test/protractor_html/')
        );
    },
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 5000
    }
};
