Feature: Populate new exam rule in form
	In order to start creating new exam rule
	As a user
	I want to be able to populate new exam rule in form

@mytag
Scenario: click on New Rule and see empty form and RuleId 0
	Given I have opened exam rule editor page
	When I click on Create New Rule button
	Then the form should be empty and rule id should display as 0
