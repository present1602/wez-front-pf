import { TableContainer, Table, TableHead, TableCell, TableBody, TableRow, Paper, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { CMBoxCenter } from '../common/Box';

const SimpleListContent = observer((props: any) => {
  const { listData, cols } = props;

  return (
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
          {listData.length > 0 ? (
            listData.map((row: any, idx: number) => {
              return (
                <TableRow key={Math.random()} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={() => (props.onItemClick ? props.onItemClick(row) : null)}>
                  {/* <TableRow key={row.userId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}> */}
                  {cols.map((col: any) => {
                    if (col.key === 'rowNumber') {
                      return (
                        <TableCell align="center" key={Math.random()}>
                          {listData.length - idx}
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

export default SimpleListContent;
