import { Button, Col, Row } from "react-bootstrap"
import { Field } from "../types"
import { FieldsTable } from "./FieldsTable"

export const MappingsPage = () => {
  return (
    <>
      <h1>Configuration</h1>
      <Row>
        <Col>
          <ExistingMappings />
          <UnmappedEndpoints />
        </Col>
        <Col>
          <Fields />
        </Col>
      </Row>

    </>
  )
}

const ExistingMappings = () => {
  return (
    <>
      <h2>Existing mappings</h2>
    </>
  )
}

const UnmappedEndpoints = () => {
  return (
    <>
      <h2>Unmapped endpoints</h2>
    </>
  )
}

const Fields = () => {
  const fields: Field[] = [
    { id: 'city', description: 'City name with Alpha-2 country code', personalData: false, specialCategoryPersonalData: false },
    { id: 'user', description: 'User data', personalData: true, specialCategoryPersonalData: false },
    { id: 'blood-test', description: 'Blood test results', personalData: true, specialCategoryPersonalData: true },
  ];

  return (
    <>
      <h2>Fields</h2>
      <Button variant="success">Add new</Button>
      <FieldsTable items={fields} />
    </>
  )
}
