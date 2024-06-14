import { TableContainer, Table, TableHead, TableCell, TableBody, TableRow, Box, Paper, Typography, CardMedia, Pagination } from '@mui/material';
import * as React from 'react';
import { observer } from 'mobx-react';
import { CMBoxCenter } from '../common/Box';
import util from '../../helper/util';

export interface IListContentProps {
  store: any;
}

const BasicListDatatContent = observer((props: any) => {
  const { store, cols } = props;

  const handlePageChange = (e: any, value: any) => {
    store.setPage(value);
    store.fetchListData();
  };

  return (
    <Box>
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
                  <TableRow key={Math.random()} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    {/* <TableRow key={row.userId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}> */}
                    {cols.map((col: any) => {
                      if (col.thumbnail && row[col.key]) {
                        return (
                          <TableCell
                            align="center"
                            key={Math.random()}
                            sx={(col.sx && col.sx, { cursor: col.onRowClick && 'pointer' })}
                            onClick={() => {
                              if (col.onRowClick) {
                                col.onRowClick(row[col.rowKey]);
                              }
                            }}
                          >
                            <CardMedia component="img" height="100" width="100" image={util.getImageProxyPath(row[col.key].url)} alt="media image" />
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
                      } else if (col.attr) {
                        return (
                          <TableCell align="center" key={Math.random()} sx={col.sx && col.sx}>
                            <Typography sx={{ paddingRight: 1, display: 'inline-block' }} key={Math.random()}>
                              {row[col.key][col.attr]}
                            </Typography>
                          </TableCell>
                        );
                      } else if (col.convertToHtml) {
                        return (
                          <TableCell align="center" key={Math.random()} sx={col.sx && col.sx}>
                            {col.convertToHtml(row)}
                          </TableCell>
                        );
                      } else if (col.isHtml) {
                        return (
                          <TableCell align="center" key={Math.random()} sx={col.sx && col.sx}>
                            <div className="htmlSummaryElement" dangerouslySetInnerHTML={{ __html: row[col.key] }}></div>
                          </TableCell>
                        );
                      } else if (col.key === 'movePage' && col.contentKey) {
                        return (
                          <TableCell
                            align="center"
                            key={Math.random()}
                            sx={(col.sx && col.sx, { cursor: col.onRowClick && 'pointer' })}
                            onClick={() => {
                              col.onClick(row[col.contentKey]);
                            }}
                          >
                            <Typography sx={{ color: '#0000FF', cursor: 'pointer' }}>{col.colText}</Typography>
                          </TableCell>
                        );
                      } else if (col.key === 'actionButton' && col.contentKey) {
                        return (
                          <TableCell
                            align="center"
                            key={Math.random()}
                            onClick={() => {
                              col.onClick(row[col.rowKey], row[col.contentKey]);
                            }}
                          >
                            <Typography sx={{ color: '#0000FF', cursor: 'pointer' }}>{col.processData ? col.processData(row[col.contentKey]) : row[col.contentKey]}</Typography>
                          </TableCell>
                        );
                      } else if (col.key === 'conditionalAction') {
                        return (
                          <TableCell
                            align="center"
                            key={Math.random()}
                            onClick={() => {
                              col.onClickWithRowParam(row);
                            }}
                          >
                            {col.colText ? <Typography sx={{ color: '#0000FF', cursor: 'pointer' }}>{col.colText}</Typography> : row[col.key]}
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell
                            align="center"
                            key={Math.random()}
                            sx={(col.sx && col.sx, { cursor: (col.onRowClick || col.onClickWithRowParam || col.onClick) && 'pointer' })}
                            onClick={() => {
                              if (col.onRowClick) {
                                col.onRowClick(row[col.rowKey]);
                              } else if (col.onClickWithRowParam) {
                                col.onClickWithRowParam(row);
                              }
                            }}
                          >
                            {/* {col.colText ? col.colText : col.processData ? col.processData(row[col.key]) : row[col.key]} */}
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
      {store.isPaging && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }} py={3}>
          <Pagination count={store.pageTotalCount} defaultPage={1} page={store.page} onChange={handlePageChange} />
        </Box>
      )}
    </Box>
  );
});

export default BasicListDatatContent;
