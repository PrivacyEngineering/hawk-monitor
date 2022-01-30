import { useState } from "react";
import { Button, Col, Modal, Table } from "react-bootstrap"
import { BsCheckSquareFill, BsFillTrashFill, BsPencilFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useThunkDispatch } from "..";
import { RootState } from "../reducers";
import { Field, NormalizedState } from "../types"
import { DELETE_FIELD_REQUEST, DELETE_FIELD_SUCCESS } from "../types/actions/Types";
import { TableHeader } from "./TableHeader";

export const FieldsPage = () => {
  const fields = useSelector<RootState, Field[]>(state => state.fields);
  const fieldsBeingDeleted = useSelector<RootState, NormalizedState<boolean | undefined>>(state => state.fieldsBeingDeleted);
  const dispatch = useThunkDispatch();
  const navigate = useNavigate();

  const [fieldToDelete, setFieldToDelete] = useState<Field>();
  const handleModalShow = (field: Field) => setFieldToDelete(field);
  const handleModalClose = () => setFieldToDelete(undefined);

  const handleDelete = (fieldToDelete: Field) => {
    if (!fieldsBeingDeleted[fieldToDelete.id]) {
      dispatch({ type: DELETE_FIELD_REQUEST, field: fieldToDelete });
      // TODO: wrap in actual API calls
      dispatch({ type: DELETE_FIELD_SUCCESS, field: fieldToDelete });
    }
    handleModalClose();
  }

  return (
    <>
      <h2>Fields</h2>
      <p>
        <b>Fields</b> are meta-structures to enable hassle-free assignment of privacy categories to endpoints.<br />
        Assign fields to endpoints and save yourself thinking about data privacy categories for good!
      </p>
      <Col xl={10}>
        <Table>
          <TableHeader labels={['ID', 'Description', 'Personal data', 'Special categories personal data', 'Actions']} />
          <tbody>
            {fields.sort((a, b) => a.id.localeCompare(b.id)).map((field, index) =>
              <tr key={index}>
                <td><b>{field.id}</b></td>
                <td>{field.description}</td>
                <td>{field.personalData ? <BsCheckSquareFill /> : '-'}</td>
                <td>{field.specialCategoryPersonalData ? <BsCheckSquareFill /> : '-'}</td>
                <td>
                  <Button variant='warning' size="sm" onClick={() => navigate(`/fields/${field.id}`, { replace: true })}><BsPencilFill /> Edit</Button>{' '}
                  {fieldsBeingDeleted[field.id] ?
                    <Button variant='danger' size="sm" disabled><BsFillTrashFill /> Removing...</Button> :
                    <Button variant='danger' size="sm" onClick={() => handleModalShow(field)}><BsFillTrashFill /> Remove</Button>}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <Button variant="success" href="/fields/new"><BsPencilFill /> Create Field</Button>
      </Col>

      {fieldToDelete &&
        <Modal show onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure to delete the field <b>{fieldToDelete.id}</b>?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
            <Button variant="danger" onClick={() => handleDelete(fieldToDelete)}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      }
    </>
  )
}
