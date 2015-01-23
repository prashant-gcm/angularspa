Feature: Delete exam rules
	In order to delete exam rules
	As a user
	I want to be able to check the delete checkboxes, click on Delete Selected Rules button and see the rules disappear from page

@mytag
Scenario: check the delete checkboxes, click on Delete selected rules and see the rules disappear from page
	Given I have opened exam rule editor page
	When I check delete checkboxes for the rules that are to be delteted
	And I click on Delete Selected Rules button
	Then the selected rules should disappear from the page
