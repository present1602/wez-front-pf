import { Box, TextField, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { BasicButton, LightButton } from '../../../../component/common/Button';
import { BasicItemBox } from '../../../../component/common/ItemBox';
import { ItemHead14 } from '../../../../component/common/ItemHead';
import AdminFormStore from '../../../../store/AdminFormStore';
import { AdminRequstHandler } from '../../../../api/member';
import { useParams } from 'react-router';

interface IAdminInfoScreenProps {}

const adminFormStore = new AdminFormStore();

const AdminInfoScreen: React.FunctionComponent<IAdminInfoScreenProps> = observer((props: any) => {
  const { adminId } = useParams();

  React.useEffect(() => {
    AdminRequstHandler.getAdmin(adminId, {
      onSuccess: (admin: any) => {
        // adminFormStore.setAccountId(admin.accountId);
        // adminFormStore.setName(admin.name);
        // adminFormStore.setPassword(admin.name);
        adminFormStore.setMultipleItem(admin);
      },
      onFail: () => {
        alert('조회 실패');
      }
    });
  }, [adminId]);

  const deleteAdmin = () => {
    if (window.confirm('관리자를 삭제하시겠습니까?')) {
      adminId && adminFormStore.submitDeleteAdmin(adminId);
    }
  };

  return (
    <>
      <BasicItemBox>
        <ItemHead14 text="아이디" />
        <TextField inputProps={{ maxLength: 20 }} size="small" sx={{ borderRadius: 2, flex: 1 }} value={adminFormStore.accountId} onChange={(e) => adminFormStore.setAccountId(e.target.value)} />
      </BasicItemBox>
      <BasicItemBox>
        <ItemHead14 text="이름" />
        <TextField inputProps={{ maxLength: 20 }} size="small" sx={{ borderRadius: 2, flex: 1 }} value={adminFormStore.name} onChange={(e) => adminFormStore.setName(e.target.value)} />
      </BasicItemBox>

      <BasicItemBox>
        <ItemHead14 text="상태" />
        <Typography>{adminFormStore.getStatusText(adminFormStore.status)}</Typography>
      </BasicItemBox>

      <Box sx={{ display: ' flex', justifyContent: 'flex-end' }}>
        <Box px={3}>
          <LightButton text="저장" onClick={() => adminFormStore.submitUpdateAdmin()} />
          <BasicButton text="삭제" onClick={() => deleteAdmin()} />
        </Box>
      </Box>
    </>
  );
});

export default AdminInfoScreen;
