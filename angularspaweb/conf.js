exports.config = {
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    rootElement: '#exRulesEditorApp',
    specs: ['test/E2E/E2E.js']
};