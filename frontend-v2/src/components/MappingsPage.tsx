import { Button, Col, Table } from "react-bootstrap"
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import { Mapping, MappingBase, TableRowProps } from "../types"
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
  const labels = ['Service ID', 'Protocol', 'Method', 'Endpoint', 'Attached Fields', 'Actions'];
  const items: Mapping[] = [
    { id: '1', service: 'orders', endpoint: { protocol: 'HTTP', method: 'POST', path: '/create', }, fields: ['user', 'city'] },
    { id: '2', service: 'statistics', endpoint: { protocol: 'HTTP', method: 'POST', path: '/revenue', }, fields: [] },
    { id: '3', service: 'user', endpoint: { protocol: 'HTTP', method: 'POST', path: '/newsletter', }, fields: ['user'] },
    { id: '4', service: 'user', endpoint: { protocol: 'HTTP', method: 'POST', path: '/signup', }, fields: ['user', 'city'] },
  ];

  return (
    <Col xl={10}>
      <h2>Existing mappings</h2>
      <p><b>Mappings</b> are used to trace processing of privacy-related data in your system. Please keep them up to date.</p>
      <Table>
        <TableHeader labels={labels} />
        <tbody>{items.map((item, index) => <ExistingMappingsTableRow key={index} item={item} />)}</tbody>
      </Table>
    </Col>
  )
}

const ExistingMappingsTableRow = (props: TableRowProps<Mapping>) => {
  const { item } = props;

  return (
    <tr>
      <td><b>{item.service}</b></td>
      <td>{item.endpoint.protocol}</td>
      <td>{item.endpoint.method}</td>
      <td>{item.endpoint.path}</td>
      <td>{item.fields.length ? item.fields.join(', ') : '-'}</td>
      <td style={{ 'width': '170px' }}>
        <Link to={item.id} state={{ ...item }}><Button variant='warning' size="sm"><BsPencilFill /> Edit</Button></Link>{' '}
        <Button variant='danger' size="sm"><BsFillTrashFill /> Remove</Button>
      </td>
    </tr>
  )
}

const UnmappedEndpoints = () => {
  const labels = ['Service ID', 'Protocol', 'Method', 'Endpoint', 'Actions'];
  const items: MappingBase[] = [
    { id: '5', service: 'payment', endpoint: { protocol: 'HTTP', method: 'GET', path: '/pay/once' } },
    { id: '6', service: 'payment', endpoint: { protocol: 'HTTP', method: 'GET', path: '/pay/recurring' } },
    { id: '7', service: 'statistics', endpoint: { protocol: 'HTTP', method: 'GET', path: '/successful-payment' } },
  ]

  return (
    <Col xl={10}>
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

const UnmappedEndpointsTableRow = (props: TableRowProps<MappingBase>) => {
  const { item } = props;

  return (
    <tr>
      <td><b>{item.service}</b></td>
      <td>{item.endpoint.protocol}</td>
      <td>{item.endpoint.method}</td>
      <td>{item.endpoint.path}</td>
      <td style={{ 'width': '170px' }}>
        <Link to='new'><Button variant='success' size="sm"><BsPencilFill /> Create mapping</Button></Link>
      </td>
    </tr>
  )
}
