import axios from "axios";
import React from "react";
import Card from "react-bootstrap/Card";
import MainForm from "./MainForm/mainForm";
import Movies from "./Movies/movies";
import Weather from "./Weather/weather";

import "./main.css";

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
        // displayName: response.data[0].display_name,
        displayName: city,
        latitude: lat,
        longitude: lon,
        map: map,
        error: "",
      });

      this.displayWeather(city, lat, lon);
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

  displayWeather = async (city, latitude, longitude) => {
    const weatherUrl = process.env.REACT_APP_WEATHER;

    const weatherData = await axios.get(weatherUrl, {
      params: { searchQuery: city, lat: latitude, lon: longitude },
    });

    this.setState({
      weather: weatherData.data,
    });
  };

  displayMovies = async (city) => {
    const moviesUrl = process.env.REACT_APP_MOVIES;

    const moviesData = await axios.get(moviesUrl, {
      params: { city: city },
    });
    this.setState({
      movies: moviesData.data,
    });
  };

  render() {
    return (
      <main className="main">
        <MainForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          city={this.state.city}
          zoom={this.state.zoom}
        />
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
