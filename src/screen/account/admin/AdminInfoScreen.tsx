import { Divider } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import PageTitle from '../../../component/contentHeader/PageTitle';
import { CMContentFlexBox, CMBoxStretch } from '../../../component/common/Box';
import AdminFormStore from '../../../store/AdminFormStore';
import { AdminRequstHandler } from '../../../api/member';
import { useParams } from 'react-router';
import TabMenuWithBackgroundColor from '../../../component/contentMenu/TabMenuWithBackgroundColor';
import { Route, Routes } from 'react-router-dom';
import AdminBasicInfo from './content/AdminBasicInfo';
import AdminPasswordChange from './content/AdminPasswordChange';

interface IAdminInfoScreenProps {}

const adminFormStore = new AdminFormStore();

const menuListData = [
  { key: 'info', text: '기본정보' },
  { key: 'password-change', text: '비밀번호 변경' }
];

const AdminInfoScreen: React.FunctionComponent<IAdminInfoScreenProps> = observer((props: any) => {
  const { adminId } = useParams();

  React.useEffect(() => {
    AdminRequstHandler.getAdmin(adminId, {
      onSuccess: (admin: any) => {
        adminFormStore.setMultipleItem(admin);
      },
      onFail: () => {
        alert('조회 실패');
      }
    });
  }, []);

  return (
    <CMContentFlexBox>
      <PageTitle title="관리자" />
      <Divider />

      <TabMenuWithBackgroundColor menuListData={menuListData} />

      <CMBoxStretch direction="column">
        <Routes>
          <Route path="info" element={<AdminBasicInfo />} />
          <Route path="password-change" element={<AdminPasswordChange />} />
        </Routes>
      </CMBoxStretch>
    </CMContentFlexBox>
  );
});

export default AdminInfoScreen;
