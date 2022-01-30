import { useEffect, useState } from "react"
import { Button, Col, Table } from "react-bootstrap"
import { BsPencilFill } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { RootState } from "../reducers"
import { AnyMapping, Field, Mapping, MappingFieldReference, TableRowProps } from "../types"
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
  const labels = ['ID', 'Service', 'Protocol', 'Method', 'Endpoint', 'Attached Fields', 'Inferred data categories', 'Actions'];
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
      <td>{item.fields.length ? item.fields.map(f => f.id).join(', ') : '-'}</td>
      <td><InferredDataCategories fieldRefs={item.fields} /></td>
      <td style={{ 'width': '140px' }}>
        <Link to={item.id} state={{ ...item }}><Button variant='warning' size="sm"><BsPencilFill /> Edit fields</Button></Link>{' '}
      </td>
    </tr>
  )
}

const InferredDataCategories = (props: { fieldRefs: MappingFieldReference[] }) => {
  const { fieldRefs } = props;
  const fields = useSelector<RootState, Field[]>(state => state.fields);
  const [personal, setPersonal] = useState(false);
  const [special, setSpecial] = useState(false);
  
  useEffect(() => {
    const mappedFields = fields.filter(f => fieldRefs.some(ref => ref.id === f.id));
    setPersonal(mappedFields.map(f => f.personalData).reduce((res, cur) => res || cur, false));
    setSpecial(mappedFields.map(f => f.specialCategoryPersonalData).reduce((res, cur) => res || cur, false));
  }, [fieldRefs, fields]);

  return (
    <>
      {personal && special && 'personal, special'}
      {personal && !special && 'personal'}
      {!personal && special && 'special'}
      {!personal && !special && '-'}
    </>
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
      <td style={{ 'width': '140px' }}>
        <Link to={item.id}><Button variant='success' size="sm"><BsPencilFill /> Attach fields</Button></Link>
      </td>
    </tr>
  )
}
