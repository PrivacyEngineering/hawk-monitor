import { Button, Table } from "react-bootstrap"
import { BsFillTrashFill } from "react-icons/bs";
import { MappingField, TableProps, TableRowProps } from "../types";
import { TableHeader } from "./TableHeader"

export const NewMappingFieldsTable = (props: TableProps<MappingField>) => {
  const { labels, items } = props;
  return (
    <Table>
      <TableHeader labels={labels} />
      <tbody>{items.map((item, index) => <NewMappingFieldsTableRow key={index} item={item} />)}</tbody>
    </Table>
  )
}

const NewMappingFieldsTableRow = (props: TableRowProps<MappingField>) => {
  const { item } = props;
  return (
    <tr>
      <td><b>{item.id}</b></td>
      <td>{item.path.type}</td>
      <td>{item.path.value}</td>
      <td>
        <Button variant='danger' size="sm"><BsFillTrashFill /></Button>
      </td>
    </tr>
  )
}