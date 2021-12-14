import { Button, Table } from "react-bootstrap";
import { Field, TableProps, TableRowProps } from "../types";
import { TableHeader } from "./TableHeader";
import { BsCheckSquareFill, BsFillTrashFill, BsPencilFill } from "react-icons/bs";

export const FieldsTable = (props: TableProps<Field>) => {
  const { items } = props;

  return (
    <Table style={{ 'width': 'unset' }}>
      <TableHeader labels={['ID', 'Description', 'Personal data', 'Special categories personal data', 'Actions']} />
      <tbody>{items.map((item, index) => <FieldsTableRow key={index} item={item} />)}</tbody>
    </Table>
  )
}

const FieldsTableRow = (props: TableRowProps<Field>) => {
  const { item } = props;

  return (
    <tr>
      <td><b>{item.id}</b></td>
      <td>{item.description}</td>
      <td>{item.personalData ? <BsCheckSquareFill /> : '-'}</td>
      <td>{item.specialCategoryPersonalData ? <BsCheckSquareFill /> : '-'}</td>
      <td>
        <Button variant='warning' size="sm"><BsPencilFill /></Button>{' '}
        <Button variant='danger' size="sm"><BsFillTrashFill /></Button>
      </td>
    </tr>
  )
}