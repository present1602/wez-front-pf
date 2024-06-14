import { Box, Button, Divider, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { CMContentFlexBox, CMLineBox, OptionContainer } from '../../component/common/Box';
import { HighlightButton } from '../../component/common/Button';
import contentUtil from '../../component/content/contentUtil';
import BannerListContent from '../../component/content/ListContent';
import ListHeader from '../../component/content/ListHeader';
import PageTitle from '../../component/contentHeader/PageTitle';
import { CheckboxGroupContent } from '../../component/optionBox/CheckboxGroup';
import { OptionItemHead } from '../../component/optionBox/OptionItemHead';
import util from '../../helper/util';
import ListDataStore from '../../store/ListDataStore';
import { useStore } from '../../store/RootStore';

interface IArtistBannserScreenProps {}

const listDataStore = new ListDataStore('artistBanner', true, true);

const ArtistBannserScreen: React.FunctionComponent<IArtistBannserScreenProps> = observer((props) => {
  const { optionDataStore } = useStore();
  const { zoneId } = useParams();
  const location: any = useLocation();
  const navigate = useNavigate();
  const [artistZone, setArtistZone] = React.useState({ title: '', zoneId: '' });

  React.useEffect(() => {
    const state: any = location.state;
    state.artistZone && setArtistZone(state.artistZone);
    zoneId && listDataStore.setZoneId(zoneId);

    // listDataStore.init();
    if (location.state && location.state.init) {
      listDataStore.init();
      navigate(location.pathname, { state: {}, replace: true });
    } else {
      listDataStore.fetchListData();
    }
  }, []);

  const getBannerActionTypeText = (data: any) => {
    if (data.type === 'OL') {
      return '아웃링크';
    } else if (data.type === 'MV') {
      if (data.contentType === 'PD') {
        return '포스트';
      } else if (data.contentType === 'ND') {
        return '공지';
      }
    } else if (data.type === 'NM') {
      return 'No action';
    }
  };

  const getActionContentBody = (data: any) => {
    if (data.type === 'OL') {
      return data.contentPath;
    } else if (data.type === 'MV') {
      return data.contentText;
    }
  };

  const processLanding = (data: any) => {
    return (
      <>
        <Typography>{getBannerActionTypeText(data)}</Typography>
        {data.type !== 'NM' && <Typography>{getActionContentBody(data)}</Typography>}
      </>
    );
  };

  const getBannserStateText = (data: any) => {
    switch (data) {
      case 'display':
        return '노출';
      case 'hidden':
        return '숨김';
      case 'expired':
        return '종료';
      default:
        return '';
    }
  };

  const moveBannerInfoPage = (bannerGroupId: string) => {
    navigate(`/content/banner/${bannerGroupId}`);
  };

  return (
    <CMContentFlexBox>
      <PageTitle title={`배너 / ${artistZone.title}`} />
      <Divider />
      <OptionContainer>
        <CMLineBox my={2}>
          <Box sx={{ display: 'flex', flex: 1 }}>
            <OptionItemHead text="분류" />
            <CheckboxGroupContent searchOptionStore={listDataStore.searchOptionStore} optionList={optionDataStore.getOptionData('languageCode')} optionKey="languageCode" />
          </Box>

          <Box sx={{ display: 'flex', flex: 1 }}>
            <OptionItemHead text="상태" />
            <CheckboxGroupContent searchOptionStore={listDataStore.searchOptionStore} optionList={optionDataStore.getOptionData('bannerState')} optionKey="bannerState" />
          </Box>

          <Button variant="contained" sx={{ marginLeft: 1 }} onClick={() => contentUtil.handleSearch(listDataStore)}>
            검색
          </Button>
        </CMLineBox>
      </OptionContainer>
      <Box sx={{ display: 'flex' }} py={2}>
        <HighlightButton text="순서편집" onClick={() => navigate('./edit-order', { state: { artistZone: artistZone } })} />
        <Box sx={{ flex: 1 }} />
        <HighlightButton text="추가하기" onClick={() => navigate('/content/banner/create')} />
      </Box>
      <ListHeader listDataStore={listDataStore} />

      <BannerListContent
        cols={[
          { key: 'rowNumber', name: 'No', width: 30 },
          { key: 'bannerImage', name: '썸네일', thumbnail: true, width: 80 },
          { key: 'language', name: '언어', attr: 'nameKo' },
          {
            key: 'title',
            name: '내용',
            onRowClick: (bannerGroupId: string) => moveBannerInfoPage(bannerGroupId),
            rowKey: 'bannerGroupId'
          },
          { key: 'action', name: '랜딩', convertToHtml: (row: any) => processLanding(row.action) },
          { key: 'state', name: '상태', processData: (item: any) => getBannserStateText(item) },
          { key: 'displayPeriod', name: '노출기간' },
          { key: 'created', name: '생성일자', processData: (item: any) => util.getDate(item) }
        ]}
        store={listDataStore}
      />
    </CMContentFlexBox>
  );
});

export default ArtistBannserScreen;
