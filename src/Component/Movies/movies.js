import React from "react";
import Card from "react-bootstrap/Card";

export default class movies extends React.Component {
  render() {
    return (
      <>
        <Card.Title>Movies</Card.Title>
        {this.props.movies &&
          this.props.movies.map((movie, idx) => (
            <Card.Body key={idx}>
              <Card.Img src={movie.image_url} />
              <Card.Text>Title: {movie.title}</Card.Text>
              <Card.Text>Overview: {movie.overview}</Card.Text>
              <Card.Text>Average votes: {movie.average_votes}</Card.Text>
              <Card.Text>Total votes: {movie.total_votes}</Card.Text>
              <Card.Text>Oopularity: {movie.popularity}</Card.Text>
              <Card.Text>Release date: {movie.released_on}</Card.Text>
            </Card.Body>
          ))}
        <Card.Body>
          {this.props.moviesError && (
            <Card.Text>{this.props.moviesError}</Card.Text>
          )}
        </Card.Body>
      </>
    );
  }
}
