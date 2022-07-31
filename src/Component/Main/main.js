import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./main.css";
import axios from "axios";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      latitude: "",
      longitude: "",
      error: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const city = this.state.city;
    const url = `${process.env.REACT_APP_LOCATIONIQ_API}?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${city}&format=json`;
    axios
      .get(url)
      .then((response) => {
        const latitude = response.data[0].lat;
        const longitude = response.data[0].lon;
        this.setState({
          latitude: latitude,
          longitude: longitude,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  }

  render() {
    return (
      <main className="main">
        <Form>
          <Form.Group>
            <Form.Label>Enter a city name</Form.Label>
            <Form.Control
              type="text"
              name="city"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.handleSubmit}>
            Explore!
          </Button>
        </Form>

        <div>
          <p>Latitude: {this.state.latitude}</p>
          <p>Longitude: {this.state.longitude}</p>
        </div>
      </main>
    );
  }
}
