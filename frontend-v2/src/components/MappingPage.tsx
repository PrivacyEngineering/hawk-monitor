import { Button, Col, ColProps, Dropdown, Form, Row } from "react-bootstrap"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { newMapping } from "../dummyData"
import { RootState } from "../reducers";
import { AnyMapping } from "../types";
import { MappingFieldsTable } from "./MappingFieldsTable"

export const MappingPage = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const mapping = useSelector<RootState, AnyMapping | undefined>(state => state.mappings.find(m => m.id === id)) as AnyMapping;

  const labels = ['ID', 'Path type', 'Path value', 'Actions'];
  const items = [
    { id: 'user', path: { type: "json", value: "$.body[*].user.email" } }
  ];

  return (
    <>
      <h2>Mapping #{mapping.id}</h2>
      <Row>
        <Col lg={12} xl={6}>
          <Row>
            <ColInput sm={12} md={6} xl={4} label="Service name" mutedText="e.g. my-service" placeholder={mapping.service} readOnly />
            <ColInput sm={12} md={6} xl={4} label="Protocol" mutedText="e.g. HTTP" placeholder={mapping.endpoint.protocol} readOnly />
            <ColInput sm={12} md={6} xl={4} label="Method" mutedText="e.g. POST" placeholder={mapping.endpoint.method} readOnly />
            <ColInput sm={12} md={6} xl={12} label="Path" mutedText="e.g. /api/endpoint" placeholder={mapping.endpoint.path} readOnly />
          </Row>

          <Form.Group className="mb-2">
            <Form.Label>Fields</Form.Label>
            <MappingFieldsTable labels={labels} items={items} />

            <Dropdown>
              <Dropdown.Toggle variant="outline-success" id="dropdown-basic">Add field</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        </Col>

        <Col lg={12} xl={6}>
          <Form.Group className="mb-2">
            <Form.Label>Mapping result</Form.Label>
            <Form.Control as="textarea" style={{ height: '35vh' }} type="text" placeholder={JSON.stringify(newMapping, null, 4)} readOnly />
          </Form.Group>
        </Col>
      </Row>
      <Button variant='success'>Save</Button>
    </>
  )
}

const ColInput = (props: ColProps & { label: string, mutedText: string, placeholder?: string, readOnly?: boolean }) => {
  return (
    <Col xs={props.xs} sm={props.sm} md={props.md} lg={props.lg} xl={props.xl}>
      <Form.Group className="mb-2">
        <Form.Label>{props.label}</Form.Label>
        <Form.Control placeholder={props.placeholder} readOnly={props.readOnly} />
        <Form.Text className="text-muted">{props.mutedText}</Form.Text>
      </Form.Group>
    </Col>
  )
}
