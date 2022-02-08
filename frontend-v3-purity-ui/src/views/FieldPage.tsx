import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useThunkDispatch } from "..";
import { RootState } from "../reducers";
import { Field } from "../types";
import { CREATE_FIELD_REQUEST, CREATE_FIELD_SUCCESS, UPDATE_FIELD_REQUEST, UPDATE_FIELD_SUCCESS } from "../types/actions/Types";

export const FieldPage = () => {
  const params = useParams<{ id: string }>();
  const idFromParams = params.id;

  const field = useSelector<RootState, Field | undefined>(state => state.fields.find(f => f.id === idFromParams));
  const dispatch = useThunkDispatch();
  const navigate = useNavigate();

  const [id, setId] = useState(field?.id || '');
  const [description, setDescription] = useState(field?.description || '');
  const [personalData, setPersonalData] = useState(field?.personalData || false);
  const [specialCategoryPersonalData, setSpecialCategoryPersonalData] = useState(field?.specialCategoryPersonalData || false);

  const handleSave = () => {
    const fieldToDispatch = { id, description, personalData, specialCategoryPersonalData };
    dispatch({ type: field ? UPDATE_FIELD_REQUEST : CREATE_FIELD_REQUEST, field: fieldToDispatch });
    // TODO: actual API call
    dispatch({ type: field ? UPDATE_FIELD_SUCCESS : CREATE_FIELD_SUCCESS, field: fieldToDispatch });
    navigate('/fields', { replace: true })
  }

  return (
    <>
      <h2>{id ? `Field ${id}` : 'New field'}</h2>

      <Col lg={6} xl={4}>
        <Form.Group className="mb-2">
          <Form.Label>ID</Form.Label>
          <Form.Control value={id} readOnly={Boolean(field)} onChange={e => setId(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Description</Form.Label>
          <Form.Control value={description} onChange={e => setDescription(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Personal data</Form.Label>
          <Form.Check type='checkbox' checked={personalData} onChange={e => setPersonalData(e.target.checked)} />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Special category personal data</Form.Label>
          <Form.Check type='checkbox' checked={specialCategoryPersonalData} onChange={e => setSpecialCategoryPersonalData(e.target.checked)} />
        </Form.Group>
      </Col>

      <Button variant='success' onClick={handleSave}>Save</Button>
    </>
  )
}