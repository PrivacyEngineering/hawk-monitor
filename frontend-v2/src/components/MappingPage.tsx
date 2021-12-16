import { Button, Col, ColProps, Dropdown, Form, Row } from "react-bootstrap"
// import { useLocation } from "react-router-dom";
import { newMapping } from "../dummyData"
import { MappingFieldsTable } from "./MappingFieldsTable"

export const MappingPage = () => {
  // const location = useLocation();
  // const { id } = location.state;
  const labels = ['ID', 'Path type', 'Path value', 'Actions'];
  const items = [
    { id: 'user', path: { type: "json", value: "$.body[*].user.email" } }
  ];

  return (
    <>
      <h2>Mapping</h2>
      <Row>
        <Col lg={12} xl={6}>
          <Row>
            <ColInput sm={12} md={6} xl={4} label="Service name" mutedText="e.g. my-service" />
            <ColInput sm={12} md={6} xl={4} label="Protocol" mutedText="e.g. HTTP" />
            <ColInput sm={12} md={6} xl={4} label="Method" mutedText="e.g. POST" />
            <ColInput sm={12} md={6} xl={12} label="Path" mutedText="e.g. /api/endpoint" />
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

const ColInput = (props: ColProps & { label: string, mutedText: string }) => {
  return (
    <Col xs={props.xs} sm={props.sm} md={props.md} lg={props.lg} xl={props.xl}>
      <Form.Group className="mb-2">
        <Form.Label>{props.label}</Form.Label>
        <Form.Control />
        <Form.Text className="text-muted">{props.mutedText}</Form.Text>
      </Form.Group>
    </Col>
  )
}
