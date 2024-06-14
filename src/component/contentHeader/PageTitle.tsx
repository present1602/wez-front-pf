import { Box, Typography } from '@mui/material';
import * as React from 'react';

interface IPageTitleProps {
  title: string;
}

const PageTitle: React.FunctionComponent<IPageTitleProps> = (props) => {
  return (
    <Box py={2}>
      {/* <Box sx={{ pb: 2 }} py={2}> */}
      <Typography variant="h5">{props.title}</Typography>
    </Box>
  );
};

export default PageTitle;
