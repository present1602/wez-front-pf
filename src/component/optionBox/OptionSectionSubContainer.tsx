import { Box } from '@mui/material';
import * as React from 'react';

export interface IOptionSectionSubContainerProps {
  maxWidth?: string;
  py?: number;
  my?: number;
}

export default class OptionSectionSubContainer extends React.Component<IOptionSectionSubContainerProps> {
  public render() {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          flexDirection: 'column',
          maxWidth: this.props.maxWidth ? this.props.maxWidth : '800px'
        }}
        my={this.props.py ? this.props.py : 0}
      >
        {this.props.children}
      </Box>
    );
  }
}
