import React from "react";
import "./footer.css";

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer-text">
          <p>
            <a href="#">Terms of Use</a> | <a href="#">Privacy Policy</a> |{" "}
            <a href="#">Contact Us</a>
          </p>
          <p>&copy; 2020 City Explorer. All rights reserved.</p>
        </div>
      </footer>
    );
  }
}
