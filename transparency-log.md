# Transparency Log Request Example

## Put access Log
```
{
    "requestService": "newsletter-service",
    "responseService": "user-service",
    "date": "2020-11-18T11:53Z",
    "data": [
        {
              "service": "user/postgresql",
              "entity": "user/user/users",
              "identity": [
                   {
                       "id": 1
                   }
              ],
              "properties": ["email"]
        }
        {
            "service": "user/postgresql",
            "entity": "user/user/address",
            "identity": [
                 {
                     "id": 1
                 }
            ],
            "properties": ["street", "zipcode"]
      }  
    ],
    "purpose": {
        "formatted": "Newsletter #23",
        "type": "newsletter",
        "id": 23
    }
}
```

## Get access logs for user id 1
### Request:
```
{
    "service": "user/postgresql",
    "entity": "user/user/users",
    "identity": [
         {
             "id": 1
         }
    ]
}
```

### Response:
```
[
    {
        "requestService": "newsletter-service",
        "responseService": "user-service",
        "date": "2020-11-18T11:53Z",
        "data": {
                "service": "user/postgresql",
                "entity": "user/user/users",
                "identity": [
                    {
                        "id": 1
                    }
                ],
                "properties": ["email"]
        },
        "purpose": {
            "formatted": "Newsletter #23",
            "type": "newsletter",
            "id": 23
        }
    },
    {
        "requestService": "newsletter-service",
        "responseService": "user-service",
        "date": "2020-11-17T11:53Z",
        "data": {
                "service": "user/postgresql",
                "entity": "user/user/users",
                "identity": [
                    {
                        "id": 1
                    }
                ],
                "properties": ["name"]
        },
        "purpose": {
            "formatted": "Order 5345",
            "type": "payment",
            "orderId": 5345
        }
    }
]
```

### Access Logs for User:

Request Service | Response Service | Data | Purpose        | Datum
----------------|------------------|------|----------------|-----------------
newsletter      | user-service     | email| Newsletter #23 | 18.11.2021 11:53
payment         | user-service     | name | Order 5345     | 15.11.2021 11:53


## Get access logs for address id 1
### Request:
```
{
    "service": "user/postgresql",
    "entity": "user/user/address",
    "identity": [
         {
             "id": 1
         }
    ]
}
```

### Response:
```
[
    {
        "requestService": "newsletter-service",
        "responseService": "user-service",
        "date": "2020-11-18T11:53Z",
        "data": {
                "service": "user/postgresql",
                "entity": "user/user/address",
                "identity": [
                    {
                        "id": 1
                    }
                ],
                "properties": ["street", "zipcode"]
        },
        "purpose": {
            "formatted": "Newsletter #23",
            "type": "newsletter",
            "id": 23
        }
    }
]
```

### Access Logs for Address:

Request Service | Response Service | Data            | Purpose        | Datum
----------------|------------------|-----------------|----------------|-----------------
newsletter      | user-service     | street, zipcode | Newsletter #23 | 18.11.2021 11:53