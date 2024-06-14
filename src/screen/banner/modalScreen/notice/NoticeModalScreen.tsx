import { Box, Button, Divider } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useNavigate } from 'react-router';
import { ModalBackground } from '../../../../component/common/Modal';
import contentUtil from '../../../../component/content/contentUtil';
import PageTitle from '../../../../component/contentHeader/PageTitle';
import { CheckboxGroupContent } from '../../../../component/optionBox/CheckboxGroup';
import { OptionItemHead, OptionItemHeadWithoutPadding } from '../../../../component/optionBox/OptionItemHead';
import OptionSectionSubContainer from '../../../../component/optionBox/OptionSectionSubContainer';
import SearchTextBox from '../../../../component/optionBox/SearchTextBox';
import ListDataStore from '../../../../store/ListDataStore';
import { useStore } from '../../../../store/RootStore';
import CancelIcon from '@mui/icons-material/CancelOutlined';
import { CMBoxFlexEnd, CMContentFlexBoxWithHeight, CMLineBox, OptionContainer } from '../../../../component/common/Box';
import ModalListDatatContent from '../content/ModalListContent';

interface INoticeModalScreenProps {
  setListModalControl?: any;
  bannerFormStore?: any;
}

const listDataStore = new ListDataStore('notice', true, false);

const NoticeModalScreen: React.FunctionComponent<INoticeModalScreenProps> = observer(({ bannerFormStore, setListModalControl }) => {
  const { optionDataStore } = useStore();

  const navigate = useNavigate();

  React.useEffect(() => {
    listDataStore.init();
  }, []);

  const moveNoticeInfoPage = (noticeId: string) => {
    navigate(`./${noticeId}/info`);
  };

  const closeModal = () => {
    setListModalControl({ contentKey: '', languageCode: '' });
  };

  return (
    <ModalBackground>
      <Box width={'90%'} height="95%" sx={{ backgroundColor: '#fff' }} px={2} pt={1}>
        <CMBoxFlexEnd px={1}>
          <CancelIcon onClick={() => closeModal()} sx={{ cursor: 'pointer' }} />
        </CMBoxFlexEnd>
        <CMContentFlexBoxWithHeight height="90%">
          <PageTitle title="공지사항" />
          <Divider />

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
          <ModalListDatatContent
            store={listDataStore}
            bannerFormStore={bannerFormStore}
            setListModalControl={setListModalControl}
            cols={[
              { key: 'rowNumber', name: 'No', width: 30 },
              { key: 'subject', name: '제목' },
              { key: 'content', name: '내용', isHtml: true },
              { key: 'language', name: '언어', attr: 'nameKo' },
              { key: 'viewsCount', name: '조회수' },
              { key: 'updated', name: '최종수정' },
              { key: 'created', name: '등록일' },
              { key: 'isHide', name: '상태' }
            ]}
          />
        </CMContentFlexBoxWithHeight>
      </Box>
    </ModalBackground>
  );
});

export default NoticeModalScreen;
