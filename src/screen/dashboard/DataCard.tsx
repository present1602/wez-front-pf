import { Paper } from '@mui/material';
import * as React from 'react';

interface IDataCardProps {
  isActive?: boolean;
  onClick?: any;
}

const DataCard: React.FunctionComponent<IDataCardProps> = (props) => {
  return (
    <Paper
      sx={{ height: '100%', display: 'flex', flex: 1, flexDirection: 'column', padding: '20px', marginRight: 3, backgroundColor: props.isActive ? '#BFABC9' : null }}
      onClick={() => (props.onClick ? props.onClick() : null)}
    >
      {props.children}
    </Paper>
  );
};

export default DataCard;
