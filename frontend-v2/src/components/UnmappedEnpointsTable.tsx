import { Button, Table } from "react-bootstrap";
import { BsPencilFill } from "react-icons/bs";
import { TableProps, TableRowProps, UnmappedEndpoint } from "../types";
import { TableHeader } from "./TableHeader";

export const UnmappedEndpointsTable = (props: TableProps<UnmappedEndpoint>) => {
  const { labels, items } = props;

  return (
    <Table style={{ 'width': 'unset' }}>
      <TableHeader labels={labels} />
      <tbody>{items.map((item, index) => <UnmappedEndpointsTableRow key={index} item={item} />)}</tbody>
    </Table>
  )
}

const UnmappedEndpointsTableRow = (props: TableRowProps<UnmappedEndpoint>) => {
  const { item } = props;

  return (
    <tr>
      <td><b>{item.service}</b></td>
      <td>{item.endpoint}</td>
      <td>{item.httpStatusCode}</td>
      <td>
        <Button variant='success' size="sm"><BsPencilFill /></Button>
      </td>
    </tr>
  )
}