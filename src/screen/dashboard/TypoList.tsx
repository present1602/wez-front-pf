import { Typography } from '@mui/material';
import React from 'react';
import { requests } from '../../api/requests';

interface TypoListProps {}

const TypoList: React.FunctionComponent<TypoListProps> = () => {
  async function sessionTouch() {
    var aaa = await requests.post('/public/session-touch', {});
  }
  async function adminList() {
    var param = {
      pagingOption: {
        page: 1,
        rowsPerPage: 10,
        sort: {
          direction: 'DESC',
          id: 'created'
        }
      }
    };
    var aaa = await requests.post('/admin/list', param);
  }

  return (
    <div>
      <h2>세션터치</h2>
      <button onClick={() => sessionTouch()}>세션터치</button>

      <div style={{ height: '80px' }} />
      <h2>admin list</h2>
      <button onClick={() => adminList()}>get adminlist</button>

      <h1>TypoList screen</h1>
      <Typography variant="h1">h1 text typo</Typography>
      <Typography variant="h2">h2 text typo</Typography>
      <Typography variant="h3">h3 text typo</Typography>
      <Typography variant="h4">h4 text typo</Typography>
      <Typography variant="h5">h5 text typo</Typography>
      <Typography variant="h6">h6 text typo</Typography>
      <Typography variant="subtitle1">subtitle1 text typo</Typography>
      <Typography variant="subtitle2">subtitle2 text typo</Typography>
    </div>
  );
};

export default TypoList;
