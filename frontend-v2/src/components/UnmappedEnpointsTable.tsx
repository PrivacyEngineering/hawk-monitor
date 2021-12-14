import { Button, Table } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import { TableProps, TableRowProps, UnmappedEndpoint } from "../types";
import { TableHeader } from "./TableHeader";

export const UnmappedEndpointsTable = (props: TableProps<UnmappedEndpoint>) => {
  const { items } = props;

  return (
    <Table style={{ 'width': 'unset' }}>
      <TableHeader labels={['Service ID', 'Endpoint', 'HTTP status code', 'Actions']} />
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
        <Button variant='success' size="sm"><BsPlusLg /></Button>
      </td>
    </tr>
  )
}