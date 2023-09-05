Feature:
  In order to test user list endpoints
  As a user
  I want to have those scenarios

  Scenario: It tries to get user list as not logged user
    When I request "/api/users" using HTTP GET
    Then the response code is 401

  Scenario: It tries to get user list without the right to do so
    Given I am authenticated as "user.user@gmail.com"
    When I request "/api/users" using HTTP GET
    Then the response code is 403

  Scenario: It succeed to get user list as an admin
    Given I am authenticated as "admin.admin@gmail.com"
    When I request "/api/users" using HTTP GET
    Then the response code is 200
    Then the response body contains JSON:
      """
      {
        "hydra:totalItems": 10,
        "hydra:member": [
            {
                "@id": "\/api\/users\/3",
                "@type": "User",
                "email": "user.user@gmail.com",
                "roles": [
                    "STUDENT",
                    "ROLE_USER"
                ],
                "lastName": "user",
                "firstName": "user",
                "createdAt": "@validDate()",
                "updatedAt": "@validDate()",
                "id": "@validInteger()",
                "stats": {
                    "nbQuiz": 0,
                    "nbMasterclass": 0,
                    "nbLessonFinished": 0,
                    "nbBadge": 0,
                    "nbInstrument": 0
                }
            }
        ]
      }
      """

  Scenario: It tries to get user list as a teacher
    Given I am authenticated as "teacher.test@gmail.com"
    When I request "/api/users" using HTTP GET
    Then the response code is 403
