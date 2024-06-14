import { TableContainer, Table, TableHead, TableCell, TableBody, TableRow, Paper, Typography, CardMedia } from '@mui/material';
import * as React from 'react';
import { observer } from 'mobx-react';
import { CMBoxCenter } from '../common/Box';
import util from '../../helper/util';

const ReorderableListContent = observer((props: any) => {
  const [dragId, setDragId] = React.useState();
  const { listData, setListData, cols } = props;

  const handleDrag = (ev: any) => {
    setDragId(ev.currentTarget.id);
  };

  const handleDrop = (ev: any) => {
    const dragBox = listData.find((item: any) => item.bannerId === dragId);
    const dropBox = listData.find((item: any) => item.bannerId === ev.currentTarget.id);
    const dragBoxOrder = dragBox.ord;
    const dropBoxOrder = dropBox.ord;

    const newList = listData.map((item: any) => {
      if (item.bannerId === dragId) {
        item.ord = dropBoxOrder;
      }
      if (item.bannerId === ev.currentTarget.id) {
        item.ord = dragBoxOrder;
      }
      return item;
    });

    setListData(newList);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="draggablelist table">
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
          {listData.length > 0 ? (
            listData
              .sort((a: any, b: any) => b.ord - a.ord)
              .map((row: any, idx: number) => {
                return (
                  <TableRow
                    key={Math.random()}
                    id={row.bannerId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                    draggable={true}
                    onDragOver={(ev) => ev.preventDefault()}
                    onDragStart={handleDrag}
                    onDrop={handleDrop}
                  >
                    {cols.map((col: any) => {
                      if (col.key === 'rowNumber') {
                        return (
                          <TableCell align="center" key={Math.random()}>
                            {listData.length - idx}
                          </TableCell>
                        );
                      } else if (col.thumbnail && row[col.key]) {
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
                            <CardMedia component="img" height="100" width="100" image={util.getImageProxyPath(row[col.key].url)} alt="Paella dish" />
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
                            {/* {col.convertToHtml(row[col.key])} */}
                            {col.convertToHtml(row)}
                          </TableCell>
                        );
                      } else {
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
  );
});

export default ReorderableListContent;
