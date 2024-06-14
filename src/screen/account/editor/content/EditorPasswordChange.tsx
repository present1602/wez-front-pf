import { Box, TextField } from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router';
import { AdminRequstHandler } from '../../../../api/member';
import { ItemHead14 } from '../../../../component/common/ItemHead';
import { BasicItemBox } from '../../../../component/common/ItemBox';
import FlexEndMainButton from '../../../../component/common/FlexEndMainButton';
import { observer } from 'mobx-react';
import { execPasswordValidator } from '../../../../helper/Validator';

interface IEditorPasswordChange {}

const EditorPasswordChange: React.FunctionComponent<IEditorPasswordChange> = observer((props) => {
  const [passwordInput, setPasswordInput] = React.useState('');
  const [passwordCheckInput, setPasswordCheckInput] = React.useState('');
  const { userId } = useParams();

  React.useEffect(() => {}, []);

  const handleInputChange = (val: string, key: string) => {
    switch (key) {
      case 'passwordInput':
        setPasswordInput(val);
        break;
      case 'passwordCheckInput':
        setPasswordCheckInput(val);
        break;
    }
  };

  const submitChange = () => {
    if (passwordInput !== passwordCheckInput) {
      alert('비밀번호가 일치하지 않습니다');
      return;
    } else if (!passwordInput || passwordInput.length < 4 || passwordInput.length > 20 || passwordInput.indexOf(' ') >= 0) {
      alert('비밀번호를 올바르게 입력해주세요');
      return;
    }
    if (window.confirm('비밀번호를 변경하시겠습니까?')) {
      if (userId) {
        const param = {
          userId: userId,
          password: passwordInput
        };

        AdminRequstHandler.updateEditorPasswordByMaster(param, { onSuccess: () => alert('비밀번호를 변경하였습니다.'), onFail: () => alert('비밀번호 변경에 실퍄했습니다.') });
      }
    }
  };
  return (
    <Box maxWidth="1000px">
      <Box py={3} />

      <BasicItemBox>
        <ItemHead14 text="새 비밀번호" />
        <TextField type="password" size="small" sx={{ borderRadius: 2, flex: 1 }} value={passwordInput} onChange={(e) => handleInputChange(e.target.value, 'passwordInput')} />
      </BasicItemBox>

      <BasicItemBox>
        <ItemHead14 text="새 비밀번호 확인" />
        <TextField type="password" size="small" sx={{ borderRadius: 2, flex: 1 }} value={passwordCheckInput} onChange={(e) => handleInputChange(e.target.value, 'passwordCheckInput')} />
      </BasicItemBox>

      <FlexEndMainButton text="변경" onClick={() => submitChange()} />
    </Box>
  );
});

export default EditorPasswordChange;
