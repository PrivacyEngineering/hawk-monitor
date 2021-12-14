import { Col, Row } from "react-bootstrap"
import { DataCategory } from "../types"
import { DataCategoriesTable } from "./DataCategoriesTable"

export const HomePage = () => {
  return (
    <>
      <Row>
        <Col lg={6} xl={4} className="pb-3">
          <ServicePairs />
        </Col>
        <Col lg={6} xl={4} className="pb-3">
          <Endpoints />
        </Col>
        <Col xl={4} className="pb-3">
          <DataCategories />
        </Col>
      </Row>
    </>
  )
}

const ServicePairs = () => {
  return (
    <>
      <h2>Service pairs</h2>
      Requests grouped by Service pairs
    </>
  )
}

const Endpoints = () => {
  return (
    <>
      <h2>Endpoints</h2>
      Requests grouped by Endpoint
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
