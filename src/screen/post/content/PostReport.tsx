import { Box } from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router';
import { CountListHeaderWithName } from '../../../component/content/CountListHeader';
import SimpleListDataStore from '../../../store/SimpleListDataStore';
import LikeListContent from '../../../component/content/ListContent';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import util from '../../../helper/util';

interface IPostReportProps {}

const listDataStore = new SimpleListDataStore('postReport', true);

const PostReport: React.FunctionComponent<IPostReportProps> = observer((props) => {
  const navigate = useNavigate();
  const { postId } = useParams();

  React.useEffect(() => {
    listDataStore.setPostId(postId || '');
    listDataStore.init();
  }, []);

  return (
    <Box>
      <CountListHeaderWithName listDataStore={listDataStore} name="신고" />
      <LikeListContent
        cols={[
          { key: 'rowNumber', name: 'No', width: 30 },
          { key: 'nickName', name: '닉네임' },
          {
            key: 'movePage',
            name: '계정정보',
            colText: '보기',
            onClick: (contentId: any) => {
              navigate(`/member/user/${contentId}/info`);
            },
            contentKey: 'userId'
          },
          { key: 'reportType', name: '이유', processData: (item: any) => util.getReportTypeText(item) },
          { key: 'content', name: '내용' },
          { key: 'created', name: '시간' }
        ]}
        store={listDataStore}
      />
    </Box>
  );
});

export default PostReport;
