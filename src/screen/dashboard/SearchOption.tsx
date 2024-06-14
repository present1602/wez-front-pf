import { Box, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { v4 } from 'uuid';
import 'react-calendar/dist/Calendar.css';
import { observer } from 'mobx-react';
import DatePicker from 'react-datepicker';
import util from '../../helper/util';

interface ISearchOptionProps {
  dashboardFormStore: any;
}

const SearchOption: React.FunctionComponent<ISearchOptionProps> = observer(({ dashboardFormStore }) => {
  const handleOptionTypeChange = (val: string) => {
    dashboardFormStore.setOptionType(val);
  };

  const handlePeriodOptionChange = (val: string) => {
    dashboardFormStore.initPeriodData();
    dashboardFormStore.setPeriodOption(val);
  };

  const handleDateChange = (date: any, key: string) => {
    if (key === 'start') {
      dashboardFormStore.setStartDate(date);
    } else if (key === 'end') {
      dashboardFormStore.setEndDate(date);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100px', alignItems: 'center', backgroundColor: 'rgb(109,109,109)', color: '#fff', width: '100%', maxWith: '1200px' }}>
      <Box sx={{ width: '110px' }}>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          기간설정
        </Typography>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{
            width: '260px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
          px={2}
        >
          <Box>
            <RadioGroup row onChange={(e) => handleOptionTypeChange(e.target.value)} value={dashboardFormStore.optionType}>
              <FormControlLabel
                label="기간별"
                control={
                  <Radio
                    sx={{
                      color: '#fff',
                      '&.Mui-checked': {
                        color: '#fff'
                      }
                    }}
                  />
                }
                value="PERIOD"
              />

              <FormControlLabel
                label="그룹별"
                control={
                  <Radio
                    sx={{
                      color: '#fff',
                      '&.Mui-checked': {
                        color: '#fff'
                      }
                    }}
                  />
                }
                value="ARTIST"
              />
            </RadioGroup>
          </Box>
          {dashboardFormStore.optionType === 'PERIOD' && (
            <Box>
              <RadioGroup row onChange={(e) => handlePeriodOptionChange(e.target.value)} value={dashboardFormStore.periodOption}>
                <FormControlLabel
                  label="일별"
                  control={
                    <Radio
                      sx={{
                        color: '#fff',
                        '&.Mui-checked': {
                          color: '#fff'
                        }
                      }}
                    />
                  }
                  value="DAY"
                />
                <FormControlLabel
                  label="월별"
                  control={
                    <Radio
                      sx={{
                        color: '#fff',
                        '&.Mui-checked': {
                          color: '#fff'
                        }
                      }}
                    />
                  }
                  value="MONTH"
                />
                <FormControlLabel
                  label="연도별"
                  control={
                    <Radio
                      sx={{
                        color: '#fff',
                        '&.Mui-checked': {
                          color: '#fff'
                        }
                      }}
                    />
                  }
                  value="YEAR"
                />
              </RadioGroup>
            </Box>
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative', justifyContent: 'center' }} py={2}>
          <Box
            sx={{
              padding: '5px',
              width: '100%',
              textAlign: 'center'
            }}
          >
            {dashboardFormStore.optionType === 'PERIOD' && dashboardFormStore.periodOption === 'DAY' && (
              <Box sx={{ backgroundColor: '#fff', display: 'flex', alignItems: 'center', borderRadius: 5 }} px={2}>
                <DatePicker selected={dashboardFormStore.startDate} customInput={<TextField size="small" sx={{ width: 140 }} />} onChange={(date: any) => handleDateChange(date, 'start')} />
                <Typography px={1}> ~ </Typography>
                <DatePicker selected={dashboardFormStore.endDate} customInput={<TextField size="small" sx={{ width: 140 }} />} onChange={(date: any) => handleDateChange(date, 'end')} />
              </Box>
            )}
            {dashboardFormStore.optionType === 'PERIOD' && (dashboardFormStore.periodOption === 'MONTH' || dashboardFormStore.periodOption === 'YEAR') && (
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', borderRadius: 1 }} px={1}>
                  <Select
                    value={dashboardFormStore.startYear}
                    onChange={(e: any) => dashboardFormStore.setStartYear(e.target.value)}
                    size="small"
                    sx={{
                      backgroundColor: '#fff',
                      textAlign: 'center',
                      width: '110px'
                    }}
                    key={v4()}
                  >
                    {util.range([2020, 2024]).map((el: number) => {
                      return <MenuItem value={el}>{el.toString()}년</MenuItem>;
                    })}
                  </Select>
                </Box>

                {dashboardFormStore.periodOption === 'MONTH' && (
                  <Box sx={{ display: 'flex', alignItems: 'center', borderRadius: 1 }} px={1}>
                    <Select
                      value={dashboardFormStore.startMonth}
                      onChange={(e: any) => dashboardFormStore.setStartMonth(e.target.value)}
                      size="small"
                      sx={{
                        backgroundColor: '#fff',
                        textAlign: 'center',
                        width: '80px'
                      }}
                      key={v4()}
                    >
                      {util.range([1, 13]).map((el: number) => {
                        return (
                          <MenuItem value={el} key={v4()}>
                            {el.toString()}월
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Box>
                )}
                <Typography variant="h5" sx={{ padding: '0 4px' }}>
                  {' '}
                  ~{' '}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', borderRadius: 1 }} px={1}>
                  <Select
                    value={dashboardFormStore.endYear}
                    onChange={(e: any) => dashboardFormStore.setEndYear(e.target.value)}
                    size="small"
                    sx={{
                      backgroundColor: '#fff',
                      textAlign: 'center',
                      width: '110px'
                    }}
                    key={v4()}
                  >
                    {util.range([2020, 2024]).map((el: number) => {
                      return (
                        <MenuItem value={el} key={v4()}>
                          {el.toString()}년
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Box>

                {dashboardFormStore.periodOption === 'MONTH' && (
                  <Box sx={{ display: 'flex', alignItems: 'center', borderRadius: 1 }} px={1}>
                    <Select
                      value={dashboardFormStore.endMonth}
                      onChange={(e: any) => dashboardFormStore.setEndMonth(e.target.value)}
                      size="small"
                      sx={{
                        backgroundColor: '#fff',
                        textAlign: 'center',
                        width: '80px'
                      }}
                    >
                      {util.range([1, 13]).map((el: number) => {
                        return (
                          <MenuItem value={el} key={v4()}>
                            {el.toString()}월
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Box px={4} />
    </Box>
  );
});

export default SearchOption;
