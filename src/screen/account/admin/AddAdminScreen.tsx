import { Box, Divider, TextField, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { BasicButton, LightButton } from '../../../component/common/Button';
import { BasicItemBox } from '../../../component/common/ItemBox';
import { ItemHead14 } from '../../../component/common/ItemHead';
import PageTitle from '../../../component/contentHeader/PageTitle';
import { CMContentFlexBox } from '../../../component/common/Box';
import AdminFormStore from '../../../store/AdminFormStore';
import { useNavigate } from 'react-router-dom';

interface IAddAdminProps {}

const adminFormStore = new AdminFormStore();

const AddAdminScreen: React.FunctionComponent<IAddAdminProps> = observer((props) => {
  const navigate = useNavigate();

  const cancleProcess = () => {
    adminFormStore.init();
    navigate('/member/editor');
  };

  return (
    <CMContentFlexBox>
      <PageTitle title="관리자" />
      <Divider />
      <Box sx={{ backgroundColor: 'primary.light' }} mt={2}>
        <Box sx={{ display: 'flex', padding: '20px 24px 0' }}>
          <Box sx={{ padding: '6px 12px', borderRadius: '4px 4px 0 0', background: '#fff' }}>
            <Typography>기본정보</Typography>
          </Box>
        </Box>
      </Box>

      <BasicItemBox>
        <ItemHead14 text="아이디" />
        <TextField inputProps={{ maxLength: 20 }} size="small" sx={{ borderRadius: 2, flex: 1 }} value={adminFormStore.accountId} onChange={(e) => adminFormStore.setAccountId(e.target.value)} />
      </BasicItemBox>
      <BasicItemBox>
        <ItemHead14 text="이름" />
        <TextField inputProps={{ maxLength: 20 }} size="small" sx={{ borderRadius: 2, flex: 1 }} value={adminFormStore.name} onChange={(e) => adminFormStore.setName(e.target.value)} />
      </BasicItemBox>
      <BasicItemBox>
        <ItemHead14 text="비밀번호" />
        <TextField
          inputProps={{ maxLength: 20 }}
          type="password"
          size="small"
          sx={{ borderRadius: 2, flex: 1 }}
          value={adminFormStore.password}
          onChange={(e) => adminFormStore.setPassword(e.target.value)}
        />
      </BasicItemBox>
      <Box sx={{ display: ' flex', justifyContent: 'flex-end' }}>
        <Box px={3}>
          <LightButton text="취소" onClick={() => cancleProcess()} />
          <BasicButton text="저장" onClick={() => adminFormStore.submitAddAdmin()} />
        </Box>
      </Box>
    </CMContentFlexBox>
  );
});

export default AddAdminScreen;
