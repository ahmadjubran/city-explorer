import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import "./main.css";
import axios from "axios";
import Weather from "../Weather/weather.js";
import Movies from "../Movies/movies.js";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      latitude: "",
      longitude: "",
      displayName: "",
      map: "",
      weather: [],
      movies: [],
      error: "",
      zoom: "1",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      [event.target.name]: event.target.value,
      displayName: "",
      error: "",
      map: "",
      latitude: "",
      longitude: "",
      weather: [],
      movies: [],
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { city } = this.state;
      const { zoom } = this.state;
      const url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${city}&format=json`;
      const response = await axios.get(url);
      const { lat, lon } = response.data[0];
      const map = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${lat},${lon}&zoom=${zoom}`;
      this.setState({
        displayName: response.data[0].display_name,
        latitude: lat,
        longitude: lon,
        map: map,
        error: "",
      });

      this.displayWeather(lat, lon);
      this.displayMovies(city);
    } catch (error) {
      console.log(error);
      this.setState({
        latitude: "",
        longitude: "",
        map: "",
        weather: [],
        movies: [],
        error: `${error.response.status}: ${error.response.data.error}`,
      });
    }
  };

  displayWeather = async (latitude, longitude) => {
    const weatherUrl = process.env.REACT_APP_WEATHER;

    const weatherData = await axios.get(weatherUrl, {
      params: { lat: latitude, lon: longitude },
    });

    this.setState({
      weather: weatherData.data,
    });
  };

  displayMovies = async (c) => {
    const moviesUrl = process.env.REACT_APP_MOVIES;

    const moviesData = await axios.get(moviesUrl, {
      params: { city: c },
    });
    this.setState({
      movies: moviesData.data,
    });
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
            <Card.Title>City name: {this.state.displayName}</Card.Title>
            <Card.Text>Latitude: {this.state.latitude}</Card.Text>
            <Card.Text>Longitude: {this.state.longitude}</Card.Text>
            <Card.Img src={this.state.map ? this.state.map : ""} />
            <Card.Text>{this.state.error}</Card.Text>
            <Weather weather={this.state.weather} />
          </Card.Body>
        </Card>
        <Movies movies={this.state.movies} />
      </main>
    );
  }
}
