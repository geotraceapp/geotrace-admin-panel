import React, { Component } from "react";
import { Paper, Card, CardContent, Typography } from '@material-ui/core';
import './DisplaySummary.css'

class DisplaySummary extends Component {
  
  render() {

    console.log(this.props.noEstablishment)
    return (
      <div className="container">
        <Paper elevation={3} className="paper">
          <Card className="card">
            <CardContent>
              <Typography variant="h5" component="h2">
                Total Users:
              </Typography>
              <Typography variant="body2" component="p">
                {this.props.noUser.length}
              </Typography>
            </CardContent>
          </Card>
          <Card className="card">
            <CardContent>
              <Typography variant="h5" component="h2">
                Total Establishments:
              </Typography>
              <Typography variant="body2" component="p">
              {this.props.noEstablishment.length}
              </Typography>
            </CardContent>
          </Card>
          <Card className="card">
            <CardContent>
              <Typography variant="h5" component="h2">
                Exchanges (past 7 days):
              </Typography>
              <Typography variant="body2" component="p">
              {this.props.noExchange.length}
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </div>
    );
  }
}

export default DisplaySummary;