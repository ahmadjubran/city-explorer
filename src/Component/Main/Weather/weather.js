import React from "react";
import Card from "react-bootstrap/Card";
import WeatherDay from "./WeatherDay/weatherDay";

export default class Weather extends React.Component {
  render() {
    return (
      <>
        <Card.Title>Weather</Card.Title>
        <WeatherDay weather={this.props.weather} />
      </>
    );
  }
}
