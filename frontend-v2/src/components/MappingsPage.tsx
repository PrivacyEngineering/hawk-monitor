import { ExistingMapping, UnmappedEndpoint } from "../types"
import { ExistingMappingsTable } from "./ExistingMappingsTable"
import { UnmappedEndpointsTable } from "./UnmappedEnpointsTable"

export const MappingsPage = () => {
  return (
    <>
      <ExistingMappings />
      <UnmappedEndpoints />
    </>
  )
}

const ExistingMappings = () => {
  const labels = ['Service ID', 'Endpoint', 'HTTP status code', 'Attached Fields', 'Actions'];
  const existingMappings: ExistingMapping[] = [
    { service: 'orders', endpoint: '/create', httpStatusCode: 201, attachedFields: ['user', 'city'], mapping: {} },
    { service: 'statistics', endpoint: '/revenue', httpStatusCode: 201, attachedFields: [], mapping: {} },
    { service: 'user', endpoint: '/newsletter', httpStatusCode: 200, attachedFields: ['user'], mapping: {} },
    { service: 'user', endpoint: '/signup', httpStatusCode: 201, attachedFields: ['user', 'city'], mapping: {} },
  ]

  return (
    <>
      <h2>Existing mappings</h2>
      <p><b>Mappings</b> are used to trace processing of privacy-related data in your system. Please keep them up to date.</p>
      <ExistingMappingsTable labels={labels} items={existingMappings} />
    </>
  )
}

const UnmappedEndpoints = () => {
  const labels = ['Service ID', 'Endpoint', 'HTTP status code', 'Actions'];
  const unmappedEndpoints: UnmappedEndpoint[] = [
    { service: 'payment', endpoint: '/pay/once', httpStatusCode: 200 },
    { service: 'payment', endpoint: '/pay/recurring', httpStatusCode: 200 },
    { service: 'statistics', endpoint: '/successful-payment', httpStatusCode: 200 },
  ]

  return (
    <>
      <h2>Unmapped endpoints</h2>
      <p>
        The following API endpoints were detected in your system, but mappings for them are not yet created.<br />
        Please add the missing mappings here and retroactively map your system's API endpoint calls to particular privacy-related data categories.
      </p>
      <UnmappedEndpointsTable labels={labels} items={unmappedEndpoints} />
    </>
  )
}
