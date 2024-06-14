import { Box, TextField } from '@mui/material';
import * as React from 'react';
import { AdminRequstHandler } from '../../../../api/member';
import { ItemHead14 } from '../../../../component/common/ItemHead';
import { BasicItemBox } from '../../../../component/common/ItemBox';
import Cookies from 'js-cookie';
import FlexEndMainButton from '../../../../component/common/FlexEndMainButton';
import { observer } from 'mobx-react';

interface IEditorMyPagePasswordChange {}

const EditorMyPagePasswordChange: React.FunctionComponent<IEditorMyPagePasswordChange> = observer((props) => {
  const [passwordInput, setPasswordInput] = React.useState('');
  const [newPasswordInput, setNewPasswordInput] = React.useState('');
  const [newPasswordCheckInput, setNewPasswordCheckInput] = React.useState('');
  const adminId = Cookies.get('admin_id');

  React.useEffect(() => {}, []);

  const handleInputChange = (val: string, key: string) => {
    switch (key) {
      case 'passwordInput':
        setPasswordInput(val);
        break;
      case 'newPasswordInput':
        setNewPasswordInput(val);
        break;
      case 'newPasswordCheckInput':
        setNewPasswordCheckInput(val);
        break;
    }
  };

  const submitChange = () => {
    if (!passwordInput || passwordInput.length < 4 || passwordInput.length > 20 || passwordInput.indexOf(' ') >= 0) {
      alert('비밀번호를 올바르게 입력해주세요');
      return;
    }
    if (newPasswordInput !== newPasswordCheckInput) {
      alert('비밀번호가 일치하지 않습니다');
      return;
    } else if (!newPasswordInput || newPasswordInput.length < 4 || newPasswordInput.length > 20 || newPasswordInput.indexOf(' ') >= 0) {
      alert('비밀번호를 올바르게 입력해주세요');
      return;
    }

    if (window.confirm('비밀번호를 변경하시겠습니까?')) {
      if (adminId) {
        const param = {
          adminId: adminId,
          password: passwordInput,
          newPassword: newPasswordInput
        };

        AdminRequstHandler.updatePassword(param, { onSuccess: () => alert('비밀번호를 변경하였습니다.'), onFail: () => alert('비밀번호 변경에 실퍄했습니다.') });
      }
    }
  };
  return (
    <Box maxWidth="1000px">
      <Box py={3} />
      <BasicItemBox>
        <ItemHead14 text="현재 비밀번호" />
        <TextField type="password" size="small" sx={{ borderRadius: 2, flex: 1 }} value={passwordInput} onChange={(e) => handleInputChange(e.target.value, 'passwordInput')} />
      </BasicItemBox>

      <BasicItemBox>
        <ItemHead14 text="새 비밀번호" />
        <TextField type="password" size="small" sx={{ borderRadius: 2, flex: 1 }} value={newPasswordInput} onChange={(e) => handleInputChange(e.target.value, 'newPasswordInput')} />
      </BasicItemBox>

      <BasicItemBox>
        <ItemHead14 text="새 비밀번호 확인" />
        <TextField type="password" size="small" sx={{ borderRadius: 2, flex: 1 }} value={newPasswordCheckInput} onChange={(e) => handleInputChange(e.target.value, 'newPasswordCheckInput')} />
      </BasicItemBox>

      <FlexEndMainButton text="변경" onClick={() => submitChange()} />
    </Box>
  );
});

export default EditorMyPagePasswordChange;
