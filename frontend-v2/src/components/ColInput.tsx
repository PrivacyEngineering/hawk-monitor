import { useState } from "react"
import { Col, ColProps, Form } from "react-bootstrap"

export const ColInput = (props: ColProps & { label?: string, mutedText?: string, value?: string, placeholder?: string, readOnly?: boolean }) => {
  const [value, setValue] = useState(props.value);

  return (
    <Col xs={props.xs} sm={props.sm} md={props.md} lg={props.lg} xl={props.xl}>
      <Form.Group className="mb-2">
        {props.label && <Form.Label>{props.label}</Form.Label>}
        <Form.Control value={value} placeholder={props.placeholder} readOnly={props.readOnly} onChange={e => setValue(e.target.value)} required />
        {props.mutedText && <Form.Text className="text-muted">{props.mutedText}</Form.Text>}
      </Form.Group>
    </Col>
  )
}
