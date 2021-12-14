import { Button, Table } from "react-bootstrap";
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";
import { ExistingMapping, TableProps, TableRowProps } from "../types";
import { TableHeader } from "./TableHeader";

export const ExistingMappingsTable = (props: TableProps<ExistingMapping>) => {
  const { items } = props;

  return (
    <Table style={{ 'width': 'unset' }}>
      <TableHeader labels={['Service ID', 'Endpoint', 'HTTP status code', 'Attached Fields', 'Actions']} />
      <tbody>{items.map((item, index) => <ExistingMappingsTableRow key={index} item={item} />)}</tbody>
    </Table>
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
      <td>
        <Button variant='warning' size="sm"><BsPencilFill /></Button>{' '}
        <Button variant='danger' size="sm"><BsFillTrashFill /></Button>
      </td>
    </tr>
  )
}