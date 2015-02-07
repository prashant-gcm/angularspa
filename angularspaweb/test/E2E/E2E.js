describe('In angularspa page', function () {
    beforeEach(function () {
        browser.get('http://pacific/angularspa/exruleseditor/');
        browser.sleep(5000);
    });

    it('should display HTML table and form below it when the page is opened', function() {
        console.log("expect: class exruleeditor_grid exists");
        expect(element(by.css('.exruleeditor_grid')), "expect: class exruleeditor_grid exists").not.toBe(null);

        console.log("expect: class exruleeditor_form exists");
        expect(element(by.css('.exruleeditor_form')), "expect: class exruleeditor_form exists").not.toBe(null);
    }, 5000);

    it('should populate exam rule in form when name of rule is clicked', function () {
        var vtocheck = "Rule 7";
        selectARuleToEdit(vtocheck);
    }, 5000);

    it('should clear exam rule in form and display rule id 0 when create new rule button is clicked', function () {
        var vtocheck = "Rule 7";
        selectARuleToEdit(vtocheck);

        var btnCreateNewRule = element(by.id('btnCreateNewRule'));
        console.log("expect: btnCreateNewRule exists");
        expect(btnCreateNewRule.length, "expect: btnCreateNewRule exists").not.toEqual(0);

        btnCreateNewRule.click();

        var elemruleid = null;
        element.all(by.binding('CurrentRule.RuleId')).then(function(pelems){
            if (pelems.length > 0) {
                console.log("expect: Rule Id is displayed as 0 on the page");
                expect(pelems[0].getText(), "expect: Rule Id is displayed as 0 on the page").toEqual("0");
                elemruleid = pelems[0];
            }
            console.log("expect: test element that displays rule id is found");
            expect(elemruleid, "expect: test element that displays rule id is found").not.toBe(null);
        });
    }, 5000);

    it('should display modified data in grid when a rule data is modified in form and submit button is clicked', function () {
        var vtocheck = "Rule 7";
        var vnewvalue = vtocheck + " - modified";
        selectARuleToEdit(vtocheck);

        var btnRuleSubmit = element(by.id('btnRuleSubmit'));
        console.log("expect: btnRuleSubmit exists");
        expect(btnRuleSubmit.length, "expect: btnRuleSubmit exists").not.toEqual(0);

        var finput = element(by.model("CurrentRule.RuleName"));
        console.log("expect: input textbox for rule name is found on the page");
        expect(finput, "expect: input textbox for rule name is found on the page").not.toBe(null);

        finput.clear();
        finput.sendKeys(vnewvalue);
        btnRuleSubmit.click();

        assertRuleNameInGrid(vnewvalue);
    }, 5000);

    it('should add new rule to the grid when create new rule button is clicked, rule data is entered and submit button is clicked', function () {
        var btnCreateNewRule = element(by.id('btnCreateNewRule'));
        console.log("expect: btnCreateNewRule exists");
        expect(btnCreateNewRule.length, "expect: btnCreateNewRule exists").not.toEqual(0);

        btnCreateNewRule.click();

        var finput = null;
        var vnewrulename = "New rule - " + new Date().toDateString();
        finput = element(by.id("txtRuleName"));
        finput.sendKeys(vnewrulename);

        finput = element(by.id("txtRuleDescrption"));
        finput.sendKeys("New Rule Description");

        selectOptionByIndex("selectExamCode", 0);
        selectOptionByText("selectExamCode", "S3");

        selectOptionByIndex("selectStatus", 0);
        selectOptionByText("selectStatus", "COMPLETE");

        selectOptionByIndex("selectGrade", 0);
        selectOptionByText("selectGrade", "FAIL");

        selectOptionByIndex("selectOperator", 0);
        selectOptionByText("selectOperator", "AND");

        var btnRuleSubmit = element(by.id('btnRuleSubmit'));
        console.log("expect: btnRuleSubmit exists");
        expect(btnRuleSubmit.length, "expect: btnRuleSubmit exists").not.toEqual(0);
        btnRuleSubmit.click();

        browser.sleep(2000);

        assertRuleNameInGrid(vnewrulename);
    }, 5000);

    it('should delete rows from the grid when delete checkboxes are selected and then the delete selected rule button is clicked', function () {
        element(by.id("chkboxRuleDelete_" + "14")).click();
        //element(by.id("chkboxRuleDelete_" + "15")).click();

        var btnDeleteRules = element(by.id('btnDeleteRules'));
        console.log("expect: btnDeleteRules exists");
        expect(btnDeleteRules.length, "expect: btnDeleteRules exists").not.toEqual(0);

        btnDeleteRules.click();
        browser.sleep(2000);

        expect(element(by.id("chkboxRuleDelete_" + "14")).isPresent()).toBeFalsy();
        //expect(element(by.id("chkboxRuleDelete_" + "15")).isPresent()).toBeFalsy();
    }, 5000);

    function selectARuleToEdit(ptocheck){
        var finput = null;
        var textvalue = "<<unknown>>";

        element.all(by.css(".RuleTable tr td a")).then(function(panchors) {
            var vanchor;
            panchors.forEach(function(value, index, panchors){
                panchors[index].getText().then(function(ptext) {
                    if (ptext == ptocheck) {
                        vanchor = panchors[index];
                        vanchor.click();
                        finput = element.all(by.model("CurrentRule.RuleName"));
                        console.log("expect: input textbox for rule name is found on the page");
                        expect(finput, "expect: input textbox for rule name is found on the page").not.toBe(null);
                        console.log("expect: input text for rule name is populated by name of selected rule");
                        expect(finput.getAttribute("value"), "expect: input text for rule name is populated by name of selected rule"),toEqual(ptocheck);
                    }
                    console.log("expect: required test rule name is found on the page");
                    expect(vanchor, "expect: required test rule name is found on the page").not.toBe(null);
                });
            });
        });
    }

    function selectOptionByIndex(pselect, pindex) {
        element(by.id(pselect)).all(by.tagName('option')).get(pindex).click();
    }

    function selectOptionByText(pselect, pvalue) {
        element(by.id(pselect)).all(by.css("option[value='" + pvalue + "']")).get(0).click();
    }

    function assertRuleNameInGrid(pnewvalue){
        var vanchor_found = false;
        element.all(by.css(".RuleTable tr td a")).then(function(panchors) {
            panchors.forEach(function (value, index, panchors) {
                panchors[index].getText().then(function (ptext) {
                    if (ptext == pnewvalue) {
                        vanchor_found = true;
                    }
                });
            })
        }).then(function(){
            console.log("expect: saved changes are displayed in grid");
            expect(vanchor_found, "expect: saved changes are displayed in grid").toEqual(true);
        });
    }
});
