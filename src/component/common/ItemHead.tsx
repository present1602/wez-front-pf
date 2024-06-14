import { Box, Typography } from '@mui/material';
import * as React from 'react';

interface IItemHeadProps {
  text: string;
  width?: string;
  fontSize?: number;
  py?: number;
}

export class ItemHead14 extends React.Component<IItemHeadProps> {
  render() {
    return (
      <Box sx={{ width: this.props.width ? this.props.width : '120px' }} py={this.props.py ? this.props.py : 0}>
        <Typography sx={{ fontSize: 14 }}>{this.props.text}</Typography>
      </Box>
    );
  }
}

export class ItemHead16 extends React.Component<IItemHeadProps> {
  render() {
    return (
      <Box sx={{ width: this.props.width ? this.props.width : '130px' }} py={this.props.py ? this.props.py : 0}>
        <Typography sx={{ fontSize: 16 }}>{this.props.text}</Typography>
      </Box>
    );
  }
}
export class ItemHead18 extends React.Component<IItemHeadProps> {
  render() {
    return (
      <Box sx={{ width: this.props.width ? this.props.width : '130px' }} py={this.props.py ? this.props.py : 0}>
        <Typography sx={{ fontSize: 18 }}>{this.props.text}</Typography>
      </Box>
    );
  }
}

export class ItemHead20 extends React.Component<IItemHeadProps> {
  render() {
    return (
      <Box sx={{ width: this.props.width ? this.props.width : '140px' }} py={this.props.py ? this.props.py : 0}>
        <Typography sx={{ fontSize: 20 }}>{this.props.text}</Typography>
      </Box>
    );
  }
}

export default { ItemHead14, ItemHead16, ItemHead20 };
