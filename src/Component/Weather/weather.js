import React from "react";
import Card from "react-bootstrap/Card";

export default class Weather extends React.Component {
  render() {
    return (
      <>
        <Card.Title>Weather</Card.Title>
        {this.props.weather.map((weather, idx) => (
          <Card.Text key={idx}>
            {weather.date}: {weather.description}
          </Card.Text>
        ))}
      </>
    );
  }
}
