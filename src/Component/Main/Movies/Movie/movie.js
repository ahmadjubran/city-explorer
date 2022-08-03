import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

export default class Movie extends React.Component {
  render() {
    return (
      <>
        {this.props.movies &&
          this.props.movies.map((movie, idx) => (
            <Col key={idx}>
              <Card className="movie-card">
                <Card.Body>
                  {movie.image_url !== "https://image.tmdb.org/t/p/w500null" ? (
                    <Card.Img src={movie.image_url} />
                  ) : (
                    <Card.Img src="https://via.placeholder.com/300x450" />
                  )}
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
      </>
    );
  }
}
