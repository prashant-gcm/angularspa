Feature: Create new exam rule
	In order to create new exam rule
	As a user
	I want to be able to click on Create New Rule button, enter form details and click on Submit button and see the new rule in grid

@mytag
Scenario: click on New Rule, enter form details and click on Submit and see the new rule in grid
	Given I have opened exam rule editor page
	When I click on Create New Rule button
	And I enter new exam rule details
	And I click on Submit button
	Then the result should be that the grid shows newly added rule
