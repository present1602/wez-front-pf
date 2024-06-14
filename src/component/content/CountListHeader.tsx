import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { observer } from 'mobx-react';

interface ICountListHeaderProps {
  listDataStore: any;
  name?: string;
}

const CountListHeader: React.FunctionComponent<ICountListHeaderProps> = observer(({ listDataStore }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }} my={2}>
      <Typography ml={1} mr={2}>
        전체({listDataStore.totalCount})
      </Typography>
    </Box>
  );
});

export const CountListHeaderWithName: React.FunctionComponent<ICountListHeaderProps> = observer(({ listDataStore, name }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }} my={2}>
      <Typography mx={1} sx={{ fontSize: 18 }}>
        {name}
      </Typography>
      <Typography ml={1} mr={2} sx={{ fontSize: 18 }}>
        {listDataStore.totalCount}개
      </Typography>
    </Box>
  );
});

export default CountListHeader;
