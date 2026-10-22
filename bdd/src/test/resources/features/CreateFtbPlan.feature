Feature: Create a first time buyer plan

  Scenario: Create a plan for a selected cohort
    Given the home page is open
    And the plan creation request succeeds with name "First Time Buyer"
    When the user selects the cohort "I have saved some money and want to buy a home"
    And the user submits the plan form
    Then the create plan API is called with cohort "PROSPECTIVE"
    And a success message is shown for "First Time Buyer"

  Scenario: Require the user to select a cohort
    Given the home page is open
    When the user submits the plan form
    Then a cohort selection error is shown
    And the create plan API is not called

  Scenario: Show an error when plan creation fails
    Given the home page is open
    And the plan creation request fails with "503 Service Unavailable"
    When the user selects the cohort "I have saved some money and want to buy a home"
    And the user submits the plan form
    Then the create plan API is called with cohort "PROSPECTIVE"
    And a plan creation error is shown for "503 Service Unavailable"
