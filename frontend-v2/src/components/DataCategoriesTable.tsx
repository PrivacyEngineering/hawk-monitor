import { Table } from "react-bootstrap";
import { DataCategory, TableProps, TableRowProps } from "../types";
import { TableHeader } from "./TableHeader";

export const DataCategoriesTable = (props: TableProps<DataCategory>) => {
  const { labels, items } = props;

  return (
    <Table style={{ 'width': 'unset' }}>
      {/* <Table> */}
      <TableHeader labels={labels} />
      <tbody>{items.map((item, index) => <DataCategoriesTableRow key={index} item={item} />)}</tbody>
    </Table>
  )
}

const DataCategoriesTableRow = (props: TableRowProps<DataCategory>) => {
  const { item } = props;

  return (
    <tr>
      <td><b>{item.name}</b></td>
      <td>{item.value.toLocaleString(undefined, { style: 'percent' })}</td>
    </tr>
  )
}