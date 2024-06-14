import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { OptionItemHead, OptionItemHeadWithoutPadding } from '../../../component/optionBox/OptionItemHead';
import OptionSectionSubContainer from '../../../component/optionBox/OptionSectionSubContainer';
import DatePicker from 'react-datepicker';
import { CMLineBox, OptionContainer } from '../../../component/common/Box';
import { CheckboxGroupContent } from '../../../component/optionBox/CheckboxGroup';
import SearchTextBox from '../../../component/optionBox/SearchTextBox';
import contentUtil from '../../../component/content/contentUtil';
import { useStore } from '../../../store/RootStore';
import { observer } from 'mobx-react';

interface OptionSectionProps {
  listDataStore: any;
}

const OptionSection: React.FunctionComponent<OptionSectionProps> = observer(({ listDataStore }) => {
  const { optionDataStore } = useStore();
  const [artistList, setArtistList] = React.useState<any>(optionDataStore.getOptionData('artistList'));

  const [showDateOption, setShowDateOption] = React.useState('hide');

  const handlePeriodOptionSetting = (e: any) => {
    if (e.target.value === 'hide') {
      listDataStore.searchOptionStore.setStartDate(null);
      listDataStore.searchOptionStore.setEndDate(null);
    } else if (e.target.value === 'show') {
      if (showDateOption === 'hide') {
        listDataStore.searchOptionStore.setStartDate(new Date());
        listDataStore.searchOptionStore.setEndDate(new Date());
      }
    }
    listDataStore.searchOptionStore.setIsPeriodSearch(e.target.value);

    setShowDateOption(e.target.value);
  };

  const handleReportCountChange = (e: any) => {
    listDataStore.searchOptionStore.changeOptionValue('reportCount', e.target);
  };

  const handleDateChange = (date: any, key: string) => {
    if (key === 'start') {
      listDataStore.searchOptionStore.setStartDate(date);
    } else if (key === 'end') {
      listDataStore.searchOptionStore.setEndDate(date);
    }
  };

  React.useEffect(() => {
    if (optionDataStore.getOptionData('artistList').length === 0) {
      const strData: any = localStorage.getItem('artistList');
      setArtistList(JSON.parse(strData));
    }
  }, []);

  return (
    <OptionContainer py={2}>
      <CMLineBox my={2}>
        <OptionItemHead text="아티스트" />
        {artistList && artistList.length > 0 && <CheckboxGroupContent searchOptionStore={listDataStore.searchOptionStore} optionList={artistList} optionKey="artistList" listKey="report" />}
      </CMLineBox>

      <OptionSectionSubContainer my={1}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <OptionItemHeadWithoutPadding text="검색" width="70px" />
          <SearchTextBox placeholder="닉네임, 내용으로 검색" onChange={(e: any) => listDataStore.setKeyword(e.target.value)} listDataStore={listDataStore} />
          <Button variant="contained" sx={{ marginLeft: 1 }} onClick={() => contentUtil.handleSearch(listDataStore)}>
            검색
          </Button>
        </Box>
      </OptionSectionSubContainer>

      <CMLineBox my={2}>
        <OptionItemHead text="상태" />
        <CheckboxGroupContent searchOptionStore={listDataStore.searchOptionStore} optionList={optionDataStore.getOptionData('reportState')} optionKey="reportState" listKey="report" />
      </CMLineBox>

      <CMLineBox my={2}>
        <Box sx={{ display: 'flex', flex: 1 }}>
          <OptionItemHead text="누적신고수" />
          <RadioGroup value={listDataStore.searchOptionStore.reportCount} onChange={(e: any) => handleReportCountChange(e)} row>
            <FormControlLabel value={0} control={<Radio />} label="전체" />
            <FormControlLabel value={2} control={<Radio />} label="10회 이상" />
          </RadioGroup>
        </Box>

        <Box sx={{ display: 'flex', flex: 1 }}>
          <OptionItemHead text="기간" />
          <Box sx={{ flex: 1 }}>
            <RadioGroup value={showDateOption} onChange={(e: any) => handlePeriodOptionSetting(e)} row>
              <FormControlLabel value={'hide'} control={<Radio />} label="전체" />
              <FormControlLabel value={'show'} control={<Radio />} label="선택" />
            </RadioGroup>

            {showDateOption === 'show' && (
              <Box sx={{ maxWidth: '320px' }}>
                <Box sx={{ backgroundColor: '#fff', display: 'flex', alignItems: 'center', borderRadius: 5 }} px={2}>
                  <DatePicker
                    selected={listDataStore.searchOptionStore.startDate}
                    customInput={<TextField size="small" sx={{ width: 140 }} />}
                    onChange={(date: any) => handleDateChange(date, 'start')}
                  />
                  <Typography px={1}> ~ </Typography>
                  <DatePicker selected={listDataStore.searchOptionStore.endDate} customInput={<TextField size="small" sx={{ width: 140 }} />} onChange={(date: any) => handleDateChange(date, 'end')} />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </CMLineBox>
    </OptionContainer>
  );
});

export default OptionSection;
