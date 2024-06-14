import { Box, Button, Divider, MenuItem, Select, TextField } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { v4 } from 'uuid';
import { ForbiddenWordRequestHandler } from '../../api/content';
import { CMBoxAlignCenter, CMContentFlexBox, CMLineBox, OptionContainer } from '../../component/common/Box';
import FlexEndMainButton from '../../component/common/FlexEndMainButton';
import { BasicItemBox } from '../../component/common/ItemBox';
import { ItemHead16 } from '../../component/common/ItemHead';
import contentUtil from '../../component/content/contentUtil';
import ForbiddenWordListContent from '../../component/content/ListContent';
import ListHeader from '../../component/content/ListHeader';
import PageTitle from '../../component/contentHeader/PageTitle';
import { OptionItemHead, OptionItemHeadWithoutPadding } from '../../component/optionBox/OptionItemHead';
import OptionSectionSubContainer from '../../component/optionBox/OptionSectionSubContainer';
import SearchTextBox from '../../component/optionBox/SearchTextBox';
import { execFileValidate } from '../../helper/Validator';
import ListDataStore from '../../store/ListDataStore';
import { useStore } from '../../store/RootStore';

interface IForbiddenWordScreenProps {}

const listDataStore = new ListDataStore('forbidden-word', true, true);

const ForbiddenWordScreen: React.FunctionComponent<IForbiddenWordScreenProps> = observer((props) => {
  const { optionDataStore } = useStore();
  const fileButton: any = React.useRef(null);
  const searchTextInput: any = React.useRef(null);
  const [artistOptionList, setArtistOptionList] = React.useState<any>(optionDataStore.getOptionData('artistList'));

  React.useEffect(() => {
    if (optionDataStore.getOptionData('artistList').length === 0) {
      const strData: any = localStorage.getItem('artistList');
      setArtistOptionList(JSON.parse(strData));
    }

    listDataStore.init();
  }, []);

  const handleFileChange = (e: any) => {
    const fileBlob = e.target.files[0];

    const filename = fileBlob.name;

    const ext = filename.split('.')[filename.split('.').length - 1];

    const validationResult: any = execFileValidate('EXCEL', ext);

    if (validationResult.result === 'success') {
      if (window.confirm('금지어를 새로 등록하시겠습니까?')) {
        ForbiddenWordRequestHandler.upload(fileBlob, listDataStore.zoneId, {
          onSuccess: () => {
            alert('금지어를 등록하였습니다.');
            setTimeout(() => {
              searchTextInput.current.value = '';
              listDataStore.init();
            }, 300);
          }
        });
      }
    } else {
      alert('엑셀 파일(.xlsx, .xls)만 업로드 가능합니다.');
    }
  };

  const handleZoneChange = (e: any) => {
    listDataStore.setZoneId(e.target.value);
    searchTextInput.current.value = '';
    listDataStore.init();
  };

  return (
    <CMContentFlexBox>
      <PageTitle title="금지어" />
      <Divider />
      <OptionContainer py={3}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <OptionItemHead text="아티스트" paddingTop={'0px'} />
          <Box sx={{ flex: 1 }} px={1}>
            <Select size="small" sx={{ width: '180px' }} value={listDataStore.zoneId ? listDataStore.zoneId : 'all'} onChange={handleZoneChange}>
              <MenuItem value={'all'}>공통</MenuItem>
              {artistOptionList.map((option: any) => {
                return (
                  <MenuItem value={option.value} key={v4()}>
                    {option.text}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
        </Box>

        <Box py={2} />

        <OptionSectionSubContainer>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <OptionItemHeadWithoutPadding text="검색" />
            {/* <SearchTextBox placeholder="이름, 아이디로 검색" 
            onChange={(e: any) => listDataStore.searchOptionStore.changeOptionValue('keyword', e.target.value)} listDataStore={listDataStore} /> */}
            <Box sx={{ display: 'flex', alighItem: 'center', flex: 1 }} px={1}>
              <TextField
                size="small"
                placeholder="금지어 검색"
                inputRef={searchTextInput}
                onChange={(e: any) => listDataStore.searchOptionStore.changeOptionValue('keyword', e.target.value)}
                sx={{ borderRadius: 2, flex: 1 }}
              />
            </Box>

            <Button variant="contained" sx={{ marginLeft: 1 }} onClick={() => contentUtil.handleSearch(listDataStore)}>
              검색
            </Button>
          </Box>
        </OptionSectionSubContainer>
      </OptionContainer>

      <FlexEndMainButton onClick={() => fileButton.current.click()} text="금지어 파일 업로드(엑셀)" />

      <input type="file" style={{ visibility: 'hidden' }} ref={fileButton} onChange={handleFileChange} />

      <ListHeader listDataStore={listDataStore} />

      <ForbiddenWordListContent
        store={listDataStore}
        cols={[
          { key: 'rowNumber', name: '번호', width: 30 },
          { key: 'word', name: '금지어' },
          { key: 'created', name: '생성일시' }
        ]}
      />
    </CMContentFlexBox>
  );
});

export default ForbiddenWordScreen;
