import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RequestsByServicePair, TableProps, TableRowProps } from "../types";
import { TableHeader } from "./TableHeader";

export const ServicePairsTable = (props: TableProps<RequestsByServicePair>) => {
  const { labels, items } = props;

  return (
    <Table style={{ 'width': 'unset' }}>
      {/* <Table> */}
      <TableHeader labels={labels} />
      <tbody>{items.map((item, index) => <ServicePairsRow key={index} item={item} />)}</tbody>
    </Table>
  )
}

const ServicePairsRow = (props: TableRowProps<RequestsByServicePair>) => {
  const { item } = props;

  return (
    <tr>
      <td><b>{item.requestor}</b></td>
      <td><b>{item.provider}</b></td>
      <td>{item.count}</td>
      <td>{item.lastInvocation}</td>
      <td><Link to={'#'}>details</Link></td>
    </tr>
  )
}