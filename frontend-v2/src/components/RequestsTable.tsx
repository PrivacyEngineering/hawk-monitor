import { Table } from "react-bootstrap";
import { requests } from "../dummyData";
import { Request, TableRowProps } from "../types";
import { TableHeader } from "./TableHeader";

export const RequestsTable = () => {
  const labels = ['Timestamp', 'Requestor', 'Provider', 'Cause'];

  const items = requests;
  return (
    <>
      <Table style={{ 'width': 'unset' }}>
        <TableHeader labels={labels} />
        <tbody>{items.map((item, index) => <RequestsTableRow key={index} item={item} />)}</tbody>
      </Table>
    </>
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


