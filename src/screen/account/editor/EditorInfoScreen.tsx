import { Divider } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import PageTitle from '../../../component/contentHeader/PageTitle';
import { CMBoxStretch, CMContentFlexBox } from '../../../component/common/Box';
import TabMenuWithBackgroundColor from '../../../component/contentMenu/TabMenuWithBackgroundColor';
import EditorBasicInfo from './content/EditorBasicInfo';
import EditorPasswordChange from './content/EditorPasswordChange';
import EditorPost from './content/EditorPost';
import EditorReply from './content/EditorReply';
import { Routes, Route } from 'react-router-dom';

interface IEditorInfoScreenProps {}

const menuListData = [
  { key: 'info', text: '기본정보' },
  { key: 'password-change', text: '비밀번호 변경' },
  { key: 'post', text: '게시물' },
  { key: 'reply', text: '작성댓글' }
];

const EditorInfoScreen: React.FunctionComponent<IEditorInfoScreenProps> = observer((props: any) => {
  return (
    <CMContentFlexBox>
      <PageTitle title="에디터" />
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
});

export default EditorInfoScreen;
