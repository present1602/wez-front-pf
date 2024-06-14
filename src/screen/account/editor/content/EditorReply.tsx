import { Box } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import ArtistZoneSelectHeader from '../../../../component/content/ArtistZoneSelectHeader';
import { CountListHeaderWithName } from '../../../../component/content/CountListHeader';
import PostListContent from '../../../../component/content/ListContent';
import util from '../../../../helper/util';
import SimpleListDataStore from '../../../../store/SimpleListDataStore';

interface IEditorReplyProps {}

const listDataStore = new SimpleListDataStore('editorReply', true);

const EditorReply: React.FunctionComponent<IEditorReplyProps> = observer((props) => {
  const navigate = useNavigate();
  const { userId } = useParams();

  React.useEffect(() => {
    userId && listDataStore.setUserId(userId);
    listDataStore.init();
  }, []);

  return (
    <Box>
      <ArtistZoneSelectHeader listDataStore={listDataStore} />
      <CountListHeaderWithName listDataStore={listDataStore} name="댓글" />
      {/* No, 아티스트, 닉네임, 댓글내용, 신고, 수정시간, 작성시간, 상태, (게시물보기) */}
      <PostListContent
        cols={[
          { key: 'rowNumber', name: 'No', width: 30 },
          { key: 'artistZone', name: '아티스트', attr: 'title' },
          { key: 'content', name: '댓글내용' },
          { key: 'reportCount', name: '신고' },
          { key: 'updated', name: '수정일시' },
          { key: 'created', name: '작성일시' },
          { key: 'state', name: '상태', processData: (state: any) => util.getDisplayStateText(state) },
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
        ]} // row[col.rowKey]
        store={listDataStore}
      />
    </Box>
  );
});

export default EditorReply;
