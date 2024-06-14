import { Box, Button, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { v4 } from 'uuid';
import { TagRequestHandler } from '../../api/content';
import { CMContentFlexBox, CMLineBox, OptionContainer } from '../../component/common/Box';
import contentUtil from '../../component/content/contentUtil';
import TagListContent from '../../component/content/ListContent';
import ListHeader from '../../component/content/ListHeader';
import PageTitle from '../../component/contentHeader/PageTitle';
import { OptionItemHead, OptionItemHeadWithoutPadding } from '../../component/optionBox/OptionItemHead';
import OptionSectionSubContainer from '../../component/optionBox/OptionSectionSubContainer';
import SearchTextBox from '../../component/optionBox/SearchTextBox';
import util from '../../helper/util';
import ListDataStore from '../../store/ListDataStore';
import { useStore } from '../../store/RootStore';

interface ITagScreenProps {}

const listDataStore = new ListDataStore('tag', true, true);
const TagScreen: React.FunctionComponent<ITagScreenProps> = observer((props) => {
  const { optionDataStore } = useStore();
  const searchTextInput: any = React.useRef(null);
  const [artistOptionList, setArtistOptionList] = React.useState<any>(optionDataStore.getOptionData('artistList'));

  React.useEffect(() => {
    if (optionDataStore.getOptionData('artistList').length === 0) {
      const strData: any = localStorage.getItem('artistList');
      const parseData = JSON.parse(strData);
      setArtistOptionList(parseData);
      listDataStore.setZoneId(parseData[0].value);
      listDataStore.init();
    } else {
      listDataStore.setZoneId(artistOptionList[0].value);
      listDataStore.init();
    }
  }, []);

  const updateTagStatus = (name: string) => {
    const param = {
      zoneId: listDataStore.zoneId,
      name: name
    };
    TagRequestHandler.update(param, {
      onSuccess: () => {
        alert('태그 상태를 변경하였습니다');
        listDataStore.init();
      }
    });
  };

  const handleZoneChange = (e: any) => {
    listDataStore.setZoneId(e.target.value);
    searchTextInput.current.value = '';
    listDataStore.init();
  };

  return (
    <CMContentFlexBox>
      <PageTitle title="인기태그" />
      <Box>
        <Typography>인기태그 10개까지 검색창에 노출됩니다</Typography>
      </Box>
      <OptionContainer py={3}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <OptionItemHead text="아티스트" paddingTop={'0px'} />
          <Box sx={{ flex: 1 }} px={1}>
            <Select size="small" sx={{ width: '180px' }} value={listDataStore.zoneId ? listDataStore.zoneId : ''} onChange={handleZoneChange}>
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
            <OptionItemHeadWithoutPadding text="검색" width="70px" />
            {/* <SearchTextBox placeholder="이름, 아이디로 검색" onChange={(e: any) => listDataStore.searchOptionStore.changeOptionValue('keyword', e.target.value)} listDataStore={listDataStore} /> */}

            <Box sx={{ display: 'flex', alighItem: 'center', flex: 1 }} px={1}>
              <TextField
                size="small"
                placeholder="태그 검색"
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
        <CMLineBox my={2}>
          <OptionItemHead text="상태" />
          <RadioGroup
            row
            value={listDataStore.searchOptionStore.tagStatus}
            onChange={(e) => {
              listDataStore.searchOptionStore.setTagStatus(e.target.value);
            }}
          >
            <FormControlLabel value={'all'} control={<Radio />} label="전체" />
            <FormControlLabel value={'on'} control={<Radio />} label="노출" />
            <FormControlLabel value={'off'} control={<Radio />} label="비노출" />
            <FormControlLabel value={'hide'} control={<Radio />} label="숨김" />
          </RadioGroup>
        </CMLineBox>
      </OptionContainer>

      <ListHeader listDataStore={listDataStore} />

      <TagListContent
        cols={[
          { key: 'rowNumber', name: 'No', width: 30 },
          { key: 'name', name: '태그' },
          { key: 'count', name: '7일간 사용 수' },
          { key: 'status', name: '상태', processData: (data: any) => util.getTagStateText(data) },
          {
            key: 'isActive',
            name: '관리',
            processData: (data: any) => util.getTagControlText(data),
            onRowClick: (name: any) => {
              updateTagStatus(name);
            },
            rowKey: 'name'
          }
        ]}
        store={listDataStore}
      />
    </CMContentFlexBox>
  );
});

export default TagScreen;
