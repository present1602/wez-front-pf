import { Box } from '@mui/system';
import * as React from 'react';

interface BoxProps {
  direction?: string;
  padding?: number | string;
  margin?: number | string;
  maxWidth?: string | number;
  minWidth?: string | number;
  height?: any;
  mx?: number;
  my?: number;
  px?: number;
  py?: number;
  p?: number;
  flex?: number;
}

class CMBoxCenter extends React.Component<BoxProps> {
  render() {
    return (
      <Box
        sx={{
          display: 'flex',
          alighItem: 'center',
          justifyContent: 'center',
          flexDirection: this.props.direction ? this.props.direction : 'row'
        }}
      >
        {this.props.children}
      </Box>
    );
  }
}

class CMBoxAlignCenter extends React.Component<BoxProps> {
  render() {
    return (
      <Box sx={{ display: 'flex', alignItem: 'center', flexDirection: this.props.direction ? this.props.direction : 'row' }} p={this.props.p ? this.props.p : 0} px={this.props.px ? this.props.px : 0}>
        {this.props.children}
      </Box>
    );
  }
}

class CMBoxAlignCenterStretch extends React.Component<BoxProps> {
  render() {
    return (
      <Box
        sx={{ display: 'flex', alighItem: 'center', flex: 1 }}
        p={this.props.padding ? this.props.padding : 0}
        px={this.props.px ? this.props.px : 0}
        py={this.props.py ? this.props.py : 0}
        mx={this.props.mx ? this.props.mx : 0}
        my={this.props.my ? this.props.my : 0}
      >
        {this.props.children}
      </Box>
    );
  }
}

class CMBoxJustifyCenter extends React.Component<BoxProps> {
  render() {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }} p={this.props.p ? this.props.p : 0}>
        {this.props.children}
      </Box>
    );
  }
}

class CMBoxStretch extends React.Component<BoxProps> {
  render() {
    return (
      <Box sx={{ display: 'flex', flex: 1, flexDirection: this.props.direction ? this.props.direction : 'row', maxWidth: this.props.maxWidth ? this.props.maxWidth : null }}>{this.props.children}</Box>
    );
  }
}

class CMFlexBoxWithFlexProp extends React.Component<BoxProps> {
  render() {
    return (
      <Box
        sx={{
          display: 'flex',
          flex: this.props.flex ? this.props.flex : 1,
          maxWidth: this.props.maxWidth ? this.props.maxWidth : null,
          minWidth: this.props.minWidth ? this.props.minWidth : null,
          flexDirection: this.props.direction ? this.props.direction : 'row'
        }}
      >
        {this.props.children}
      </Box>
    );
  }
}
class CMBoxWithFlexProp extends React.Component<BoxProps> {
  render() {
    return <Box sx={{ display: 'flex', flex: this.props.flex ? this.props.flex : 1, flexDirection: this.props.direction ? this.props.direction : 'row' }}>{this.props.children}</Box>;
  }
}

class CMContentFlexBox extends React.Component<BoxProps> {
  render() {
    return <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: this.props.maxWidth ? this.props.maxWidth : '2000px' }}>{this.props.children}</Box>;
  }
}

class CMContentFlexBoxWithHeight extends React.Component<BoxProps> {
  render() {
    return <Box sx={{ display: 'flex', flexDirection: 'column', height: this.props.height, maxWidth: this.props.maxWidth ? this.props.maxWidth : '2000px' }}>{this.props.children}</Box>;
  }
}

class OptionContainer extends React.Component<BoxProps> {
  render() {
    return (
      <Box sx={{ backgroundColor: 'primary.light' }} px={4} py={this.props.py ? this.props.py : 1}>
        {this.props.children}
      </Box>
    );
  }
}

class CMBoxFlexEnd extends React.Component<BoxProps> {
  render() {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} p={this.props.p ? this.props.p : 0}>
        {this.props.children}
      </Box>
    );
  }
}

class CMLineBox extends React.Component<BoxProps> {
  render() {
    return (
      <Box
        sx={{ display: 'flex', flexDirection: this.props.direction ? this.props.direction : 'row' }}
        py={this.props.py ? this.props.py : 0}
        my={this.props.my ? this.props.my : 0}
        px={this.props.px ? this.props.px : 0}
        p={this.props.p ? this.props.p : 0}
      >
        {this.props.children}
      </Box>
    );
  }
}

export {
  CMContentFlexBox,
  CMBoxStretch,
  CMBoxCenter,
  CMBoxAlignCenter,
  CMBoxAlignCenterStretch,
  CMBoxFlexEnd,
  CMBoxJustifyCenter,
  OptionContainer,
  CMLineBox,
  CMFlexBoxWithFlexProp,
  CMBoxWithFlexProp,
  CMContentFlexBoxWithHeight
};
