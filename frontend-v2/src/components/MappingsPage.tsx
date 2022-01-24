import { Button, Col, Table } from "react-bootstrap"
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { RootState } from "../reducers"
import { AnyMapping, Mapping, TableRowProps } from "../types"
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
  const labels = ['ID', 'Service', 'Protocol', 'Method', 'Endpoint', 'Attached Fields', 'Actions'];
  const items = useSelector<RootState, AnyMapping[]>(state => state.mappings.filter(m => m.fields !== undefined)) as Mapping[];

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
      <td>{item.id}</td>
      <td><b>{item.service}</b></td>
      <td>{item.endpoint.protocol}</td>
      <td>{item.endpoint.method}</td>
      <td>{item.endpoint.path}</td>
      <td>{item.fields.length ? item.fields.map(f=> f.id).join(', ') : '-'}</td>
      <td style={{ 'width': '170px' }}>
        <Link to={item.id} state={{ ...item }}><Button variant='warning' size="sm"><BsPencilFill /> Edit</Button></Link>{' '}
        <Button variant='danger' size="sm"><BsFillTrashFill /> Remove</Button>
      </td>
    </tr>
  )
}

const UnmappedEndpoints = () => {
  const labels = ['ID', 'Service', 'Protocol', 'Method', 'Endpoint', 'Actions'];
  const items = useSelector<RootState, AnyMapping[]>(state => state.mappings.filter(m => m.fields === undefined));

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

const UnmappedEndpointsTableRow = (props: TableRowProps<AnyMapping>) => {
  const { item } = props;

  return (
    <tr>
      <td>{item.id}</td>
      <td><b>{item.service}</b></td>
      <td>{item.endpoint.protocol}</td>
      <td>{item.endpoint.method}</td>
      <td>{item.endpoint.path}</td>
      <td style={{ 'width': '170px' }}>
        <Link to={item.id}><Button variant='success' size="sm"><BsPencilFill /> Create mapping</Button></Link>
      </td>
    </tr>
  )
}
