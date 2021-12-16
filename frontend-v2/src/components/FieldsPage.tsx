import { Button, Col, Table } from "react-bootstrap"
import { BsCheckSquareFill, BsFillTrashFill, BsPencilFill } from "react-icons/bs";
import { Field, TableRowProps } from "../types"
import { TableHeader } from "./TableHeader";

export const FieldsPage = () => {
  const labels = ['ID', 'Description', 'Personal data', 'Special categories personal data', 'Actions'];
  const items: Field[] = [
    { id: 'city', description: 'City name with Alpha-2 country code', personalData: false, specialCategoryPersonalData: false },
    { id: 'user', description: 'User data', personalData: true, specialCategoryPersonalData: false },
    { id: 'blood-test', description: 'Blood test results', personalData: true, specialCategoryPersonalData: true },
  ];

  return (
    <>
      <h2>Fields</h2>
      <p>
        <b>Fields</b> are meta-structures to enable hassle-free assignment of privacy categories to endpoints.<br />
        Assign fields to endpoints and save yourself thinking about data privacy categories for good!
      </p>
      <Col xl={8}>
        <Table>
          <TableHeader labels={labels} />
          <tbody>{items.map((item, index) => <FieldsTableRow key={index} item={item} />)}</tbody>
        </Table>
        <Button variant="success"><BsPencilFill /> Create Field</Button>
      </Col>
    </>
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
        <Button variant='warning' size="sm"><BsPencilFill /> Edit</Button>{' '}
        <Button variant='danger' size="sm"><BsFillTrashFill /> Remove</Button>
      </td>
    </tr>
  )
}
