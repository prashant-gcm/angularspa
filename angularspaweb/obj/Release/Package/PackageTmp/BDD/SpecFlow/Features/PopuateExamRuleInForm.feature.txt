Feature: Popuate Exam Rule In Form
	In order to populate exam rule in form
	As a user
	I want to be able to find selected rule and pass the rule to the form controller

@mytag
Scenario: Populate selected exam rule in form when rule name is clicked
	Given I have opened exam rule editor page
	When I click on a exam rule name
	Then the selected exam rule should populate in the form
