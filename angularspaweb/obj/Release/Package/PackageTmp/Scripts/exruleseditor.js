(function () {
    var exRulesEditorApp = angular.module('exRulesEditorApp', ['ngRoute']);

    exRulesEditorApp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when("/exam", {
            templateUrl: "templates/exruleseditor/Editor_Exam.html"
        }).otherwise({
            redirectTo: "/" + __currentSection
        });
    }]);

    exRulesEditorApp.factory('ExRulesEditorEventService', ['$rootScope', function ($rootScope) {
        var eventService = {};

        eventService.data = {};

        eventService.onClickRuleName = function (pdata) {
            eventService.data = pdata;
            $rootScope.$broadcast('ClickRuleName');
        };

        eventService.onCreateNewRule = function (pdata) {
            eventService.data = pdata;
            $rootScope.$broadcast('CreateNewRule');
        };

        eventService.onSaveExRuleChange = function (pdata) {
            eventService.data = pdata;
            $rootScope.$broadcast('SaveExRuleChange');
        };

        return eventService;
    }]);

    exRulesEditorApp.service('ExRulesEditorCUDService', ['$http', function ($http) {
        var cudService = {};
        cudService.url = "api/exrulesdata/" + __currentConfigurationId + "/" + __currentSection + "/data";
        cudService.urlforemptydata = "api/exrulesdata/" + __currentConfigurationId + "/" + __currentSection + "/empty";

        this.fetchRules = function (psuccessfn) {
            return $http.get(cudService.url).success(function (pdata) {
                psuccessfn(pdata);
                //alert("data received by ExRulesEditorCUDService.fetchRules: " + pdata);
            });
        }

        this.getNewRule = function (pdatatype, psuccessfn) {
            return $http.get(cudService.urlforemptydata).success(function (pdata) {
                psuccessfn(pdata);
                //alert("data received by ExRulesEditorCUDService.getNewRule: " + pdata);
            });
        }

        this.deleteRules = function (pdata, psuccessfn) {
            $http({
                method: 'POST',
                url: cudService.url,
                headers: {
                    'Content-Type': "application/json"
                },
                data: JSON.stringify(pdata)
            }).success(function (data, status, headers, config) {
                psuccessfn();
            }).error(function (data, status, headers, config) {
                alert("Delete failed");
            });
        }

        this.saveExRuleChange = function (pdata, psuccessfn) {
            var vdata = JSON.stringify(pdata);

            return $http({
                method: 'POST',
                url: cudService.url,
                headers: {
                    'Content-Type': "application/json"
                },
                data: JSON.stringify(vdata)
            }).success(function (data, status, headers, config) {
                //alert("Rule is saved");
                psuccessfn();
            }).error(function (data, status, headers, config) {
                alert("Submit failed");
            });
        }
    }]);

    exRulesEditorApp.controller('ViewExRulesController', ['$scope', 'ExRulesEditorEventService', 'ExRulesEditorCUDService', function ($scope, $ExRulesEditorEventService, $ExRulesEditorCUDService) {
        $scope.postFetchRules = function (data) {
            $scope.Rules = data;
            //alert("data received by ViewExRulesController: " + $scope.Rules);
        };

        $scope.onClickRuleName = function (pruleid) {
            //alert("onClickRuleName called");
            //alert(pruleid);
            var vcurrentrule = JSON.parse(JSON.stringify(getMatchingRule(pruleid)));
            //alert(vcurrentrule.RuleName);
            $ExRulesEditorEventService.onClickRuleName(vcurrentrule);
        }

        $scope.onCreateNewRule = function () {
            //alert("onCreateNewRule called");
            $ExRulesEditorCUDService.getNewRule(__currentSection, function (pnewrule) {
                $scope.postGetNewRule(pnewrule[0]);
            });
        }

        $scope.postGetNewRule = function (pnewrule) {
            $ExRulesEditorEventService.onCreateNewRule(pnewrule);
        }

        $scope.onDeleteRules = function () {
            //alert("onDeleteRules called");
            var vruleids = "";
            for (var rcnt = 0; rcnt < $scope.Rules.length; rcnt++) {
                var arule = $scope.Rules[rcnt];
                var vctrldelete = document.getElementById("chkboxRuleDelete_" + arule.RuleId);
                if (vctrldelete) {
                    if (vctrldelete.checked == true) {
                        vruleids += (((vruleids.length == 0) ? "" : ",") + arule.RuleId);
                    }
                }
            }
            vruleids = { deleteruleids: vruleids };
            var vdata = JSON.stringify(vruleids);

            $ExRulesEditorCUDService.deleteRules(vdata, function () {
                $scope.postDeleteRules();
            });

            return true;
        }

        $scope.postDeleteRules = function () {
            $ExRulesEditorCUDService.fetchRules($scope.postFetchRules);
            $scope.onCreateNewRule();
        };

        $scope.$on('SaveExRuleChange', function () {
            //alert("Received from form: " + $ExRulesEditorEventService.data.RuleName);
            var vcurrentrule = getMatchingRule($ExRulesEditorEventService.data.RuleId);
            if (copyRule($ExRulesEditorEventService.data, vcurrentrule) == true) {
                $scope.Rules.push(vcurrentrule);
            }
            //alert("after copyRule: " + vcurrentrule.RuleName);

            $ExRulesEditorCUDService.saveExRuleChange($scope.Rules, function () {
                $scope.postSaveExRuleChange(vcurrentrule);
            });

            return true;
        });

        $scope.postSaveExRuleChange = function (pcurrentrule) {
            $scope.onClickRuleName(pcurrentrule.RuleId);
        };

        getMatchingRule = function (pruleid) {
            var vrule = {};
            for (var rcnt = 0; rcnt < $scope.Rules.length; rcnt++) {
                var arule = $scope.Rules[rcnt];
                if (arule.RuleId == pruleid) {
                    vrule = arule;
                    //alert("Rule to edit: " + vrule);
                    break;
                }
            }

            return vrule;
        }

        function copyRule(vfromrule, vtorule) {
            var bnewrule = false;
            var vnextNextSeqRuleId = 0;
            if (vfromrule.RuleId == 0) {
                vnextNextSeqRuleId = getNextSeqRuleId();
                bnewrule = true;
            }
            angular.copy(vfromrule, vtorule);
            if (bnewrule) {
                vtorule.RuleId = vnextNextSeqRuleId;
            }
            return bnewrule;
        }

        function getNextSeqRuleId() {
            var vlastruleid = 0;
            for (var rcnt = 0; rcnt < $scope.Rules.length; rcnt++) {
                var arule = $scope.Rules[rcnt];
                if (arule.RuleId > vlastruleid) {
                    vlastruleid = arule.RuleId;
                }
            }
            return (vlastruleid + 1);
        }

        {
            $scope.Rules = [];
            $ExRulesEditorCUDService.fetchRules($scope.postFetchRules);
        }
    }]);

    exRulesEditorApp.controller('ExRulesFormController', ['$scope', 'ExRulesEditorEventService', function ($scope, $ExRulesEditorEventService) {
        $scope.CurrentRule = {};

        $scope.$on('ClickRuleName', function () {
            //alert("Received from view: " + $ExRulesEditorEventService.data);
            $scope.CurrentRule = $ExRulesEditorEventService.data;
        });

        $scope.$on('CreateNewRule', function () {
            //alert("Received from view: " + $ExRulesEditorEventService.data);
            $scope.CurrentRule = $ExRulesEditorEventService.data;
        });

        $scope.onSaveExRuleChange = function () {
            //alert("Submitting saveExRuleChange");
            $ExRulesEditorEventService.onSaveExRuleChange($scope.CurrentRule);
        }
    }]);

    var __currentSection = "exam";
    var __currentConfigurationId = "1";
})();
