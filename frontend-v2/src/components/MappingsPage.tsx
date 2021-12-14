import { Button } from "react-bootstrap"
import { ExistingMapping, Field } from "../types"
import { ExistingMappingsTable } from "./ExistingMappingsTable"
import { FieldsTable } from "./FieldsTable"

export const MappingsPage = () => {
  return (
    <>
      <Fields />
      <ExistingMappings />
      <UnmappedEndpoints />
    </>
  )
}

const ExistingMappings = () => {
  const existingMappings: ExistingMapping[] = [
    { service: 'statistics', endpoint: '/login', httpStatusCode: 201, attachedFields: [], mapping: {} },
    { service: 'statistics', endpoint: '/order-placed', httpStatusCode: 201, attachedFields: ['city'], mapping: {} },
    { service: 'user', endpoint: '/newsletter', httpStatusCode: 200, attachedFields: ['user'], mapping: {} },
    { service: 'user', endpoint: '/signup', httpStatusCode: 201, attachedFields: ['user', 'city'], mapping: {} },
  ]

  return (
    <>
      <h2>Existing mappings</h2>
      <ExistingMappingsTable items={existingMappings} />
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
