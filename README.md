# Transparency Log

## First idea

Our first idea was to create a _Dashboard_, where the user can see all the outputs from our transparency library. \
We defined a `trace` data structure for saving transparency records:

```json
{
  "requestService": "service-1",
  "responseService": "service-2",
  "timestamp": "2020-11-18T11:50Z",
  "data": {
    "entity": "database/tablename",
    "identity": { "id": 1 },
    "properties": ["prop-x", "prop-y"]
  },
  "purpose": {
    "type": "purpose-type-x",
    "formatted": "Action x dispatched"
  }
}
```

The following table gives the general impression how the transparency data can be displayed:

| Request Service | Response Service | Data           | Purpose             | Timestamp        |
| --------------- | ---------------- | -------------- | ------------------- | ---------------- |
| service-1       | service-2        | prop-x, prop-y | Action x dispatched | 18.11.2021 11:53 |
| service-1       | service-2        | prop-x, prop-y | Action x dispatched | 18.11.2021 11:52 |

The `query` data structure gives an impression how the data could be queried:

```json
{
  "service": "service-name",
  "entity": "database/tablename",
  "identity": { "key": "value" }
}
```

### Implementation

The [frontend](frontend) directory contains a React frontend that renders [dummy transparency data](frontend/src/dummyData.ts) in the `trace` format. Go to the folder to find out more about runnning the webapp locally or building the static website.
![](screenshot.png)

## Second try

We realized some limitations of the first approach and also very informative, but less entertaining style of the dashboard.

Instead of defining new data structures again, we tried to better understand the use case for our dashboard.
We moved our focus from the _user of the product_ to the _data controller_ and providing better overview of the system.
We also considered different data aggregation and filtering scenarios through.

### Two views

Instead of showing one big table with all requests, we've come to the conclusion that the dashboard should provide two views: `overview` and `requests`. In the `overview`, the user should be able to:

- compare the amount of traffic between different services,
- get general insights on the purpose of all the traffic happening in the system.

This could be implemented in a way similar to the [Service Dependency Graph](https://github.com/NovatecConsulting/novatec-service-dependency-graph-panel):

![Service Dependency Graph In Action](https://novatecconsulting.github.io/novatec-service-dependency-graph-panel/images/service-dependency-graph-panel.gif)

In the `requests`, the user should be able to:

- get details of any single request exchanged between any two services,
- get detailed insigths on a limited number of some requests that share similar characteristics.

In other words, the `requests` will more or less be the table from our first approach, with the restricton that the number of requests displayed will be limited.

### Implementation
TBD
