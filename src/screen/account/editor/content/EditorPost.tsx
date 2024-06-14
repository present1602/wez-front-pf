import { Box } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import ArtistZoneSelectHeader from '../../../../component/content/ArtistZoneSelectHeader';
import { CountListHeaderWithName } from '../../../../component/content/CountListHeader';
import PostListContent from '../../../../component/content/ListContent';
import util from '../../../../helper/util';
import SimpleListDataStore from '../../../../store/SimpleListDataStore';

interface IEditorPostProps {}

const listDataStore = new SimpleListDataStore('editorPost', true);

const EditorPost: React.FunctionComponent<IEditorPostProps> = observer((props) => {
  const navigate = useNavigate();
  const { userId } = useParams();

  React.useEffect(() => {
    userId && listDataStore.setUserId(userId);
    listDataStore.init();
  }, []);

  return (
    <Box>
      <ArtistZoneSelectHeader listDataStore={listDataStore} />
      <CountListHeaderWithName listDataStore={listDataStore} name="게시물" />
      <PostListContent
        cols={[
          { key: 'rowNumber', name: 'No', width: 30 },
          { key: 'artistZone', name: '아티스트', attr: 'title' },
          { key: 'thumbnailImage', name: '썸네일', thumbnail: true, width: 80 },
          { key: 'imageCount', name: '이미지수' },
          { key: 'content', name: '내용' },
          { key: 'viewsCount', name: '조회수' },
          { key: 'replyCount', name: '댓글' },
          { key: 'likeCount', name: '좋아요' },
          { key: 'reportCount', name: '신고' },
          { key: 'bookMarkCount', name: '북마크수' },
          { key: 'isHide', name: '상태', processData: (item: any) => util.getDisplayStateReverseText(item) },
          { key: 'updated', name: '수정일시' },
          { key: 'created', name: '작성일시' },
          {
            key: 'movePage',
            name: '',
            colText: '보기',
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

export default EditorPost;
