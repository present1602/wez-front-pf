import * as React from 'react';
import { AppBar, Box, IconButton, Typography, Button } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { useStore } from '../../store/RootStore';
import { observer } from 'mobx-react';
import { AdminRequstHandler } from '../../api/member';
import Cookies from 'js-cookie';

interface ITopBarProps {}

const TopBar: React.FunctionComponent<ITopBarProps> = observer((props) => {
  const { authStore } = useStore();
  const [user, setUser] = React.useState({ name: '' });
  const navigate = useNavigate();

  const adminId = Cookies.get('admin_id');
  const adminType = Cookies.get('type');

  function logout() {
    AdminRequstHandler.logout({
      onSuccess: () => {
        authStore.init();
        window.localStorage.removeItem('user');
        // window.location.reload();
        navigate('/login');
      },
      onFail: () => alert('오류입니다')
    });
  }

  React.useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user: any = JSON.parse(userStr);
      setUser(user);
    }
  }, []);

  // const moveEditorMyPage = () => {
  //   navigate('/editor/mypage/info', { state: { adminId: adminId } });
  // };

  const handleProfileClick = () => {
    if (adminType === 'OFFICIAL') {
      navigate('/editor/mypage/info', { state: { adminId: adminId } });
    } else if (adminType === 'MASTER') {
      navigate(`/member/admin/${adminId}/info`, { state: { adminId: adminId } });
    }
  };

  return (
    <AppBar sx={{ backgroundColor: 'primary.light', zIndex: 150 }} position="fixed" elevation={0}>
      <Box sx={{ display: 'flex', flexDirection: 'row' }} px={3} py={0.5}>
        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} px={4}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={handleProfileClick}
            // onClick={() => {
            //   moveEditorMyPage();
            // }}
          >
            <IconButton color="primary">
              {/* {adminType === 'OFFICIAL' && ( */}
              <AccountCircle
              // onClick={() => {
              //   moveEditorMyPage();
              // }}
              />
              {/* )} */}
            </IconButton>
            <Typography color="primary">{user.name && user.name}</Typography>
          </Box>
          <Box px={2} />
          <Box p={0}>
            <Button size="small" variant="outlined" onClick={() => logout()}>
              로그아웃
            </Button>
          </Box>
        </Box>
      </Box>
    </AppBar>
  );
});

export default TopBar;
