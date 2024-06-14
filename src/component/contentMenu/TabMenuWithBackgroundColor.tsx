import { Box, styled, Typography } from '@mui/material';
import * as React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

const TabItemBox: any = styled('div')((props: any) => ({
  borderTopRightRadius: 10,
  borderTopLeftRadius: 10,
  display: 'flex',
  padding: '20px 12px 0'
}));

const TabMenuWithBackgroundColor = (props: any) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeContentPath = pathname.split('/')[pathname.split('/').length - 1];

  return (
    <Box sx={{ backgroundColor: 'primary.light', display: 'flex' }} mt={2} px={2}>
      {props.menuListData.map((el: any) => (
        <TabItemBox onClick={() => navigate(`./${el.key}`)} key={el.key}>
          <Box sx={{ padding: '6px 12px', borderRadius: '4px 4px 0 0', background: '#fff', cursor: 'pointer' }}>
            {activeContentPath === el.key ? <Typography sx={{ fontWeight: 'bold' }}>{el.text}</Typography> : <Typography sx={{ color: 'neutral.moderate' }}>{el.text}</Typography>}
          </Box>
        </TabItemBox>
      ))}
    </Box>
  );
};

export default TabMenuWithBackgroundColor;
