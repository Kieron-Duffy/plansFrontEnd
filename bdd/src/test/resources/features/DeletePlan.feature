Feature: Delete a plan

  Scenario Outline: Delete a selected plan
    Given the plan deletion request succeeds for plan "<planId>"
    When the user deletes plan "<planId>"
    Then a PATCH request is sent for plan "<planId>"
    And the request changes the plan state to "DELETED"
    And plan deletion succeeds

    Examples:
      | planId                               |
      | 819f9a94-fdf8-45ac-b407-70cdc288265a |
      | a41d6d5e-83e9-4b28-a7de-b9558eed6102 |
      | c3f08b72-6d41-49e5-8b20-1e945a702f63 |

  Scenario Outline: Handle a failed request to delete a plan
    Given the plan deletion request fails with "<message>"
    When the user deletes plan "819f9a94-fdf8-45ac-b407-70cdc288265a"
    Then a PATCH request is sent for plan "819f9a94-fdf8-45ac-b407-70cdc288265a"
    And the request changes the plan state to "DELETED"
    And plan deletion fails with "<message>"

    Examples:
      | message                 |
      | 404 Not Found           |
      | 503 Service Unavailable |