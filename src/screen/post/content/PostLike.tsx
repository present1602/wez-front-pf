import { Box } from '@mui/material';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router';
import { CountListHeaderWithName } from '../../../component/content/CountListHeader';
import SimpleListDataStore from '../../../store/SimpleListDataStore';
import LikeListContent from '../../../component/content/ListContent';
import util from '../../../helper/util';

interface IPostLikeProps {}

const listDataStore = new SimpleListDataStore('postLike', true);

const PostLike: React.FunctionComponent<IPostLikeProps> = (props) => {
  const navigate = useNavigate();
  const { postId } = useParams();

  React.useEffect(() => {
    listDataStore.setPostId(postId || '');
    listDataStore.init();
  }, []);

  return (
    <Box>
      <CountListHeaderWithName listDataStore={listDataStore} name="좋아요" />
      <LikeListContent
        cols={[
          { key: 'rowNumber', name: 'No', width: 30 },
          { key: 'userType', name: '분류', processData: (item: any) => util.getTypeText(item) },
          { key: 'nickName', name: '닉네임' },
          {
            key: 'movePage',
            name: '계정정보',
            colText: '보기',
            onClick: (userId: any) => {
              navigate(`/member/user/${userId}/info`);
            },
            contentKey: 'userId'
          },
          { key: 'created', name: '시간' }
        ]}
        store={listDataStore}
      />
    </Box>
  );
};

export default PostLike;
