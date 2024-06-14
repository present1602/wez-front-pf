import * as React from 'react';
import { useParams } from 'react-router';
import AppHistory from '../../AppHistory';
import { CMContentFlexBox } from '../../component/common/Box';
import { Routes, Route } from 'react-router-dom';
import PageTitleWithTail from '../../component/contentHeader/PageTitleWithTail';
import ContentTabMenu from '../../component/contentMenu/TabMenu';
import { observer } from 'mobx-react';
import PostBasicInfo from './content/PostBasicInfo';
import PostReply from './content/PostReply';
import PostLike from './content/PostLike';
import PostReport from './content/PostReport';
import PostBasicInfoUpdate from './content/PostBasicInfoUpdate';

interface IPostInfoScreenProps {}

interface MenuData {
  key: string;
  text: string;
  active: boolean;
}

const menuListData: Array<MenuData> = [
  { key: 'info', text: '기본정보', active: true },
  { key: 'reply', text: '댓글', active: false },
  { key: 'like', text: '좋아요', active: false },
  { key: 'report', text: '신고', active: false }
];

const PostInfoScreen: React.FunctionComponent<IPostInfoScreenProps> = observer((props) => {
  return (
    <CMContentFlexBox>
      <PageTitleWithTail title={'게시물 조회'} tailText="목록으로 돌아가기" onClick={() => AppHistory.push('/content/post')} />

      <ContentTabMenu menuListData={menuListData} />
      <Routes>
        <Route path="info" element={<PostBasicInfo />} />
        <Route path="update" element={<PostBasicInfoUpdate />} />
        <Route path="reply" element={<PostReply />} />
        <Route path="like" element={<PostLike />} />
        <Route path="report" element={<PostReport />} />
      </Routes>
    </CMContentFlexBox>
  );
});

export default PostInfoScreen;
