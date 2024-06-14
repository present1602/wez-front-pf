import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { TailTextButton } from '../common/Button';

interface IPageTitleWithTailProps {
  title: string;
  tailText: string;
  onClick: any;
}

class PageTitleWithTail extends React.Component<IPageTitleWithTailProps> {
  render() {
    return (
      <Box sx={{ display: 'flex' }} py={2}>
        <Typography variant="h5">{this.props.title}</Typography>
        <Box sx={{ flex: 1 }} />
        <TailTextButton onClick={this.props.onClick} text={this.props.tailText} />
      </Box>
    );
  }
}

export default PageTitleWithTail;
