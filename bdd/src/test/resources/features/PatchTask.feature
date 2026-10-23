Feature: Complete a plan task
Scenario Outline: Complete a selected task
Given the task completion request succeeds
When the user completes task "<taskId>"
Then a PATCH request is sent for task "<encodedTaskId>"
And the request changes the task state to "COMPLETED"
And task completion succeeds

Examples:
| taskId                               | encodedTaskId                        |
| 819f9a94-fdf8-45ac-b407-70cdc288265a | 819f9a94-fdf8-45ac-b407-70cdc288265a |
| a41d6d5e-83e9-4b28-a7de-b9558eed6102 | a41d6d5e-83e9-4b28-a7de-b9558eed6102 |
| c3f08b72-6d41-49e5-8b20-1e945a702f63 | c3f08b72-6d41-49e5-8b20-1e945a702f63 |

Scenario Outline: Handle a failed task completion request
Given the task completion request fails with "<message>"
When the user completes task "819f9a94-fdf8-45ac-b407-70cdc288265a"
Then a PATCH request is sent for task "819f9a94-fdf8-45ac-b407-70cdc288265a"
And the request changes the task state to "COMPLETED"
And task completion fails with "<message>"

Examples:
| message                 |
| 404 Not Found           |
| 503 Service Unavailable |