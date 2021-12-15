import { Button, Table } from "react-bootstrap";
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";
import { ExistingMapping, TableProps, TableRowProps } from "../types";
import { TableHeader } from "./TableHeader";

export const ExistingMappingsTable = (props: TableProps<ExistingMapping>) => {
  const { labels, items } = props;

  return (
    <Table style={{ 'width': 'unset' }}>
      <TableHeader labels={labels} />
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
        <Button variant='warning' size="sm"><BsPencilFill /> Edit</Button>{' '}
        <Button variant='danger' size="sm"><BsFillTrashFill /> Remove</Button>
      </td>
    </tr>
  )
}