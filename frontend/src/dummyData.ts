export const putLogs = [
  {
    "requestService": "frontend",
    "responseService": "user",
    "date": "2020-11-18T11:50Z",
    "data": [
      {
        "service": "user/postgresql",
        "entity": "users",
        "identity": [{ "id": 1 }],
        "properties": ["name", "address"]
      }
    ],
    "purpose": {
      "type": "frontend-signup",
      "formatted": "Account created",
    }
  },
  {
    "requestService": "newsletter",
    "responseService": "user",
    "date": "2020-11-18T11:50Z",
    "data": [
      {
        "service": "user/postgresql",
        "entity": "users",
        "identity": [{ "id": 1 }],
        "properties": ["email"]
      }
    ],
    "purpose": {
      "type": "newsletter-signup",
      "formatted": "Signed up for newsletter",
    }
  }
];

export const getLogs = [
  {
    "requestService": "newsletter",
    "responseService": "user",
    "date": "2020-11-18T11:53Z",
    "data": {
      "service": "user/postgresql",
      "entity": "users", // table in postgresql
      "identity": [{ "id": 1 }],
      "properties": ["email"]
    },
    "purpose": {
      "type": "newsletter-sendout",
      "formatted": "Newsletter #23",
      "id": 23
    }
  },
  {
    "requestService": "payment",
    "responseService": "user",
    "date": "2020-11-17T11:54Z",
    "data": {
      "service": "user/postgresql",
      "entity": "users", // table in postgresql
      "identity": [{ "id": 1 }],
      "properties": ["name", "address"]
    },
    "purpose": {
      "type": "payment",
      "formatted": "Order #5345",
      "id": 5345
    }
  }
];