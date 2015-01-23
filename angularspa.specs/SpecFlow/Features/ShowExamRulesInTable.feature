Feature: Show Exam Rules In Table in Rules Editor Page
	In order to show Exam Rules in Table in Rules Editor Page
	As a LSS User
	I want to able to fetch Exam Rules in array of JSON from server in a Web API call and bind the array to HTML row

@mytag
Scenario: Show Exam Rules In Table in Rules Editor Page
	Given I have opened browser window
	When I navigate to default page of the application
	Then the page should display Exam Rules in a tabular format
