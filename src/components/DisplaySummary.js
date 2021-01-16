import React, {Component} from "react";
import Card from "react-bootstrap/Card";

class DisplaySummary extends Component {
  render() {

    return (
      <Card>
        <Card.Body>
          <Card.Title>TEST</Card.Title>
          <Card.Text>
            Total User | Other Info | Other Info | buttons maybe
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default DisplaySummary;