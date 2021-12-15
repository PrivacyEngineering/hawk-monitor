import { Button, Table } from "react-bootstrap";
import { BsLink45Deg } from "react-icons/bs";
import { Link } from "react-router-dom";
import { RequestsByEndpoint, TableProps, TableRowProps } from "../types";
import { TableHeader } from "./TableHeader";

export const EndpointsTable = (props: TableProps<RequestsByEndpoint>) => {
  const { labels, items } = props;

  return (
    <Table style={{ 'width': 'unset' }}>
      <TableHeader labels={labels} />
      <tbody>{items.map((item, index) => <EndpointsTableRow key={index} item={item} />)}</tbody>
    </Table>
  )
}

const EndpointsTableRow = (props: TableRowProps<RequestsByEndpoint>) => {
  const { item } = props;

  return (
    <tr>
      <td><b>{item.provider}</b></td>
      <td><b>{item.endpoint}</b></td>
      <td>{item.count}</td>
      <td>{item.lastInvocation}</td>
      <td><Link to={'#'}><Button size='sm'><BsLink45Deg /> Details</Button></Link></td>
    </tr>
  )
}