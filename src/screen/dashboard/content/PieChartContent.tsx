import { Box, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

interface IPieChartContentProps {
  dashboardFormStore: any;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#c17ec4', '#5f51a6', '#3a8562', '#de9571'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" fontSize={22} fontWeight="bold" stroke="gray" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}% (${value})`}
      <br />
    </text>
  );
};

const PieChartContent: React.FunctionComponent<IPieChartContentProps> = observer(({ dashboardFormStore }) => {
  return (
    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: '800px', height: '100%' }}>
        <ResponsiveContainer>
          <PieChart width={800} height={800}>
            {dashboardFormStore.activeCard === 'USER' && (
              <Pie data={dashboardFormStore.contentData} cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={220} fill="#8884d8" dataKey="userCount">
                {dashboardFormStore.contentData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            )}

            {dashboardFormStore.activeCard === 'POST' && (
              <Pie data={dashboardFormStore.contentData} cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={220} fill="#8884d8" dataKey="postCount">
                {dashboardFormStore.contentData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            )}

            {/* <Pie data={dashboardFormStore.contentData} dataKey="userCount" outerRadius={250} fill="" label={renderLabel}>
              {dashboardFormStore.contentData.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}>
                  <Typography sx={{ color: 'black' }}>ABD</Typography>
                </Cell>
              ))}
            </Pie> */}
            {/* <Pie data={sdata} label cx={200} cy={200} fill="green" dataKey="name" /> */}
          </PieChart>
        </ResponsiveContainer>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column' }} pr={5}>
        {dashboardFormStore.contentData.map((entry: any, index: number) => (
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ width: '10px', height: '10px', backgroundColor: COLORS[index] }} />
            <Typography>{entry.artistTitle}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
});

export default PieChartContent;
