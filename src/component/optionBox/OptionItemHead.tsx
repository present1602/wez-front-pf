import { Box, Typography } from '@mui/material';
import * as React from 'react';

interface IItemHeadProps {
  text: string;
  width?: string;
  paddingTop?: any;
}

const OptionItemHead: React.FunctionComponent<IItemHeadProps> = (props) => {
  return (
    <Box sx={{ display: 'flex', minWidth: '70px', width: props.width ? props.width : '70px', paddingTop: props.paddingTop ? props.paddingTop : '8px' }}>
      <Typography sx={{ fontSize: 14 }}>{props.text}</Typography>
    </Box>
  );
};

const OptionItemHeadWithoutPadding: React.FunctionComponent<IItemHeadProps> = (props) => {
  return (
    <Box sx={{ display: 'flex', minWidth: '70px', width: props.width ? props.width : '70px' }}>
      <Typography sx={{ fontSize: 14 }}>{props.text}</Typography>
    </Box>
  );
};

export { OptionItemHead, OptionItemHeadWithoutPadding };
