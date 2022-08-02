import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import "./main.css";
import axios from "axios";
import Weather from "../Weather/weather.js";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      latitude: "",
      longitude: "",
      map: "",
      mapError: "",
      weatherError: "",
      zoom: "1",
      weather: [],
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      [event.target.name]: event.target.value,
      mapError: "",
      weatherError: "",
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { city } = this.state;
    const { zoom } = this.state;

    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${city}&format=json`;

    try {
      const response = await axios.get(url);
      const { lat, lon } = response.data[0];
      const map = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${lat},${lon}&zoom=${zoom}`;
      this.setState({
        latitude: lat,
        longitude: lon,
        map: map,
        mapError: "",
      });
    } catch (error) {
      this.setState({
        mapError: `${error.response.status} ${error.response.data.error}`,
        latitude: "",
        longitude: "",
        map: "",
      });
    }
    this.displayWeather(city);
  };

  displayWeather = async (cityName) => {
    const weatherUrl = process.env.REACT_APP_WEATHER;
    try {
      const weatherDate = await axios.get(weatherUrl, {
        params: { searchQuery: cityName },
        weatherError: "",
      });

      this.setState({
        weather: weatherDate.data,
        weatherError: "",
      });
    } catch (error) {
      this.setState({
        weatherError: `${error.response.status} ${error.response.data.error}`,
        weather: [],
      });
    }
  };

  render() {
    return (
      <main className="main">
        <Form onSubmit={this.handleSubmit} className="main-form">
          <Form.Group controlId="formBasicCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={this.state.city}
              onChange={this.handleChange}
              placeholder="Enter city"
            />
          </Form.Group>
          <Form.Group controlId="formBasicZoom">
            <Form.Label>Zoom</Form.Label>
            <Form.Control
              type="number"
              name="zoom"
              value={this.state.zoom}
              onChange={this.handleChange}
              placeholder="Enter zoom"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Explore!
          </Button>
        </Form>
        <Card className="main-card">
          <Card.Body className="main-card-body">
            <Card.Title>City name: {this.state.city}</Card.Title>
            <Card.Text>Latitude: {this.state.latitude}</Card.Text>
            <Card.Text>Longitude: {this.state.longitude}</Card.Text>
            <Card.Img src={this.state.map ? this.state.map : ""} />
            <Card.Text>
              {this.state.mapError ? this.state.mapError : ""}
            </Card.Text>
          </Card.Body>
          <Weather
            weather={this.state.weather}
            weatherError={this.state.weatherError}
          />
        </Card>
      </main>
    );
  }
}
