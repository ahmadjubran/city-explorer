import React from "react";
import Card from "react-bootstrap/Card";

export default class Weather extends React.Component {
  render() {
    return (
      <>
        <Card.Title>Weather</Card.Title>
        {this.props.weather &&
          this.props.weather.map((weather, idx) => (
            <Card.Body key={idx}>
              <Card.Text>Date: {weather.date}</Card.Text>
              <Card.Text>Description: {weather.description}</Card.Text>
            </Card.Body>
          ))}
        <Card.Body>
          {this.props.weatherError && (
            <Card.Text>{this.props.weatherError}</Card.Text>
          )}
        </Card.Body>
      </>
    );
  }
}
