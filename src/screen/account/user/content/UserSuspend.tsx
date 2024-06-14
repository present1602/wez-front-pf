import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router';
import { UserRequestHandler } from '../../../../api/member';
import SimpleListContent from '../../../../component/content/SimpleListContent';
import util from '../../../../helper/util';

interface IUserSuspendProps {}

const UserSuspend: React.FunctionComponent<IUserSuspendProps> = (props) => {
  const { userId } = useParams();
  const [suspendListData, setSuspendListData] = React.useState<any>([]);

  React.useEffect(() => {
    UserRequestHandler.getUserSuspendList(userId || '', {
      onSuccess: (responseData: any) => {
        setSuspendListData(responseData);
      },
      onFail: () => alert('fail')
    });
  }, []);
  return (
    <Box>
      <Box pb={2} pt={3}>
        <Typography display="inline" pr={2}>
          정지이력
        </Typography>
        <Typography display="inline">{suspendListData.length}건</Typography>
      </Box>

      <SimpleListContent
        cols={[
          { key: 'rowNumber', name: 'No' },
          { key: 'startTs', name: '시작일', processData: (item: any) => util.getDate(item) },
          { key: 'endTs', name: '종료일', processData: (item: any) => util.getDate(item) },
          { key: 'period', name: '기간', processData: (item: any) => item + '일' },
          { key: 'reason', name: '이용정지 사유' }
        ]}
        listData={suspendListData}
      />
    </Box>
  );
};

export default UserSuspend;
