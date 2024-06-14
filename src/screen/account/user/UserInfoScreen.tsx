import { Divider } from '@mui/material';
import Cookies from 'js-cookie';
import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CMBoxStretch, CMContentFlexBox } from '../../../component/common/Box';
import PageTitle from '../../../component/contentHeader/PageTitle';
import TabMenuWithBackgroundColor from '../../../component/contentMenu/TabMenuWithBackgroundColor';
import UserAccountInfo from './content/UserAccountInfo';
import UserPost from './content/UserPost';
import UserReply from './content/UserReply';
import UserSuspend from './content/UserSuspend';

interface IUserInfoScreenProps {}

// const menuListData = getDetailMenuListData('user');
const menuListData = [
  { key: 'info', text: '가입정보' },
  { key: 'post', text: '작성게시물' },
  { key: 'reply', text: '작성댓글' },
  { key: 'suspend', text: '정지이력' }
];

const UserInfoScreen: React.FunctionComponent<IUserInfoScreenProps> = (props) => {
  const adminType = Cookies.get('type');
  return (
    <CMContentFlexBox>
      <PageTitle title="회원" />
      <Divider />

      {adminType === 'MASTER' && <TabMenuWithBackgroundColor menuListData={menuListData} />}

      <CMBoxStretch direction="column">
        {adminType === 'MASTER' ? (
          <Routes>
            <Route path="info" element={<UserAccountInfo />} />
            <Route path="post" element={<UserPost />} />
            <Route path="reply" element={<UserReply />} />
            <Route path="suspend" element={<UserSuspend />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="info" element={<UserAccountInfo />} />
          </Routes>
        )}
      </CMBoxStretch>
    </CMContentFlexBox>
  );
};

export default UserInfoScreen;
