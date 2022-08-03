import React from "react";
import Card from "react-bootstrap/Card";

export default class Weather extends React.Component {
  render() {
    return (
      <>
        {this.props.weather &&
          this.props.weather.map((weather, idx) => (
            <Card.Text key={idx}>
              {weather.date}: {weather.description}
            </Card.Text>
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
