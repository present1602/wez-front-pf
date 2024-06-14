import { Box, Button, Divider } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useNavigate } from 'react-router';
import { CMContentFlexBox, CMLineBox, OptionContainer } from '../../../component/common/Box';
import FlexEndMainButton from '../../../component/common/FlexEndMainButton';
import contentUtil from '../../../component/content/contentUtil';
import NoticeListContent from '../../../component/content/ListContent';
import PageTitle from '../../../component/contentHeader/PageTitle';
import { CheckboxGroupContent } from '../../../component/optionBox/CheckboxGroup';
import { OptionItemHead, OptionItemHeadWithoutPadding } from '../../../component/optionBox/OptionItemHead';
import OptionSectionSubContainer from '../../../component/optionBox/OptionSectionSubContainer';
import SearchTextBox from '../../../component/optionBox/SearchTextBox';
import util from '../../../helper/util';
import ListDataStore from '../../../store/ListDataStore';
import { useStore } from '../../../store/RootStore';

interface INoticeScreenProps {}

const listDataStore = new ListDataStore('notice', true, false);

const NoticeScreen: React.FunctionComponent<INoticeScreenProps> = observer((props) => {
  const { optionDataStore } = useStore();

  const navigate = useNavigate();

  React.useEffect(() => {
    listDataStore.init();
  }, []);

  const moveNoticeInfoPage = (noticeId: string) => {
    navigate(`./${noticeId}/info`);
  };

  return (
    <CMContentFlexBox>
      <PageTitle title="공지사항" />
      <Divider />
      <FlexEndMainButton onClick={() => navigate('./create')} text="+ 새 공지 등록" />

      <OptionContainer py={2}>
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
          <Box sx={{ display: 'flex', flex: 1 }}>
            <OptionItemHead text="상태" />
            <CheckboxGroupContent searchOptionStore={listDataStore.searchOptionStore} optionList={optionDataStore.getOptionData('noticeState')} optionKey="noticeState" />
          </Box>

          <Box sx={{ display: 'flex', flex: 1 }}>
            <OptionItemHead text="언어" />
            <CheckboxGroupContent searchOptionStore={listDataStore.searchOptionStore} optionList={optionDataStore.getOptionData('languageCode')} optionKey="languageCode" />
          </Box>
        </CMLineBox>
      </OptionContainer>

      <Box py={3} />
      <NoticeListContent
        store={listDataStore}
        cols={[
          { key: 'rowNumber', name: 'No', width: 30 },
          { key: 'subject', name: '제목', onRowClick: (noticeId: string) => moveNoticeInfoPage(noticeId), rowKey: 'noticeId' },
          { key: 'content', name: '내용', onRowClick: (noticeId: string) => moveNoticeInfoPage(noticeId), rowKey: 'noticeId', isHtml: true },
          { key: 'language', name: '언어', attr: 'nameKo' },
          { key: 'viewsCount', name: '조회수' },
          { key: 'updated', name: '최종수정' },
          { key: 'created', name: '등록일' },
          { key: 'isHide', name: '상태', processData: (item: any) => util.getDisplayStateReverseText(item) },
          { key: 'type', name: '구분', processData: (item: any) => util.getNoticeTypeText(item) }
        ]}
      />
      <Box py={3} />
    </CMContentFlexBox>
  );
});

export default NoticeScreen;
