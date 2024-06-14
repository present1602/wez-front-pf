import { Box, Pagination } from '@mui/material';
import * as React from 'react';

interface IListPagnationProps {
  listDataStore: any;
}

const ListPagination: React.FunctionComponent<IListPagnationProps> = ({ listDataStore }) => {
  const handlePageChange = (e: any, value: any) => {
    listDataStore.setPage(value);
    listDataStore.fetchListData();
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }} py={3}>
      <Pagination count={Math.ceil(listDataStore.totalCount / listDataStore.rowsPerPage)} defaultPage={1} page={listDataStore.page} onChange={handlePageChange} />
    </Box>
  );
};

export default ListPagination;
