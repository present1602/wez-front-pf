import { Divider } from '@mui/material';
import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CMBoxStretch, CMContentFlexBox } from '../../../component/common/Box';
import PageTitle from '../../../component/contentHeader/PageTitle';
import TabMenuWithBackgroundColor from '../../../component/contentMenu/TabMenuWithBackgroundColor';
import EditorBasicInfo from './content/EditorMyPageBasicInfo';
import EditorPasswordChange from './content/EditorMyPagePasswordChange';
import EditorPost from './content/EditorMyPagePost';
import EditorReply from './content/EditorMyPageReply';

interface IEditorMyPageProps {}

const menuListData = [
  { key: 'info', text: '기본정보' },
  { key: 'password-change', text: '비밀번호 변경' },
  { key: 'post', text: '게시물' },
  { key: 'reply', text: '작성댓글' }
];

const EditorMyPage: React.FunctionComponent<IEditorMyPageProps> = (props) => {
  return (
    <CMContentFlexBox>
      <PageTitle title="마이페이지" />
      <Divider />
      <TabMenuWithBackgroundColor menuListData={menuListData} />

      <CMBoxStretch direction="column">
        <Routes>
          <Route path="info" element={<EditorBasicInfo />} />
          <Route path="password-change" element={<EditorPasswordChange />} />
          <Route path="post" element={<EditorPost />} />
          <Route path="reply" element={<EditorReply />} />
        </Routes>
      </CMBoxStretch>
    </CMContentFlexBox>
  );
};

export default EditorMyPage;
