import { Typography } from '@mui/material';
import * as React from 'react';

class HeadTextCenter extends React.Component<any> {
  render() {
    return (
      <Typography variant="h6" sx={{ textAlign: 'center' }} p={this.props.p ? this.props.p : 0} px={this.props.px ? this.props.px : 0} py={this.props.py ? this.props.py : 0}>
        {this.props.text}
      </Typography>
    );
  }
}

export { HeadTextCenter };
