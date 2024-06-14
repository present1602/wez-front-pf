import { Box } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useNavigate } from 'react-router';
import ArtistZoneSelectHeader from '../../../../component/content/ArtistZoneSelectHeader';
import { CountListHeaderWithName } from '../../../../component/content/CountListHeader';
import PostListContent from '../../../../component/content/ListContent';
import util from '../../../../helper/util';
import SimpleListDataStore from '../../../../store/SimpleListDataStore';

interface IEditorMyPageReplyProps {}

const listDataStore = new SimpleListDataStore('editorReply', true);

const EditorMyPageReply: React.FunctionComponent<IEditorMyPageReplyProps> = observer((props) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const rawUser: any = localStorage.getItem('user');
    const user = JSON.parse(rawUser);
    const userId = user.userId;
    listDataStore.setUserId(userId);
    listDataStore.fetchListData();
  }, []);

  return (
    <Box>
      <ArtistZoneSelectHeader listDataStore={listDataStore} />
      <CountListHeaderWithName listDataStore={listDataStore} name="댓글" />

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
        ]}
        store={listDataStore}
      />
    </Box>
  );
});

export default EditorMyPageReply;
