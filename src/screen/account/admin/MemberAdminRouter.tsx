import { Box } from '@mui/material';
import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddAdminScreen from './AddAdminScreen';
import AdminInfoScreen from './AdminInfoScreen';
import AdminScreen from './AdminScreen';

interface IMemberAdminRouterProps {}

const MemberAdminRouter: React.FunctionComponent<IMemberAdminRouterProps> = (props) => {
  return (
    <Box>
      <Routes>
        <Route index element={<AdminScreen />} />
        <Route path="/add" element={<AddAdminScreen />} />
        <Route path="/:id" element={<AdminInfoScreen />} />
      </Routes>
    </Box>
  );
};

export default MemberAdminRouter;
