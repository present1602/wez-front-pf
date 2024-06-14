import { Box } from '@mui/material';
import React from 'react';
import { CMBoxFlexEnd } from './Box';
import { HighlightButton } from './Button';

interface Props {
  onClick: any;
  text: string;
  backgroundColor?: string;
  color?: string;
}

class FlexEndMainButton extends React.Component<Props> {
  public render() {
    return (
      <Box p={1}>
        <CMBoxFlexEnd>
          <HighlightButton onClick={() => this.props.onClick()} text={this.props.text} backgroundColor={this.props.backgroundColor} />
        </CMBoxFlexEnd>
      </Box>
    );
  }
}

export default FlexEndMainButton;
