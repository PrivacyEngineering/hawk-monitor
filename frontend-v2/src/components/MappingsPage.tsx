import { Button, Col, Table } from "react-bootstrap"
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import { ExistingMapping, TableRowProps, UnmappedEndpoint } from "../types"
import { TableHeader } from "./TableHeader"

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
  const items: ExistingMapping[] = [
    { id: '1', service: 'orders', endpoint: '/create', httpStatusCode: 201, attachedFields: ['user', 'city'] },
    { id: '2', service: 'statistics', endpoint: '/revenue', httpStatusCode: 201, attachedFields: [] },
    { id: '3', service: 'user', endpoint: '/newsletter', httpStatusCode: 200, attachedFields: ['user'] },
    { id: '4', service: 'user', endpoint: '/signup', httpStatusCode: 201, attachedFields: ['user', 'city'] },
  ];

  return (
    <Col xl={8}>
      <h2>Existing mappings</h2>
      <p><b>Mappings</b> are used to trace processing of privacy-related data in your system. Please keep them up to date.</p>
      <Table>
        <TableHeader labels={labels} />
        <tbody>{items.map((item, index) => <ExistingMappingsTableRow key={index} item={item} />)}</tbody>
      </Table>
    </Col>
  )
}

const ExistingMappingsTableRow = (props: TableRowProps<ExistingMapping>) => {
  const { item } = props;

  return (
    <tr>
      <td><b>{item.service}</b></td>
      <td>{item.endpoint}</td>
      <td>{item.httpStatusCode}</td>
      <td>{item.attachedFields.length ? item.attachedFields.join(', ') : '-'}</td>
      <td style={{ 'width': '170px' }}>
        <Link to={item.id} state={{ ...item }}><Button variant='warning' size="sm"><BsPencilFill /> Edit</Button></Link>{' '}
        <Button variant='danger' size="sm"><BsFillTrashFill /> Remove</Button>
      </td>
    </tr>
  )
}

const UnmappedEndpoints = () => {
  const labels = ['Service ID', 'Endpoint', 'HTTP status code', 'Actions'];
  const items: UnmappedEndpoint[] = [
    { service: 'payment', endpoint: '/pay/once', httpStatusCode: 200 },
    { service: 'payment', endpoint: '/pay/recurring', httpStatusCode: 200 },
    { service: 'statistics', endpoint: '/successful-payment', httpStatusCode: 200 },
  ]

  return (
    <Col xl={8}>
      <h2>Unmapped endpoints</h2>
      <p>
        The following API endpoints were detected in your system, but mappings for them are not yet created.<br />
        Please add the missing mappings here and retroactively map your system's API endpoint calls to particular privacy-related data categories.
      </p>
      <Table>
        <TableHeader labels={labels} />
        <tbody>{items.map((item, index) => <UnmappedEndpointsTableRow key={index} item={item} />)}</tbody>
      </Table>
    </Col>
  )
}

const UnmappedEndpointsTableRow = (props: TableRowProps<UnmappedEndpoint>) => {
  const { item } = props;

  return (
    <tr>
      <td><b>{item.service}</b></td>
      <td>{item.endpoint}</td>
      <td>{item.httpStatusCode}</td>
      <td style={{ 'width': '170px' }}>
        <Link to='new'><Button variant='success' size="sm"><BsPencilFill /> Create mapping</Button></Link>
      </td>
    </tr>
  )
}
