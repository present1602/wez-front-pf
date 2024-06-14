import { Box, Button, Divider } from '@mui/material';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { CMContentFlexBox, CMLineBox, OptionContainer } from '../../component/common/Box';
import ListHeader from '../../component/content/ListHeader';
import PageTitle from '../../component/contentHeader/PageTitle';
import { CheckboxGroupContent } from '../../component/optionBox/CheckboxGroup';
import { OptionItemHead, OptionItemHeadWithoutPadding } from '../../component/optionBox/OptionItemHead';
import OptionSectionSubContainer from '../../component/optionBox/OptionSectionSubContainer';
import SearchTextBox from '../../component/optionBox/SearchTextBox';
import ListDataStore from '../../store/ListDataStore';
import { useStore } from '../../store/RootStore';
import PhotoCardListContent from '../../component/content/ListContent';
import { observer } from 'mobx-react';
import contentUtil from '../../component/content/contentUtil';
import FlexEndMainButton from '../../component/common/FlexEndMainButton';
import util from '../../helper/util';

interface IPhotoCardScreenProps {}

const listDataStore = new ListDataStore('photoCard', true, true);

const PhotoCardScreen: React.FunctionComponent<IPhotoCardScreenProps> = observer((props) => {
  const { optionDataStore } = useStore();
  const location: any = useLocation();

  const [artistList, setArtistList] = React.useState<any>(optionDataStore.getOptionData('artistList'));

  const navigate = useNavigate();

  React.useEffect(() => {
    if (optionDataStore.getOptionData('artistList').length === 0) {
      const strData: any = localStorage.getItem('artistList');
      setArtistList(JSON.parse(strData));
    }

    if (location.state && location.state.zoneId) {
      listDataStore.searchOptionStore.setArtistList([location.state.zoneId]);
      listDataStore.fetchListData();
      navigate(location.pathname, {});
      return;
    }

    // listDataStore.init();
    if (location.state && location.state.init) {
      listDataStore.init();
      navigate(location.pathname, { state: {}, replace: true });
    } else {
      listDataStore.fetchListData();
    }
  }, [location]);

  return (
    <CMContentFlexBox>
      <PageTitle title="컬렉션 - 포토카드" />
      <Divider />

      <OptionContainer py={2}>
        <CMLineBox my={2}>
          <OptionItemHead text="아티스트" />
          {artistList && artistList.length > 0 && <CheckboxGroupContent searchOptionStore={listDataStore.searchOptionStore} optionList={artistList} optionKey="artistList" />}
        </CMLineBox>

        <OptionSectionSubContainer my={1}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <OptionItemHeadWithoutPadding text="검색" width="70px" />
            <SearchTextBox placeholder="내용, 멤버로 검색" onChange={(e: any) => listDataStore.setKeyword(e.target.value)} listDataStore={listDataStore} />
            <Button variant="contained" sx={{ marginLeft: 1 }} onClick={() => contentUtil.handleSearch(listDataStore)}>
              검색
            </Button>
          </Box>
        </OptionSectionSubContainer>
      </OptionContainer>
      {/* No 앨범커버 앨범명 출시일 등록수 상태 등록일 */}
      <FlexEndMainButton text="+ 새 포토카드 등록" onClick={() => navigate('./create')} />

      <ListHeader listDataStore={listDataStore} />

      <PhotoCardListContent
        store={listDataStore}
        cols={[
          { key: 'rowNumber', name: 'No', width: 30 },
          { key: 'artistZone', name: '아티스트', attr: 'title' },
          { key: 'memberName', name: '멤버' },
          { key: 'photoCardImage', name: '썸네일', thumbnail: true, width: 80, rowKey: 'photoCardId', onRowClick: (photoCardId: string) => navigate(`/collection/photocard/${photoCardId}`) },
          { key: 'memo', name: '내용', rowKey: 'photoCardId', onRowClick: (photoCardId: string) => navigate(`/collection/photocard/${photoCardId}`) },
          { key: 'photoCardKeepCount', name: '등록수' },
          { key: 'isActive', name: '상태', processData: (value: any) => util.getPhotoCardStateText(value) },
          { key: 'created', name: '등록일', processData: (item: any) => util.getDate(item) }
        ]}
      />
    </CMContentFlexBox>
  );
});

export default PhotoCardScreen;
