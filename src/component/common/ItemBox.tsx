import * as React from 'react';
import { Box } from '@mui/material';

interface BasicItemBoxProps {
  maxWidth?: string;
}
class BasicItemBox extends React.Component<BasicItemBoxProps> {
  public render() {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: this.props.maxWidth ? this.props.maxWidth : '600px' }} p={2}>
        {this.props.children}
      </Box>
    );
  }
}

class ItemBox extends React.Component<BasicItemBoxProps> {
  public render() {
    return (
      <Box sx={{ display: 'flex', maxWidth: this.props.maxWidth ? this.props.maxWidth : '600px' }} p={2}>
        {this.props.children}
      </Box>
    );
  }
}

class ItemBoxLineSpacing extends React.Component<BasicItemBoxProps> {
  public render() {
    return (
      <Box sx={{ display: 'flex' }} my={1} py={1}>
        {this.props.children}
      </Box>
    );
  }
}

export { BasicItemBox, ItemBox, ItemBoxLineSpacing };
