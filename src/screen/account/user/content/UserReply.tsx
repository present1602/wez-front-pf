import { Box } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import ArtistZoneSelectHeader from '../../../../component/content/ArtistZoneSelectHeader';
import { CountListHeaderWithName } from '../../../../component/content/CountListHeader';
import ReplyListContent from '../../../../component/content/ListContent';
import util from '../../../../helper/util';
import SimpleListDataStore from '../../../../store/SimpleListDataStore';

interface IUserReplyProps {}

const listDataStore = new SimpleListDataStore('userReply', true);

const UserReply: React.FunctionComponent<IUserReplyProps> = observer((props) => {
  const navigate = useNavigate();

  const { userId } = useParams();
  // const [postListData, setPostListData] = React.useState<any>([]);

  React.useEffect(() => {
    listDataStore.setUserId(userId || '');
    listDataStore.init();
  }, []);

  return (
    <Box>
      <ArtistZoneSelectHeader listDataStore={listDataStore} />
      <CountListHeaderWithName listDataStore={listDataStore} name="댓글" />
      {/* No, 아티스트, 닉네임, 댓글내용, 신고, 수정시간, 작성시간, 상태, (게시물보기) */}
      <ReplyListContent
        cols={[
          { key: 'rowNumber', name: 'No', width: 30 },
          { key: 'artistZone', name: '아티스트', attr: 'title' },
          { key: 'nickName', name: '닉네임' },
          { key: 'content', name: '댓글내용' },
          { key: 'reportCount', name: '신고' },
          { key: 'updated', name: '수정일시' },
          { key: 'created', name: '작성일시' },
          { key: 'isHide', name: '상태', processData: (isHide: any) => util.getDisplayStateReverseText(isHide) },
          {
            key: 'movePage',
            name: '',
            colText: '게시물 보기',
            onClick: (contentId: any) => {
              navigate(`/content/post/${contentId}/info`);
            },
            contentKey: 'postId'
          }
          // postReplyId, postId, content, created, updated, state, reportCount, nickName, zoneId
        ]}
        store={listDataStore}
      />
    </Box>
  );
});

export default UserReply;
