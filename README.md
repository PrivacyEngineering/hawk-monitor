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
