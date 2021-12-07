# 1. /requests

## 1.1. /requests/endpoint Group by HTTP Endpoint

From | To | Endpoint | Count | First | Last
-----|----|----------|--------|-------|------
_newsletter-service_ | _user-service_ | HTTP GET /api/user/newsletter/data | _23423_ | 2020-03-23 14:33:00 | 2021-12-06 16:00:12

Click on From / To --> see 2.

Click on Count --> see. 1.1.1.

### 1.1.1. /requests/endpoint/2342443 See Requests of specific Endpoint

From: _newsletter-service_

To: _user-service_

Endpoint: _HTTP GET /api/user/newsletter/data_


Date | Purpose | Detail
-----|---------|----------
2021-12-06 15:59:11 | _Order #235_ | _Details_
2021-11-23 17:03:23 | _Order #234_ | _Details_

Click on Details --> see 1.3.

Click on Purpose --> see 1.2.1.


## 1.2. /requests/purpose Group by Purpose

Purpose | Count | First | Last
--------|-------|-------|------
Order #234 | _234_ | 2021-12-06 15:58:03 | 2021-12-06 16:00:12
Order #235 | _99_ | 2021-11-23 17:03:23 | 2021-11-23 17:04:50

Click Count --> see 1.2.1.


### 1.2.1. /requests/purpose/23423425435 See Requests of specific Purpose

Purpose Type: Order

Purpose: #235


From | To | Endpoint | Date | Detail
-----|----|----------|------|---------
_newsletter-service_|  _user-serivce_ | _HTTP GET /api/user/newsletter/data_ |  2021-12-06 15:58:03 | _Details_

Click on Details --> see 3.

Click on Endpoint --> see 1.1.1.

Click on From / To --> see 2.


## 1.3. /requests/12313123144 View Request
From: _newsletter-service_

To: _user-service_

Endpoint: _HTTP GET /api/user/newsletter/data_

Date: 2021-12-06 15:59:11

Purpose Type: Order

Purpose: #233

Purpose Data:
```json
{
    "id": 232342,
    "paymentMethod": "paypal",
    "transactionId": "23423423454",
    ...
}
```


Category | Field | Privacy Level | Count | Unique Count
---------|-------|---------------|-------|-------------
_User-Related-Data_ | _User E-Mail_ | 2 | 133 | 23
_User-Related-Data_ | _User Last-Name_ | 2 | 133 | 23

Click on Category --> see 4.

Click on Field --> see 3.


# 2. /services/user-service Show stats of specific Service

TODO


# 3. /data/2432422342 Show stats of specic Field e.g. User.email

TODO

# 4. /category/45345345 Show fields in Data category

TODO

# 5. /mappings Show and create mappings

 TODO

