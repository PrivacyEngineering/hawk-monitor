import { Button } from "react-bootstrap"
import { BsPlusLg } from "react-icons/bs"
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
      <p>These mappings will be used to trace processing of privacy-related data in your system. Please keep them up to date.</p>
      <ExistingMappingsTable items={existingMappings} />
    </>
  )
}

const UnmappedEndpoints = () => {
  return (
    <>
      <h2>Unmapped endpoints</h2>
      <p>
        We have detected that your system uses following endpoints, but mappings for them are not yet created.<br />
        Please add the missing mappings here and retroactively map your system's API endpoint calls to particular privacy-related data categories.</p>
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
      <p>
        <b>Fields</b> are meta-structures to enabling hassle-free assignment of privacy categories to endpoints.<br />
        Assign fields to endpoints and save yourself thinking about data privacy categories for good!
      </p>
      <Button variant="success"><BsPlusLg /> Add new field</Button>
      <FieldsTable items={fields} />
    </>
  )
}
