import { Box, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../store/RootStore';

interface IMasterRouteProps {
  component: any;
}

const MasterRoute: React.FunctionComponent<IMasterRouteProps> = ({ component }) => {
  const { authStore } = useStore();

  const adminType = Cookies.get('type');

  React.useEffect(() => {
    if (!authStore.isAuthenticated) {
      <Navigate to="/login" />;
    }
  }, []);
  return adminType === 'MASTER' ? (
    component
  ) : (
    <Box p={3}>
      <Typography variant="h4">접근할 수 없는 페이지입니다.</Typography>
    </Box>
  );
};

export default MasterRoute;
