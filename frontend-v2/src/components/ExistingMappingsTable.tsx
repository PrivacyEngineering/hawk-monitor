import { Button, Form, Table } from "react-bootstrap";
import { ExistingMapping, Field, TableProps, TableRowProps } from "../types";
import { TableHeader } from "./TableHeader";

export const ExistingMappingsTable = (props: TableProps<ExistingMapping>) => {
  const { items } = props;

  return (
    <Table>
      <TableHeader labels={['Service name', 'Endpoint', 'HTTP status code', 'Actions']} />
      <tbody>{items.map(item => <ExistingMappingsTableRow item={item} />)}</tbody>
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
      <td><Button variant='warning' size="sm">Edit</Button> <Button variant='danger' size="sm">Delete</Button></td>
    </tr>
  )
}