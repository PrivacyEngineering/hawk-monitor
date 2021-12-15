import { Col, Placeholder, Row } from "react-bootstrap"
import { DataCategory, RequestsByEndpoint, RequestsByServicePair } from "../types"
import { DataCategoriesTable } from "./DataCategoriesTable"
import { EndpointsTable } from "./EndpointsTable"
import { ServicePairsTable } from "./ServicePairsTable"

export const HomePage = () => {
  return (
    <>
      <Row>
        <h2>Your services</h2>
        <Col className="pb-3">
          <p>(here comes a service graph <a href="https://novatecconsulting.github.io/novatec-service-dependency-graph-panel/images/service-dependency-graph-panel.gif">in this style</a>)</p>
          <Placeholder style={{ height: '350px' }} xs={12} bg="success" />
        </Col>

      </Row>
      <Row>
        <Col lg={12} xl={6} className="pb-3">
          <ServicePairs />
        </Col>
        <Col lg={12} xl={6} className="pb-3">
          <Endpoints />
        </Col>
        <Col lg={12} xl={4} className="pb-3">
          <DataCategories />
        </Col>
      </Row>
    </>
  )
}

const ServicePairs = () => {
  const labels = ['Requestor', 'Provider', 'Count', 'Last invocation time', 'Details'];
  const items: RequestsByServicePair[] = [
    { requestor: 'newsletter', provider: 'user', count: 23423, lastInvocation: '2021-12-06 16:00:12' },
    { requestor: 'frontend', provider: 'user', count: 7468, lastInvocation: '2021-12-06 16:00:12' },
  ];

  return (
    <>
      <h2>Service pairs</h2>
      Requests grouped by Service pairs
      <ServicePairsTable labels={labels} items={items} />
    </>
  )
}

const Endpoints = () => {
  const labels = ['Provider', 'Endpoint', 'Count', 'Last invocation time', 'Details'];
  const items: RequestsByEndpoint[] = [
    { provider: 'user', endpoint: '/newsletter', count: 23423, lastInvocation: '2021-12-06 16:00:12' },
    { provider: 'user', endpoint: '/signup', count: 7468, lastInvocation: '2021-12-06 16:00:12' },
  ]
  return (
    <>
      <h2>Endpoints</h2>
      Requests grouped by Endpoint
      <EndpointsTable labels={labels} items={items} />
    </>
  )
}

const DataCategories = () => {
  const labels = ['Name', 'Percent'];
  const items: DataCategory[] = [
    { id: 'rest', name: '-', value: 0.1553 },
    { id: 'personal', name: 'Personal data', value: 0.7823 },
    { id: 'special', name: 'Special category personal data', value: 0.0624 },
  ];
  return (
    <>
      <h2>Data categories</h2>
      <DataCategoriesTable labels={labels} items={items} />
    </>
  )
}
