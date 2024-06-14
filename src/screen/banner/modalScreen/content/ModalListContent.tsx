import { TableContainer, Table, TableHead, TableCell, TableBody, TableRow, Box, Paper, Typography, CardMedia, Pagination, Link } from '@mui/material';
import * as React from 'react';
import { observer } from 'mobx-react';
import { CMBoxCenter } from '../../../../component/common/Box';
import util from '../../../../helper/util';

export interface IListContentProps {
  store: any;
  onRowClick?: any;
}

const ModalListDatatContent = observer((props: any) => {
  const { store, cols, bannerFormStore, setListModalControl } = props;

  const handlePageChange = (e: any, value: any) => {
    store.setPage(value);
    store.fetchListData();
  };

  return (
    <>
      <Box sx={{ overflowY: 'auto' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {cols.map((col: any) => {
                  return (
                    <TableCell align="center" key={Math.random()} width={col.width && col.width}>
                      {col.name}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>

            <TableBody>
              {store.listData && store.listData.length > 0 ? (
                store.listData.map((row: any, idx: number) => {
                  return (
                    <TableRow
                      key={Math.random()}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                      onClick={() => {
                        setListModalControl({ contentKey: '', languageCode: '' });
                        if (bannerFormStore.actionContent.type === 'PD') {
                          bannerFormStore.setActionPath(row['postId']);
                          bannerFormStore.setActionContentBody(row['content']);
                        } else if (bannerFormStore.actionContent.type === 'ND') {
                          bannerFormStore.setActionPath(row['noticeId']);
                          bannerFormStore.setActionContentBody(row['subject']);
                        }
                      }}
                    >
                      {/* <TableRow key={row.userId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}> */}
                      {cols.map((col: any) => {
                        // if (!row[col.key]) {
                        //   return <div />;
                        // }

                        if (col.thumbnail && row[col.key]) {
                          return (
                            <TableCell align="center" key={Math.random()} sx={col.sx && col.sx}>
                              <CardMedia component="img" height="100" width="100" image={util.getImageProxyPath(row[col.key].url)} alt="thumbnail" />
                            </TableCell>
                          );
                        } else if (col.key === 'artistList') {
                          return (
                            <TableCell align="center" key={Math.random()} sx={col.sx && col.sx}>
                              {row[col.key].map((artist: any) => {
                                return (
                                  <Typography sx={{ paddingRight: 1, display: 'inline-block' }} key={Math.random()}>
                                    {artist.title}
                                  </Typography>
                                );
                              })}
                            </TableCell>
                          );
                        } else if (col.key === 'movePage') {
                          return (
                            <TableCell align="center" key={Math.random()} sx={col.sx && col.sx}>
                              <Box py={2} sx={{ display: 'inline-block', minWidth: '28px' }}>
                                <Link href="#" color="#0000FF" sx={{ margin: '2px', fontSize: 15, display: 'inline-block' }}>
                                  {col.name}
                                </Link>
                              </Box>
                            </TableCell>
                          );
                        } else if (col.key === 'artistZone' && row[col.key]) {
                          return (
                            <TableCell align="center" key={Math.random()} sx={col.sx && col.sx}>
                              <Typography sx={{ paddingRight: 1, display: 'inline-block' }} key={Math.random()}>
                                {row[col.key].title}
                              </Typography>
                            </TableCell>
                          );
                        } else if (col.isHtml) {
                          return (
                            <TableCell align="center" key={Math.random()} sx={col.sx && col.sx}>
                              <div className="htmlSummaryElement" dangerouslySetInnerHTML={{ __html: row[col.key] }}></div>
                            </TableCell>
                          );
                        } else if (col.attr) {
                          return (
                            <TableCell align="center" key={Math.random()} sx={col.sx && col.sx}>
                              <Typography sx={{ paddingRight: 1, display: 'inline-block' }} key={Math.random()}>
                                {row[col.key][col.attr]}
                              </Typography>
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell align="center" key={Math.random()} sx={col.sx && col.sx}>
                              {col.processData ? col.processData(row[col.key]) : row[col.key]}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={cols.length}>
                    <CMBoxCenter>
                      <Typography>조회결과가 없습니다</Typography>
                    </CMBoxCenter>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {store.isPaging && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }} py={3}>
          <Pagination count={store.pageTotalCount} defaultPage={1} page={store.page} onChange={handlePageChange} />
        </Box>
      )}
    </>
  );
});

export default ModalListDatatContent;
