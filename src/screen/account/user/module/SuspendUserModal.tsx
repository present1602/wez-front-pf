import { Box, Typography, TextField, Select, MenuItem } from '@mui/material';
import * as React from 'react';
import { CMBoxFlexEnd, CMBoxJustifyCenter } from '../../../../component/common/Box';
import { ModalBackground } from '../../../../component/common/Modal';
import CancelIcon from '@mui/icons-material/CancelOutlined';
import { BasicItemBox, ItemBox } from '../../../../component/common/ItemBox';
import { ItemHead16 } from '../../../../component/common/ItemHead';
import { AccentButton, LightButton } from '../../../../component/common/Button';
import { observer } from 'mobx-react';

interface ISuspendUserModalProps {
  userId?: string;
  setIsSuspendModalOpen?: any;
  submitUserStatusUpdate?: any;
}

const SuspendUserModal: React.FunctionComponent<ISuspendUserModalProps> = observer(({ setIsSuspendModalOpen, submitUserStatusUpdate, userId }) => {
  const [reason, setReason] = React.useState('');
  const [period, setPeriod] = React.useState(7);

  const cancleProcess = () => {
    setReason('');
    setIsSuspendModalOpen(false);
  };

  const handlePeriodChange = (e: any) => {
    setPeriod(e.target.value);
  };

  const submit = () => {
    if (window.confirm('이용정지를 시키시겠습니까?')) {
      const param = {
        userId: userId,
        reason: reason,
        period: period,
        status: 'suspended'
      };

      setReason('');
      setPeriod(7);

      submitUserStatusUpdate(param);
    }
  };

  return (
    <ModalBackground>
      <Box width={'460px'} sx={{ backgroundColor: '#fff' }} p={2}>
        <CMBoxFlexEnd px={1}>
          <CancelIcon onClick={() => cancleProcess()} sx={{ cursor: 'pointer' }} />
        </CMBoxFlexEnd>
        <CMBoxJustifyCenter>
          <Typography variant="h6">이용 정지</Typography>
        </CMBoxJustifyCenter>

        <Box>
          <BasicItemBox>
            <ItemHead16 text="정지기간" width="80px" />
            <Box sx={{ flex: 1 }}>
              <Select value={period} onChange={(e: any) => setPeriod(e.target.value)}>
                <MenuItem value={7}>7일</MenuItem>
                <MenuItem value={30}>30일</MenuItem>
                <MenuItem value={365}>365일</MenuItem>
              </Select>
            </Box>
          </BasicItemBox>
          <ItemBox>
            <ItemHead16 text="내용" width="80px" />
            <Box sx={{ flex: 1 }} pr={3}>
              <TextField multiline={true} sx={{ width: '100%' }} minRows={3} value={reason} onChange={(e: any) => setReason(e.target.value)} />
            </Box>
          </ItemBox>
          <CMBoxFlexEnd>
            <Typography>{reason.length} / 512</Typography>
          </CMBoxFlexEnd>
        </Box>
        <CMBoxJustifyCenter>
          <LightButton onClick={() => cancleProcess()} text="취소" />
          <AccentButton onClick={() => submit()} text="확인" backgroundColor="highlight.main" />
        </CMBoxJustifyCenter>
      </Box>
    </ModalBackground>
  );
});

export default SuspendUserModal;
