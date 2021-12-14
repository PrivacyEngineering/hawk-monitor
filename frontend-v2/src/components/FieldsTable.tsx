import { Button, Form, Table } from "react-bootstrap";
import { Field, TableProps, TableRowProps } from "../types";
import { TableHeader } from "./TableHeader";

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
      <td><Form.Check readOnly aria-label="Indicates personal data" checked={item.personalData} /></td>
      <td><Form.Check readOnly aria-label="Indicates special category vpersonal data" checked={item.specialCategoryPersonalData} /></td>
      <td><Button variant='warning' size="sm">Edit</Button> <Button variant='danger' size="sm">Delete</Button></td>
    </tr>
  )
}