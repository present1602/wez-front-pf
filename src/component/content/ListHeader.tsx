import * as React from 'react';
import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material';
import { observer } from 'mobx-react';

interface IListHeaderProps {
  listDataStore: any;
}

const ListHeader: React.FunctionComponent<IListHeaderProps> = observer(({ listDataStore }) => {
  const handleRowsPerPageChange = (e: any) => {
    listDataStore.setRowsPerPage(e.target.value);
    listDataStore.setPage(1);
    listDataStore.fetchListData();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} my={2}>
      <Typography ml={1} mr={2}>
        전체({listDataStore.totalCount})
      </Typography>
      <FormControl>
        <Select value={listDataStore.rowsPerPage} size="small" onChange={handleRowsPerPageChange} sx={{ height: '30px', zIndex: 999999 }}>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={40}>40</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>
      <Typography mx={1}>개씩 보기</Typography>
    </Box>
  );
});

export default ListHeader;
