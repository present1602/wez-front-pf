import { Box, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import PageTitle from '../../component/contentHeader/PageTitle';
import { CMBoxStretch, CMContentFlexBox } from '../../component/common/Box';
import DataCard from './DataCard';
import { DashboardRequestHandler } from '../../api/content';
import DashboardFormStore from '../../store/DashboardFormStore';
import SearchOption from './SearchOption';
import LineChartContent from './content/LineChartContent';
import PieChartContent from './content/PieChartContent';
import { useNavigate } from 'react-router';

interface DashboardProps {}

const dashboardFormStore = new DashboardFormStore();

const Dashboard: React.FunctionComponent<DashboardProps> = observer(() => {
  const navigate = useNavigate();

  const [summaryData, setSummaryData] = React.useState({
    userTotalCount: 0,
    newUserCount: 0,
    postTotalCount: 0,
    newPostCount: 0,
    newReportCount: 0
  });

  useEffect(() => {
    DashboardRequestHandler.getSummaryData({
      onSuccess: (data: any) => {
        setSummaryData(data);
      }
    });
  }, []);

  React.useEffect(() => {
    dashboardFormStore.init();

    dashboardFormStore.fetchContentData();
  }, []);

  return (
    <CMContentFlexBox>
      <PageTitle title="대시보드" />
      <Box sx={{ display: 'flex', maxWidth: '1200px' }}>
        <DataCard isActive={dashboardFormStore.activeCard === 'USER' ? true : false} onClick={() => dashboardFormStore.setActiveCard('USER')}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4">회원수</Typography>
            <Typography variant="h6">신규회원수</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} p={1}>
            <Typography>
              +{summaryData.newUserCount} / {summaryData.userTotalCount}
            </Typography>
          </Box>
        </DataCard>
        <DataCard isActive={dashboardFormStore.activeCard === 'POST' ? true : false} onClick={() => dashboardFormStore.setActiveCard('POST')}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4">게시물 수</Typography>
            <Typography variant="h6">신규 게시물수</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} p={1}>
            <Typography>
              +{summaryData.newPostCount} / {summaryData.postTotalCount}
            </Typography>
          </Box>
        </DataCard>

        <DataCard>
          <Box sx={{ flex: 1 }} onClick={() => navigate('/content/report/post')}>
            <Typography variant="h4">신고수</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} p={1}>
            <Typography>{summaryData.newReportCount}</Typography>
          </Box>
        </DataCard>
      </Box>
      <Box py={3} />
      <CMBoxStretch direction="column">
        <SearchOption dashboardFormStore={dashboardFormStore} />
        {dashboardFormStore.optionType === 'PERIOD' && <LineChartContent dashboardFormStore={dashboardFormStore} />}
        {dashboardFormStore.optionType === 'ARTIST' && <PieChartContent dashboardFormStore={dashboardFormStore} />}
      </CMBoxStretch>
    </CMContentFlexBox>
  );
});

export default Dashboard;
