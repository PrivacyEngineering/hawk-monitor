export const dummyLogs = [
  {
    "requestService": "frontend",
    "responseService": "user",
    "date": "2020-11-18T11:50Z",
    "data": [
      {
        "entity": "postgresql/users",
        "identity": [{ "id": 1 }],
        "properties": ["name", "address"]
      }
    ],
    "purpose": {
      "type": "frontend-signup",
      "formatted": "User account created",
    }
  },
  {
    "requestService": "newsletter",
    "responseService": "user",
    "date": "2020-11-18T11:50Z",
    "data": [
      {
        "entity": "postgresql/users",
        "identity": [{ "id": 1 }],
        "properties": ["email"]
      }
    ],
    "purpose": {
      "type": "newsletter-signup",
      "formatted": "User signed up for newsletter",
    }
  },
  {
    "requestService": "newsletter",
    "responseService": "user",
    "date": "2020-11-18T11:53Z",
    "data": {
      "entity": "postgresql/users",
      "identity": [{ "id": 1 }],
      "properties": ["email"]
    },
    "purpose": {
      "type": "newsletter-sendout",
      "formatted": "Newsletter #23 sent",
      "id": 23
    }
  },
  {
    "requestService": "payment",
    "responseService": "user",
    "date": "2020-11-17T11:54Z",
    "data": {
      "entity": "postgresql/users",
      "identity": [{ "id": 1 }],
      "properties": ["name", "address"]
    },
    "purpose": {
      "type": "payment",
      "formatted": "Order #5345 dispatched",
      "id": 5345
    }
  }
] as const;
