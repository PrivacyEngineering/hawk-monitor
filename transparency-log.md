# Transparency Log Request Example

## Put access log
```json
[
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
]
```

## Get access logs for user id 1
Request:
```json
{
    "service": "user/postgresql",
    "entity": "users", // table in postgresql
    "identity": [{ "id": 1 }]
}
```

Response:
```json
[
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
]
```

Access Logs for User:

Request Service | Response Service | Data          | Purpose        | Datum
----------------|------------------|---------------|----------------|-----------------
newsletter      | user             | email         | Newsletter #23 | 18.11.2021 11:53
payment         | user             | name, address | Order 5345     | 15.11.2021 11:53


## Get access logs for address of user id 1
Request:
```json
{
    "service": "user/postgresql",
    "entity": "users", // table in postgresql
    "identity": [{ "id": 1 }],
    "property": ["address"]
}
```

Response:
```json
[
    {
        "requestService": "payment",
        "responseService": "user",
        "date": "2020-11-18T11:55Z",
        "data": {
            "service": "user/postgresql",
            "entity": "users", // table in postgresql
            "identity": [{ "id": 1 }],
            "properties": ["address"]
        },
        "purpose": {
            "type": "payment",
            "formatted": "Order #5345",
            "id": 5345
        }
    }
]
```

Access Logs for Addresses:

Request Service | Response Service | Identity | Properties | Purpose         | Datum
----------------|------------------|----------|------------|-----------------|-----------------
frontend        | user             | id: 1    | address    | Account created | 18.11.2021 11:50
payment         | user             | id: 1    | address    | Order #5345     | 18.11.2021 11:53