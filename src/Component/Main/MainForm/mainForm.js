import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default class MainForm extends React.Component {
  render() {
    return (
      <>
        <Form onSubmit={this.props.handleSubmit} className="main-form">
          <Form.Group controlId="formBasicCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={this.props.city}
              onChange={this.props.handleChange}
              placeholder="Enter city"
            />
          </Form.Group>
          <Form.Group controlId="formBasicZoom">
            <Form.Label>Zoom</Form.Label>
            <Form.Control
              type="number"
              name="zoom"
              value={this.props.zoom}
              onChange={this.props.handleChange}
              placeholder="Enter zoom"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Explore!
          </Button>
        </Form>
      </>
    );
  }
}
