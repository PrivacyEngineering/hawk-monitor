import { Col, Table } from "react-bootstrap";
import { requests } from "../dummyData";
import { Request, TableRowProps } from "../types";
import { TableHeader } from "./TableHeader";

export const RequestsPage = () => {
  const labels = ['Timestamp', 'Requestor', 'Provider', 'Cause'];
  const items = requests;
  return (
    <Col xl={8}>
      <h2>All requests</h2>
      <p><b>Requests</b> allow you to search for specific requests using parameters collected by the transparency service.</p>
      <p>(filters to be implemented)</p>
      <Table>
        <TableHeader labels={labels} />
        <tbody>{items.map((item, index) => <RequestsTableRow key={index} item={item} />)}</tbody>
      </Table>
    </Col>
  )
}

const RequestsTableRow = (props: TableRowProps<Request>) => {
  const { item } = props;

  return (
    <tr>
      <td>{new Date(item.date).toLocaleString()}</td>
      <td>{item.requestor}</td>
      <td>{item.provider}</td>
      <td>to be implemented</td>
    </tr>
  )
}
