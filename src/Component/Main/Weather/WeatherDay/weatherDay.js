import React from "react";
import Card from "react-bootstrap/Card";

export default class WeatherDay extends React.Component {
  render() {
    return (
      <>
        {this.props.weather.map((weather, idx) => (
          <Card.Text key={idx}>
            {weather.date}: {weather.description}
          </Card.Text>
        ))}
      </>
    );
  }
}
