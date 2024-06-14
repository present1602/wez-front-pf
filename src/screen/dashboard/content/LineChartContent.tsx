import { Box } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface ILineChartContentProps {
  dashboardFormStore: any;
}

const LineChartContent: React.FunctionComponent<ILineChartContentProps> = observer(({ dashboardFormStore }) => {
  return (
    <Box sx={{ flex: 1 }}>
      <ResponsiveContainer>
        <LineChart
          height={500}
          data={dashboardFormStore.contentData.slice()}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="dateText" />

          <YAxis type="number" yAxisId="right" allowDecimals={false} />
          {/* <YAxis tickFormatter={(value) => parseInt(value).toLocaleString()} /> */}
          {/* <YAxis interval="preserveStartEnd" /> */}
          <Legend />
          {dashboardFormStore.activeCard === 'USER' && <Line yAxisId="right" type="monotone" dataKey="userCount" stroke="#ff7300" />}
          {dashboardFormStore.activeCard === 'POST' && <Line yAxisId="right" type="monotone" dataKey="postCount" stroke="#ff7300" />}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
});

export default LineChartContent;
