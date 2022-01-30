import { useState } from "react";
import { Button, Col, Dropdown, Form, Row, Table } from "react-bootstrap"
import { BsFillTrashFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useThunkDispatch } from "..";
import { RootState } from "../reducers";
import { AnyMapping, Field, MappingFieldReference } from "../types";
import { UPDATE_MAPPING_REQUEST, UPDATE_MAPPING_SUCCESS } from "../types/actions/Types";
import { ColInput } from "./ColInput";
import { TableHeader } from "./TableHeader";

export const MappingPage = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const fields = useSelector<RootState, Field[]>(state => state.fields);
  const mapping = useSelector<RootState, AnyMapping | undefined>(state => state.mappings.find(m => m.id === id)) as AnyMapping;

  const dispatch = useThunkDispatch();
  const navigate = useNavigate();

  const [fieldRefs, setFieldRefs] = useState(mapping.fields || []);
  const deleteFieldRef = (fieldRef: MappingFieldReference) => setFieldRefs([...fieldRefs.filter(x => x !== fieldRef)]);
  const addFieldRef = (fieldId: string) => setFieldRefs([...fieldRefs, { id: fieldId, path: { type: '', value: '' } }]);

  const handleSave = () => {
    const mappingToDispatch = { ...mapping, fields: fieldRefs };
    dispatch({ type: UPDATE_MAPPING_REQUEST, mapping: mappingToDispatch });
    // TODO: actual API call
    dispatch({ type: UPDATE_MAPPING_SUCCESS, mapping: mappingToDispatch });
    navigate('/mappings', { replace: true })
  }

  return (
    <>
      <h2>Mapping #{mapping.id}</h2>
      <Col lg={12} xl={10}>
        <Row>
          <ColInput sm={12} md={6} xl={4} label="Service name" mutedText="e.g. my-service" value={mapping.service} readOnly />
          <ColInput sm={12} md={6} xl={4} label="Protocol" mutedText="e.g. HTTP" value={mapping.endpoint.protocol} readOnly />
          <ColInput sm={12} md={6} xl={4} label="Method" mutedText="e.g. POST" value={mapping.endpoint.method} readOnly />
          <ColInput sm={12} md={6} xl={12} label="Path" mutedText="e.g. /api/endpoint" value={mapping.endpoint.path} readOnly />
        </Row>

        <Form.Group className="mb-2">
          <Form.Label>Fields</Form.Label>
          <Table>
            <TableHeader labels={['ID', 'Path type', 'Path value', 'Actions']} />
            <tbody>{fieldRefs.sort((a, b) => a.id.localeCompare(b.id)).map((item, index) =>
              <tr key={index}>
                <td><b>{item.id}</b></td>
                <td><ColInput value={item.path.type}></ColInput></td>
                <td><ColInput value={item.path.value}></ColInput></td>
                <td><Button variant='danger' onClick={() => deleteFieldRef(item)}><BsFillTrashFill /></Button></td>
              </tr>
            )}
            </tbody>
          </Table>

          <Dropdown>
            <Dropdown.Toggle variant="outline-success" id="dropdown-basic">Add field</Dropdown.Toggle>
            <Dropdown.Menu>{fields.filter(f => !fieldRefs.map(fieldRef => fieldRef.id).includes(f.id)).map(f => <Dropdown.Item key={f.id} onClick={() => addFieldRef(f.id)}>{f.id}</Dropdown.Item>)}</Dropdown.Menu>
          </Dropdown>
        </Form.Group>
      </Col>
      <Button variant='success' onClick={handleSave}>Save</Button>
    </>
  )
}
