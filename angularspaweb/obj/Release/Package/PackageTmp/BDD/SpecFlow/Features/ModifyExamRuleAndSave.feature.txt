Feature: Modify a exam rule and save
	In order to test save exam rule functionality
	As a user
	I want to be able to select a rule to modify, change rule detail in a form and save the changes

@mytag
Scenario: click on rule name, change rule name in the form, click on Submit and see the modified rule in grid
	Given I have opened exam rule editor page
	And I have clicked on a rule name to select the rule to change
	When I edit rule name
	And I click on Submit button
	Then the result should be that the changes in the rule are populated in the grid
