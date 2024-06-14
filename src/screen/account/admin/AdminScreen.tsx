import { Box, Button, FormControl, Typography, Select, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CMBoxStretch, CMContentFlexBox, OptionContainer } from '../../../component/common/Box';
import PageTitle from '../../../component/contentHeader/PageTitle';
import { OptionItemHeadWithoutPadding } from '../../../component/optionBox/OptionItemHead';
import Divider from '@mui/material/Divider';
import AppHistory from '../../../AppHistory';
import ListDataStore from '../../../store/ListDataStore';
import { observer } from 'mobx-react';
import AdminListContent from '../../../component/content/ListContent';
import OptionSectionSubContainer from '../../../component/optionBox/OptionSectionSubContainer';
import SearchTextBox from '../../../component/optionBox/SearchTextBox';
import FlexEndMainButton from '../../../component/common/FlexEndMainButton';
import util from '../../../helper/util';
import contentUtil from '../../../component/content/contentUtil';

const listDataStore = new ListDataStore('admin', true, true);

const AdminScreen: React.FunctionComponent = observer(() => {
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleChange = (e: any) => {
    setRowsPerPage(e.target.value);
  };

  useEffect(() => {
    listDataStore.init();
  }, []);

  return (
    <CMContentFlexBox>
      <PageTitle title="관리자" />
      <Divider />

      <OptionContainer py={3}>
        <OptionSectionSubContainer>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <OptionItemHeadWithoutPadding text="검색" width="70px" />
            <SearchTextBox placeholder="이름, 아이디로 검색" onChange={(e: any) => listDataStore.setKeyword(e.target.value)} listDataStore={listDataStore} />
            {/* <Input placeholder="이름, 아이디로 검색" disableUnderline={true} sx={{ borderRadius: 2, flex: 1 }} /> */}
            <Button variant="contained" sx={{ marginLeft: 1 }} onClick={() => contentUtil.handleSearch(listDataStore)}>
              검색
            </Button>
          </Box>
        </OptionSectionSubContainer>
      </OptionContainer>

      <CMBoxStretch direction="column">
        <FlexEndMainButton onClick={() => AppHistory.push('/member/admin/add')} text="추가" />

        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} my={2}>
          <Typography ml={1} mr={2}>
            전체({listDataStore.totalCount})
          </Typography>
          <FormControl>
            <Select value={rowsPerPage} size="small" onChange={handleChange} sx={{ height: '30px' }}>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={40}>40</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
          <Typography mx={1}>개씩 보기</Typography>
        </Box>

        <Box sx={{ flex: 1 }}>
          <AdminListContent
            store={listDataStore}
            cols={[
              { key: 'rowNumber', name: 'No', width: 30 },
              {
                key: 'accountId',
                name: '아이디',
                onClickWithRowParam: (row: any) => {
                  if (row.status === 'normal') {
                    AppHistory.push(`/member/admin/${row.adminId}/info`);
                  } else {
                    alert('삭제된 관리자입니다.');
                  }
                },
                sx: { cursor: 'pointer' }
              },
              // { key: 'accountId', name: '아이디', onRowClick: (adminId: string) => AppHistory.push(`/member/admin/${adminId}/info`), sx: { cursor: 'pointer' }, rowKey: 'adminId' },
              { key: 'name', name: '이름' },
              { key: 'status', name: '상태', processData: (item: string) => util.getStatusText(item, 'admin') },
              { key: 'created', name: '가입일시' },
              { key: 'expired', name: '삭제일시', processData: (item: string) => util.convertDateFormat(item) }
            ]}
          />
          {/* Pagination 추가 필요 */}
        </Box>
      </CMBoxStretch>
    </CMContentFlexBox>
  );
});

export default AdminScreen;
