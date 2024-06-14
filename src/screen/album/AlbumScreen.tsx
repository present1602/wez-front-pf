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
import AlbumListContent from '../../component/content/ListContent';
import { observer } from 'mobx-react';
import contentUtil from '../../component/content/contentUtil';
import FlexEndMainButton from '../../component/common/FlexEndMainButton';
import util from '../../helper/util';

interface IAlbumScreenProps {}

const listDataStore = new ListDataStore('album', true, true);

const AlbumScreen: React.FunctionComponent<IAlbumScreenProps> = observer((props) => {
  const { optionDataStore } = useStore();
  const location: any = useLocation();
  const [artistList, setArtistList] = React.useState<any>(optionDataStore.getOptionData('artistList'));

  const navigate = useNavigate();

  React.useEffect(() => {
    // listDataStore.fetchListData(); // => listDataStore.init()으로 수정 필요?
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
      <PageTitle title="컬렉션 - 앨범" />
      <Divider />

      <OptionContainer py={2}>
        <CMLineBox my={2}>
          <OptionItemHead text="아티스트" />
          {artistList && artistList.length > 0 && <CheckboxGroupContent searchOptionStore={listDataStore.searchOptionStore} optionList={artistList} optionKey="artistList" />}
        </CMLineBox>

        <OptionSectionSubContainer my={1}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <OptionItemHeadWithoutPadding text="검색" width="70px" />
            <SearchTextBox placeholder="앨범명으로 검색" onChange={(e: any) => listDataStore.setKeyword(e.target.value)} listDataStore={listDataStore} />
            <Button variant="contained" sx={{ marginLeft: 1 }} onClick={() => contentUtil.handleSearch(listDataStore)}>
              검색
            </Button>
          </Box>
        </OptionSectionSubContainer>
      </OptionContainer>
      {/* No 앨범커버 앨범명 출시일 등록수 상태 등록일 */}
      <FlexEndMainButton text="+ 새 앨범 등록" onClick={() => navigate('./create')} />

      <ListHeader listDataStore={listDataStore} />

      <AlbumListContent
        store={listDataStore}
        cols={[
          { key: 'rowNumber', name: 'No', width: 30 },
          { key: 'coverImage', name: '썸네일', thumbnail: true, width: 80 },
          { key: 'title', name: '앨범명', rowKey: 'albumId', onRowClick: (albumId: string) => navigate(`/collection/album/${albumId}`) },
          { key: 'releaseDate', name: '출시일', processData: (item: any) => util.getDate(item) },
          { key: 'collectionKeepCount', name: '등록수' },
          { key: 'isActive', name: '상태', processData: (value: any) => util.getAlbumStateText(value) },
          // { key: 'created', name: '등록일' }
          { key: 'created', name: '등록일', processData: (item: any) => util.getDate(item) }
        ]}
      />
    </CMContentFlexBox>
  );
});

export default AlbumScreen;
