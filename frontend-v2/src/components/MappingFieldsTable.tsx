import { Button, Table } from "react-bootstrap"
import { BsFillTrashFill } from "react-icons/bs";
import { MappingFieldReference, TableProps, TableRowProps } from "../types";
import { TableHeader } from "./TableHeader"

export const MappingFieldsTable = (props: TableProps<MappingFieldReference>) => {
  const { labels, items } = props;
  return (
    <Table>
      <TableHeader labels={labels} />
      <tbody>{items.map((item, index) => <MappingFieldsTableRow key={index} item={item} />)}</tbody>
    </Table>
  )
}

const MappingFieldsTableRow = (props: TableRowProps<MappingFieldReference>) => {
  const { item } = props;
  return (
    <tr>
      <td><b>{item.id}</b></td>
      <td>{item.path.type}</td>
      <td>{item.path.value}</td>
      <td>
        <Button variant='danger' size="sm"><BsFillTrashFill /> Remove</Button>
      </td>
    </tr>
  )
}