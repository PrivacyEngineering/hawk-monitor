import { Button, Col, Dropdown, Form, InputGroup, Row } from "react-bootstrap"
import { newMapping } from "../dummyData"
import { NewMappingFieldsTable } from "./NewMappingFieldsTable"

export const NewMapping = () => {
  const labels = ['ID', 'Path type', 'Path value', 'Actions'];
  const items = [
    { id: 'user', path: { type: "json", value: "$.body[*].user.email" } }
  ];

  return (
    <>

      <Row>
        <Col lg={12} xl={6}>
          <h2>Create new mapping</h2>

          <Form.Group className="mb-3">
            <Form.Label>Service ID</Form.Label>
            <Form.Control />
            <Form.Text className="text-muted">e.g. my-service</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="">
            <Form.Label>Protocol</Form.Label>
            <Form.Control />
            <Form.Text className="text-muted">e.g. HTTP</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="">
            <Form.Label>Method</Form.Label>
            <Form.Control />
            <Form.Text className="text-muted">e.g. POST</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="">
            <Form.Label>Path</Form.Label>
            <Form.Control />
            <Form.Text className="text-muted">e.g. /api/endpoint</Form.Text>
          </Form.Group>

          {/* <Form.Group className="mb-2">

            <FloatingLabel controlId="" label="Service ID" className="mb-3">
              <Form.Control placeholder="my-service" />
              <Form.Text className="text-muted">(e.g. my-service)</Form.Text>
            </FloatingLabel>

            <FloatingLabel controlId="" label="Protocol" className="mb-3">
              <Form.Control placeholder="my-service" />
              <Form.Text className="text-muted">(e.g. HTTP)</Form.Text>
            </FloatingLabel>

            <FloatingLabel controlId="" label="Method" className="mb-3">
              <Form.Control placeholder="my-service" />
              <Form.Text className="text-muted">(e.g. POST)</Form.Text>
            </FloatingLabel>

            <FloatingLabel controlId="" label="Path (e.g. /api/endpoint)" className="mb-3">
              <Form.Control />
            </FloatingLabel>
          </Form.Group> */}


          <Form.Group className="mb-2 mt-4">
            Fields
            <NewMappingFieldsTable labels={labels} items={items} />

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
          <h2>Mapping result</h2>
          <InputGroup className="mb-3">
            <Form.Control as="textarea" rows={20} type="text" placeholder={JSON.stringify(newMapping, null, 4)} readOnly />
          </InputGroup>
          <Button variant='success'>Create mapping</Button>

        </Col>
      </Row>

    </>
  )
}

// const 