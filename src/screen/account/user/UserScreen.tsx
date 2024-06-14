import { Box, Divider, Button } from '@mui/material';
import React from 'react';
import PageTitle from '../../../component/contentHeader/PageTitle';
import { CMContentFlexBox, CMLineBox, OptionContainer } from '../../../component/common/Box';
import { OptionItemHead, OptionItemHeadWithoutPadding } from '../../../component/optionBox/OptionItemHead';
import { CheckboxGroupContent } from '../../../component/optionBox/CheckboxGroup';
import ListDataStore from '../../../store/ListDataStore';
import util from '../../../helper/util';
import UserListContent from '../../../component/content/ListContent';
import SearchTextBox from '../../../component/optionBox/SearchTextBox';
import { observer } from 'mobx-react';
import ListHeader from '../../../component/content/ListHeader';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../../../store/RootStore';
import contentUtil from '../../../component/content/contentUtil';

interface UserScreenProps {}

const listDataStore = new ListDataStore('user', true, true);

const UserScreen: React.FunctionComponent<UserScreenProps> = observer(() => {
  const { optionDataStore } = useStore();
  const [artistList, setArtistList] = React.useState<any>(optionDataStore.getOptionData('artistList'));
  const location: any = useLocation();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (optionDataStore.getOptionData('artistList').length === 0) {
      const strData: any = localStorage.getItem('artistList');
      setArtistList(JSON.parse(strData));
    }

    if (location.state && location.state.init) {
      listDataStore.init();
      navigate(location.pathname, { state: {}, replace: true });
    } else {
      listDataStore.fetchListData();
    }
  }, [location]);

  const moveUserInfoPage = (userId: string) => {
    navigate(`./${userId}/info`);
  };

  return (
    <CMContentFlexBox>
      <PageTitle title="회원" />
      <Divider />
      <OptionContainer>
        <Box my={1} />
        <CMLineBox my={2}>
          <OptionItemHead text="아티스트" />
          {artistList && artistList.length > 0 && <CheckboxGroupContent searchOptionStore={listDataStore.searchOptionStore} optionList={artistList} optionKey="artistList" listKey="user" />}
        </CMLineBox>

        <CMLineBox my={2}>
          <Box sx={{ display: 'flex', flex: 1 }}>
            <OptionItemHead text="분류" />
            <CheckboxGroupContent searchOptionStore={listDataStore.searchOptionStore} optionList={optionDataStore.getOptionData('userType')} optionKey="userType" />
          </Box>

          <Box sx={{ display: 'flex', flex: 1 }}>
            <OptionItemHead text="가입정보" />
            <CheckboxGroupContent searchOptionStore={listDataStore.searchOptionStore} optionList={optionDataStore.getOptionData('snsType')} optionKey="snsType" />
          </Box>
        </CMLineBox>

        <CMLineBox my={2}>
          <Box sx={{ display: 'flex', flex: 1 }}>
            <OptionItemHead text="상태" />
            <CheckboxGroupContent searchOptionStore={listDataStore.searchOptionStore} optionList={optionDataStore.getOptionData('userStatus')} optionKey="userStatus" />
          </Box>

          <Box sx={{ display: 'flex', flex: 1, alignItems: 'center' }}>
            <OptionItemHeadWithoutPadding text="검색" />

            <SearchTextBox placeholder="닉네임" maxWidth="300px" onChange={(e: any) => listDataStore.searchOptionStore.changeOptionValue('keyword', e.target.value)} listDataStore={listDataStore} />
            <Button variant="contained" sx={{ marginLeft: 1 }} onClick={() => contentUtil.handleSearch(listDataStore)}>
              검색
            </Button>
          </Box>
        </CMLineBox>
      </OptionContainer>

      <ListHeader listDataStore={listDataStore} />

      <UserListContent
        store={listDataStore}
        cols={[
          { key: 'rowNumber', name: 'No', width: 30 },
          { key: 'countryCode', name: '국가' },
          // { key: 'countryCode', name: '국가', processData: (item: string) => util.getCountryText(item) },
          { key: 'snsType', name: '소셜', processData: (item: string) => util.getSnsTypeText(item) },
          { key: 'userType', name: '분류', processData: (item: string) => util.getTypeText(item) },
          { key: 'nickName', name: '닉네임', onRowClick: (userId: string) => moveUserInfoPage(userId), rowKey: 'userId' },
          { key: 'artistList', name: '가입아티스트' },
          { key: 'artistCount', name: '가입아티스트 수' },
          { key: 'postCount', name: '게시물' },
          { key: 'replyCount', name: '댓글' },
          { key: 'lastLogin', name: '최종접속' },
          { key: 'status', name: '상태', processData: (item: string) => util.getStatusText(item, 'user') },
          { key: 'created', name: '가입일' }
        ]}
      />
    </CMContentFlexBox>
  );
});

export default UserScreen;
