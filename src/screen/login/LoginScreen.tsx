import { LockOutlined } from '@mui/icons-material';
import { Avatar, Button, Container, createTheme, TextField, ThemeProvider, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { CMBoxCenter } from '../../component/common/Box';
import AppHistory from '../../AppHistory';
import { useStore } from '../../store/RootStore';
import Cookies from 'js-cookie';

interface LoginScreenProps {}

const mainTextTheme: any = createTheme({
  typography: {
    h1: {
      fontWeight: 'bold',
      fontSize: 36,
      textAlign: 'center'
    }
  }
});

const LoginScreen: React.FunctionComponent<LoginScreenProps> = observer(() => {
  const { authStore, loginStore } = useStore();
  const navitate = useNavigate();

  useEffect(() => {
    const adminId = Cookies.get('admin_id');
    const adminType = Cookies.get('type');
    if (!adminId) {
      if (adminType === 'MASTER') {
        AppHistory.push('/dashboard');
      } else if (adminType === 'OFFICIAL') {
        AppHistory.push('/content/post');
      }
    }
    // if (authStore.isAuthenticated) {
    //   // navitate('/dashboard');
    //   AppHistory.push('/dashboard');
    // }
  }, []);

  return (
    <Container maxWidth="xs" sx={{ marginTop: '150px' }}>
      <CMBoxCenter direction="column">
        <CMBoxCenter>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
        </CMBoxCenter>

        <ThemeProvider theme={mainTextTheme}>
          <Typography variant="h1" sx={{ textAlign: 'center' }}>
            <Typography component="span" variant="h1" sx={{ color: 'secondary.main' }}>
              WEZ
            </Typography>
            <Typography component="span" variant="h1" mx={2}>
              관리자 로그인
            </Typography>
          </Typography>
        </ThemeProvider>
      </CMBoxCenter>

      <TextField label="아이디" required fullWidth autoFocus margin="normal" value={loginStore.accountId} onChange={(e) => loginStore.setAccountId(e.target.value)} />
      <TextField label="비밀번호" type="password" required margin="normal" fullWidth value={loginStore.password} onChange={(e) => loginStore.setPassword(e.target.value)} />

      {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="아이디 저장" /> */}
      <Button color="primary" fullWidth sx={{ mt: 3, p: 2 }} type="submit" variant="contained" onClick={() => loginStore.submitLogin()}>
        <Typography variant="h6">로그인</Typography>
      </Button>
    </Container>
  );
});

export default LoginScreen;
