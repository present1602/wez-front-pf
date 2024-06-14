import { Box, Button, Divider, MenuItem, Select } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useNavigate } from 'react-router';
import { CMContentFlexBox, CMLineBox, OptionContainer } from '../../../component/common/Box';
import FlexEndMainButton from '../../../component/common/FlexEndMainButton';
import contentUtil from '../../../component/content/contentUtil';
import TermsListContent from '../../../component/content/ListContent';
import PageTitle from '../../../component/contentHeader/PageTitle';
import { CheckboxGroupContent } from '../../../component/optionBox/CheckboxGroup';
import { OptionItemHead, OptionItemHeadWithoutPadding } from '../../../component/optionBox/OptionItemHead';
import OptionSectionSubContainer from '../../../component/optionBox/OptionSectionSubContainer';
import SearchTextBox from '../../../component/optionBox/SearchTextBox';
import util from '../../../helper/util';
import ListDataStore from '../../../store/ListDataStore';
import { useStore } from '../../../store/RootStore';

interface ITermsScreenProps {}

const listDataStore = new ListDataStore('terms', true, false);

const TermsScreen: React.FunctionComponent<ITermsScreenProps> = observer((props) => {
  const { optionDataStore } = useStore();

  const navigate = useNavigate();

  React.useEffect(() => {
    listDataStore.init();
  }, []);

  const moveTermsInfoPage = (termsId: string) => {
    navigate(`./${termsId}`);
  };

  const handleTermsTypeChange = (e: any) => {
    listDataStore.searchOptionStore.setTermsType(e.target.value);
  };

  return (
    <CMContentFlexBox>
      <PageTitle title="이용약관" />
      <Divider />
      <FlexEndMainButton onClick={() => navigate('./create')} text="+ 새 약관 등록" />

      <OptionContainer py={2}>
        <OptionSectionSubContainer my={1}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <OptionItemHeadWithoutPadding text="검색" width="70px" />
            <SearchTextBox placeholder="제목, 내용으로 검색" onChange={(e: any) => listDataStore.setKeyword(e.target.value)} listDataStore={listDataStore} />
            <Button variant="contained" sx={{ marginLeft: 1 }} onClick={() => contentUtil.handleSearch(listDataStore)}>
              검색
            </Button>
          </Box>
        </OptionSectionSubContainer>

        <CMLineBox my={2}>
          <Box sx={{ display: 'flex', flex: 1 }}>
            <OptionItemHead text="언어" />
            <CheckboxGroupContent searchOptionStore={listDataStore.searchOptionStore} optionList={optionDataStore.getOptionData('languageCode')} optionKey="languageCode" />
          </Box>

          <Box sx={{ display: 'flex', flex: 1 }}>
            <OptionItemHead text="구분" />
            <Select value={listDataStore.searchOptionStore.termsType || 0} onChange={handleTermsTypeChange} size="small" sx={{ width: '200px' }}>
              <MenuItem value={0}>선택</MenuItem>
              <MenuItem value={'PRIVACY'}>개인정보</MenuItem>
              <MenuItem value={'SERVICE'}>회원가입 및 이용약관</MenuItem>
            </Select>
          </Box>
        </CMLineBox>
      </OptionContainer>

      <Box py={3} />
      <TermsListContent
        store={listDataStore}
        cols={[
          { key: 'rowNumber', name: 'No', width: 30 },
          { key: 'subject', name: '제목', onRowClick: (termsId: string) => moveTermsInfoPage(termsId), rowKey: 'termsId', width: 120 },
          { key: 'content', name: '내용', onRowClick: (termsId: string) => moveTermsInfoPage(termsId), rowKey: 'temrsId', isHtml: true },
          { key: 'language', name: '언어', attr: 'nameKo', width: 50 },
          { key: 'type', name: '구분', width: 100, processData: (item: any) => util.getTermsTypeText(item) },
          { key: 'updated', name: '최종수정' },
          { key: 'created', name: '등록일' }
        ]}
      />
    </CMContentFlexBox>
  );
});

export default TermsScreen;
