import { Box, Button, Divider, Pagination } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router';
import { CMContentFlexBox, CMLineBox, OptionContainer } from '../../component/common/Box';
import PageTitle from '../../component/contentHeader/PageTitle';
import { CheckboxGroupContent } from '../../component/optionBox/CheckboxGroup';
import { OptionItemHead, OptionItemHeadWithoutPadding } from '../../component/optionBox/OptionItemHead';
import OptionSectionSubContainer from '../../component/optionBox/OptionSectionSubContainer';
import SearchTextBox from '../../component/optionBox/SearchTextBox';
import ListDataStore from '../../store/ListDataStore';
import { useStore } from '../../store/RootStore';
import MissionListContent from '../../component/content/ListContent';
import { observer } from 'mobx-react';
import contentUtil from '../../component/content/contentUtil';
import util from '../../helper/util';

interface IMissionScreenProps {}

const listDataStore = new ListDataStore('mission', true, true);

const MissionScreen: React.FunctionComponent<IMissionScreenProps> = observer((props) => {
  const { optionDataStore } = useStore();

  const navigate = useNavigate();

  React.useEffect(() => {
    listDataStore.init();
  }, []);

  return (
    <CMContentFlexBox>
      <PageTitle title="컬렉션 - 포토카드 미션" />
      <Divider />
      <OptionContainer py={2}>
        <OptionSectionSubContainer my={1}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <OptionItemHeadWithoutPadding text="검색" width="70px" />
            <SearchTextBox placeholder="액션으로 검색" onChange={(e: any) => listDataStore.setKeyword(e.target.value)} listDataStore={listDataStore} />
            <Button variant="contained" sx={{ marginLeft: 1 }} onClick={() => contentUtil.handleSearch(listDataStore)}>
              검색
            </Button>
          </Box>
        </OptionSectionSubContainer>

        <CMLineBox my={2}>
          <OptionItemHead text="상태" />
          <CheckboxGroupContent searchOptionStore={listDataStore.searchOptionStore} optionList={optionDataStore.getOptionData('missionState')} optionKey="missionState" />
        </CMLineBox>

        <CMLineBox my={2}>
          <OptionItemHead text="종류" />
          <CheckboxGroupContent searchOptionStore={listDataStore.searchOptionStore} optionList={optionDataStore.getOptionData('missionType')} optionKey="missionType" />
        </CMLineBox>
      </OptionContainer>

      <MissionListContent
        store={listDataStore}
        cols={[
          { key: 'rowNumber', name: 'No', width: 30 },
          { key: 'taskType', name: '종류', processData: (item: any) => util.getMissionTaskTypeText(item) },
          { key: 'missionName', name: '액션', onRowClick: (missionId: string) => navigate(`./${missionId}`), rowKey: 'missionId' },
          // { key: 'task', name: '액션', processData: (item: any) => util.getMissionTaskText(item) },
          { key: 'point', name: '획득률' },
          { key: 'taskCount', name: '누적참여자수' },
          { key: 'isActive', name: '상태', processData: (value: any) => util.getPhotoCardStateText(value) },
          { key: 'created', name: '등록일', processData: (item: any) => util.getDate(item) }
        ]}
      />
    </CMContentFlexBox>
  );
});

export default MissionScreen;
