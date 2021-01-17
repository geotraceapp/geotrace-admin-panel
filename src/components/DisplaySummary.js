import React, { Component } from "react";
import { Paper, Card, CardContent, Typography } from '@material-ui/core';
import './DisplaySummary.css'

class DisplaySummary extends Component {

  render() {
    return (
      <div className="container">
        <Paper elevation={3} className="paper">
          <Card className="card">
            <CardContent>
              <Typography variant="h5" component="h2">
                Total Users:
              </Typography>
              <Typography variant="body2" component="p">
                {this.props.noUsers}
              </Typography>
            </CardContent>
          </Card>
          <Card className="card">
            <CardContent>
              <Typography variant="h5" component="h2">
                Total Establishments:
              </Typography>
              <Typography variant="body2" component="p">
                {this.props.noEstablishments}
              </Typography>
            </CardContent>
          </Card>
          <Card className="card">
            <CardContent>
              <Typography variant="h5" component="h2">
                Exchanges:
              </Typography>
              <Typography variant="body2" component="p">
                {this.props.noExchanges}
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </div>
    );
  }
}

export default DisplaySummary;