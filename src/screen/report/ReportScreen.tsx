import { Box } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { CMBoxStretch, CMContentFlexBox } from '../../component/common/Box';
import PageTitle from '../../component/contentHeader/PageTitle';
import { TabMenuWithPathVariable as ContentTabMenu } from '../../component/contentMenu/TabMenu';
import { getDetailMenuListData } from '../../constants/menu';
import DatePicker from 'react-datepicker';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { observer } from 'mobx-react';
import ReportReply from './content/ReportReply';
import ReportPost from './content/ReportPost';

interface IReportScreenProps {}

const menuListData = getDetailMenuListData('report');

const DatePickerComponent = () => {
  const [startDate, setStartDate] = React.useState(new Date());
  const ExampleCustomInput = ({ value, onClick }: any) => (
    <button className="example-custom-input" onClick={onClick}>
      {value}
      <ArrowDropDownIcon />
    </button>
  );
  return <DatePicker selected={startDate} onChange={(date: any) => setStartDate(date)} customInput={<ExampleCustomInput />} />;
};

// const DatePickerComponent2 = ({ setSearchDateString, setSelectedEndDateString, isRangeSearch }: any) => {
const DatePickerComponent2 = ({}: any) => {
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const dateToString = (date: any) => {
    return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
  };

  React.useEffect(() => {
    setStartDate(dateToString(startDate));
    setEndDate(dateToString(endDate));
  }, [startDate, endDate]);

  const CustomInput = ({ value, onClick }: any) => (
    <Box>
      {value}
      <ArrowDropDownIcon />
      {/* {
        isCalendarOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
      } */}
    </Box>
  );

  return CustomInput;
};

const ReportScreen: React.FunctionComponent<IReportScreenProps> = observer((props) => {
  const { type } = useParams();
  const [reportContentType, setReportContentType] = useState(type);

  return (
    <CMContentFlexBox>
      <PageTitle title="신고" />
      <ContentTabMenu menuListData={menuListData} setReportContentType={setReportContentType} path={'/content/report'} />
      <CMBoxStretch direction="column">
        {reportContentType === 'post' && <ReportPost />}
        {reportContentType === 'reply' && <ReportReply />}
      </CMBoxStretch>
    </CMContentFlexBox>
  );
});

export default ReportScreen;
