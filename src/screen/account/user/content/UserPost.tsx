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

interface IUserPostProps {}

const listDataStore = new SimpleListDataStore('userPost', true);

const UserPost: React.FunctionComponent<IUserPostProps> = observer((props) => {
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
          { key: 'isHide', name: '상태', processData: (state: any) => util.getDisplayStateReverseText(state) },
          { key: 'updated', name: '수정일시' },
          { key: 'created', name: '작성일시' },
          {
            key: 'movePage',
            name: '',
            colText: '보기',
            contentKey: 'postId',
            onClick: (contentId: any) => {
              navigate(`/content/post/${contentId}/info`);
            }
          }
        ]}
        store={listDataStore}
      />
    </Box>
  );
});

export default UserPost;
