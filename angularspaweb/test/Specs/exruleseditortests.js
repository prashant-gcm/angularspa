describe('To test ExRuleEditor', function () {
    var ngRoute_module = module('ngRoute');

    beforeEach(module('exRulesEditorApp', [ngRoute_module]));
    beforeEach(module('templates/exruleseditor/Editor_Exam.html'));
    beforeEach(module('test/Data/TestData_Exam.json'));
    beforeEach(module('test/Data/TestData_Exam_Empty.json'));

    var $rootScope;
    var $location;
    var $ExRulesEditorCUDService;
    var $httpBackend;
    var $templateCache;
    var cudServiceInfo;
    var apptemplate;
    var apptemplate_bound;
    var viewtemplate_bound;
    var formtemplate_bound;

    beforeEach(inject(function (_$rootScope_, _$location_, _ExRulesEditorCUDService_, _$httpBackend_, _$templateCache_, $compile) {
        $rootScope = _$rootScope_;
        $location = _$location_;
        $ExRulesEditorCUDService = _ExRulesEditorCUDService_;
        $httpBackend = _$httpBackend_;
        $templateCache = _$templateCache_;

        cudServiceInfo = $ExRulesEditorCUDService.getInfo();
        console.log(cudServiceInfo);
        $httpBackend.whenGET(cudServiceInfo.url).respond(200, $templateCache.get('test/Data/TestData_Exam.json'));
        $httpBackend.whenGET(cudServiceInfo.urlforemptydata).respond(200, $templateCache.get('test/Data/TestData_Exam_Empty.json'));
        $httpBackend.expectGET(cudServiceInfo.url);
        //$httpBackend.expectGET("templates/exruleseditor/Editor_Exam.html");

        apptemplate = angular.element("<div ng-app=\"exRulesEditorApp\" id=\"exRulesEditorApp\"><ng-view></ng-view></div>");
        apptemplate_bound = ($compile(apptemplate))($rootScope);
        $rootScope.$digest();

        viewtemplate_bound = apptemplate_bound.find(".exruleeditor_grid");
        formtemplate_bound = apptemplate_bound.find(".exruleeditor_form");

        $httpBackend.flush();
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should initialize application properly', function () {
        expect($location.path()).toBe('/exam');
    });

    it('should bind data to the template', function () {
        var elem;
        elem = viewtemplate_bound.find('table.RuleTable tr');
        expect(elem.length).toBe(6);

        elem = formtemplate_bound.find("form[id='formexrules']");
        expect(elem.length).toBe(1);

        elem = formtemplate_bound.find("select[id='selectGrade']");
        expect(elem.length).toBe(1);
    });

    it('should populate form when rule name is clicked', function() {
        var elem;
        elem = viewtemplate_bound.find("table.RuleTable tr td a:contains('Rule 1')");
        expect(elem.length).toBe(1);
        elem.click();

        elem = formtemplate_bound.find("input[id='txtRuleDescrption']");
        expect(elem.length).toBe(1);
        console.log(elem[0].value);
        expect(elem[0].value).toBe("Rule Description 1");

        elem = viewtemplate_bound.find("table.RuleTable tr td a:contains('Rule 3')");
        expect(elem.length).toBe(1);
        elem.click();

        elem = formtemplate_bound.find("select[id='selectExamCode']");
        expect(elem.length).toBe(1);
        console.log(elem[0].value);
        expect(elem[0].value).toBe("S6");
    });

    it('should clear form when create new rule button is clicked', function () {
        var elem;
        elem = viewtemplate_bound.find("table.RuleTable tr td a:contains('Rule 1')");
        expect(elem.length).toBe(1);
        elem.click();

        elem = formtemplate_bound.find("input[id='txtRuleDescrption']");
        expect(elem.length).toBe(1);
        console.log(elem[0].value);
        expect(elem[0].value).toBe("Rule Description 1");

        elem = viewtemplate_bound.find("[id='btnCreateNewRule']");
        expect(elem.length).toBe(1);
        console.log(elem[0].id);
        $httpBackend.expectGET(cudServiceInfo.urlforemptydata);
        elem[0].click();

        $httpBackend.flush();

        elem = formtemplate_bound.find("input[id='txtRuleDescrption']");
        expect(elem.length).toBe(1);
        console.log(elem[0].value);
        expect(elem[0].value).toBe("");
    });

    describe('To test ExRuleEditor Submit', function () {
        it('should save changes when submit button is clicked', function () {
            var elem;
            elem = viewtemplate_bound.find("table.RuleTable tr td a:contains('Rule 2')");
            expect(elem.length).toBe(1);
            elem.click();

            elem = formtemplate_bound.find("input[id='txtRuleDescrption']");
            expect(elem.length).toBe(1);
            elem[0].value = "Rule Description 2 - modified";

            console.log(cudServiceInfo.url);
            $httpBackend.expectPOST(cudServiceInfo.url).respond(200, '');

            elem = formtemplate_bound.find("[id='btnRuleSubmit']");
            elem.click();

            $httpBackend.flush();
        });
    });
});
