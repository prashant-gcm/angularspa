(function () {
    var exRulesEditorApp = angular.module('exRulesEditorApp', ['ngRoute']);

    exRulesEditorApp.config(['$routeProvider', 'ExRulesEditorContext', function ($routeProvider, ExRulesEditorContext) {
        $routeProvider.when("/exam", {
            templateUrl: "templates/exruleseditor/Editor_Exam.html"
        }).otherwise({
            redirectTo: "/" + ExRulesEditorContext.currentSection
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

    exRulesEditorApp.service('ExRulesEditorCUDService', ['$http', 'ExRulesEditorContext', function ($http, ExRulesEditorContext) {
        var cudService = {};
        cudService.url = "api/exrulesdata/" + ExRulesEditorContext.currentConfigurationId + "/" + ExRulesEditorContext.currentSection + "/data";
        cudService.urlforemptydata = "api/exrulesdata/" + ExRulesEditorContext.currentConfigurationId + "/" + ExRulesEditorContext.currentSection + "/empty";

        this.fetchRules = function () {
            console.log("ExRulesEditorCUDService.fetchRules is called");
            return $http.get(cudService.url).then(function (pdata) {
                return pdata.data;
            }, function (pdata) {
                //alert("Fetch rules failed");
            });
        }

        this.getNewRule = function () {
            console.log("ExRulesEditorCUDService.getNewRule is called");
            return $http.get(cudService.urlforemptydata).then(function (pdata) {
                return pdata.data;
            }, function (pdata) {
                //alert("Get new rule failed");
            });
        }

        this.deleteRules = function (pdata) {
            console.log("ExRulesEditorCUDService.deleteRules is called");
            return $http({
                method: 'POST',
                url: cudService.url,
                headers: {
                    'Content-Type': "application/json"
                },
                data: JSON.stringify(pdata)
            }).then(function (pdata) {
                return pdata.data;
            }, function (pdata) {
                //alert("Delete failed");
            });
        }

        this.saveExRuleChange = function (pdata) {
            console.log("ExRulesEditorCUDService.saveExRuleChange is called");
            var vdata = JSON.stringify(pdata);

            return $http({
                method: 'POST',
                url: cudService.url,
                headers: {
                    'Content-Type': "application/json"
                },
                data: JSON.stringify(vdata)
            }).then(function (pdata) {
                return pdata.data;
            }, function (pdata) {
                //alert("Submit failed");
            });
        }

        this.getInfo = function () {
            return cudService;
        };
    }]);

    exRulesEditorApp.controller('ViewExRulesController', ['$scope', 'ExRulesEditorEventService', 'ExRulesEditorCUDService', 'ExRulesEditorContext', function ($scope, $ExRulesEditorEventService, $ExRulesEditorCUDService, ExRulesEditorContext) {
        $scope.fetchRules = function() {
            $ExRulesEditorCUDService.fetchRules().then(function (pdata) {
                $scope.postFetchRules(pdata);
                //alert("data received from ExRulesEditorCUDService.fetchRules: " + pdata);
            });
        }

        $scope.postFetchRules = function (pdata) {
            $scope.Rules = pdata;
            $scope.onCreateNewRule();   // clear form after fetching rules from server
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
            $ExRulesEditorCUDService.getNewRule(ExRulesEditorContext.currentSection).then(function (pdata) {
                $scope.postGetNewRule(pdata[0]);
                //alert("data received from ExRulesEditorCUDService.getNewRule: " + pdata);
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

            $ExRulesEditorCUDService.deleteRules(vdata).then(function (pdata) {
                $scope.postDeleteRules();
            });

            return true;
        }

        $scope.postDeleteRules = function () {
            //alert("postDeleteRules called");
            $scope.fetchRules();
        };

        $scope.$on('SaveExRuleChange', function () {
            //alert("Received from form: " + $ExRulesEditorEventService.data.RuleName);
            var vcurrentrule = getMatchingRule($ExRulesEditorEventService.data.RuleId);
            if (copyRule($ExRulesEditorEventService.data, vcurrentrule) == true) {
                $scope.Rules.push(vcurrentrule);
            }
            //alert("after copyRule: " + vcurrentrule.RuleName);

            $ExRulesEditorCUDService.saveExRuleChange($scope.Rules).then(function (pdata) {
                //alert("Rule is saved");
                $scope.postSaveExRuleChange(vcurrentrule);
            });

            return true;
        });

        $scope.postSaveExRuleChange = function (pcurrentrule) {
            $scope.onClickRuleName(pcurrentrule.RuleId);
        };

        function getMatchingRule(pruleid) {
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
            //$scope.Rules = [];
            $scope.fetchRules();
        }
    }]);

    exRulesEditorApp.controller('ExRulesFormController', ['$scope', 'ExRulesEditorEventService', function ($scope, $ExRulesEditorEventService) {
        //$scope.CurrentRule = {};

        $scope.$on('ClickRuleName', function () {
            //alert("Received from view: " + $ExRulesEditorEventService.data);
            $scope.CurrentRule = $ExRulesEditorEventService.data;
        });

        $scope.$on('CreateNewRule', function () {
            //alert("Received from view: " + $ExRulesEditorEventService.data);
            console.log('ExRulesFormController.CreateNewRule handler is called...' + $ExRulesEditorEventService.data.RuleId);
            $scope.CurrentRule = $ExRulesEditorEventService.data;
        });

        $scope.onSaveExRuleChange = function () {
            //alert("Submitting saveExRuleChange");
            $ExRulesEditorEventService.onSaveExRuleChange($scope.CurrentRule);
        }
    }]);

    var __ExRuleEditorContext = { currentSection: "exam", currentConfigurationId: "1" };
    exRulesEditorApp.constant('ExRulesEditorContext', __ExRuleEditorContext);
})();
