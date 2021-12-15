import { Button } from "react-bootstrap"
import { BsPencilFill } from "react-icons/bs";
import { Field } from "../types"
import { FieldsTable } from "./FieldsTable"

export const FieldsPage = () => {
  const labels = ['ID', 'Description', 'Personal data', 'Special categories personal data', 'Actions'];
  const fields: Field[] = [
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
      <FieldsTable labels={labels} items={fields} />
      <Button variant="success"><BsPencilFill /> Create Field</Button>
    </>
  )
}
