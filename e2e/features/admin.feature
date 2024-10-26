Feature: Admin User Management

  Scenario: Add user
    Given I am logged in as an admin
    When I navigate to the Admin Dashboard
    And I add a new user with the following details:
      | Employee Name | Username     | Status  | Password      |
      | Jame          | EmilyJone1   | Enabled | Password123   |
    Then I should see the user added successfully

  Scenario: Delete user
    Given I am logged in as an admin
    When I navigate to the Admin Dashboard
    And I delete the user with username "EmilyJone1"
    Then I should see the user deleted successfully
