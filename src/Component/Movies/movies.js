import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default class movies extends React.Component {
  render() {
    return (
      <>
        <Card.Title>Movies</Card.Title>
        <Row xs={1} md={4} className="g-4">
          {this.props.movies &&
            this.props.movies.map((movie, idx) => (
              <Col key={idx}>
                <Card className="movie-card">
                  <Card.Body>
                    <Card.Img src={movie.image_url} />
                    <Card.Text>{movie.title}</Card.Text>
                    <Card.Text>{movie.overview}</Card.Text>
                    <Card.Text>Average votes: {movie.average_votes}</Card.Text>
                    <Card.Text>Total votes: {movie.total_votes}</Card.Text>
                    <Card.Text>Oopularity: {movie.popularity}</Card.Text>
                    <Card.Text>Release date: {movie.released_on}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </>
    );
  }
}
