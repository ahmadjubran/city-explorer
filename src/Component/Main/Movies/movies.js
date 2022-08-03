import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Movie from "./Movie/movie";

export default class Movies extends React.Component {
  render() {
    return (
      <>
        <Card.Title>Movies</Card.Title>
        <Row xs={1} md={4} className="g-4">
          <Movie movies={this.props.movies} />
        </Row>
      </>
    );
  }
}
