import { Box, Divider, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { BannerRequestHandler } from '../../api/content';
import { CMBoxFlexEnd, CMContentFlexBox, CMLineBox } from '../../component/common/Box';
import { BasicButton } from '../../component/common/Button';
import ReorderableListContent from '../../component/content/ReorderableListContent';
import PageTitle from '../../component/contentHeader/PageTitle';
import util from '../../helper/util';
import SimpleListDataStore from '../../store/SimpleListDataStore';

interface IArtistBannserEditOrderScreenProps {}

const listDataStore = new SimpleListDataStore('editBanner', false);

const ArtistBannserEditOrderScreen: React.FunctionComponent<IArtistBannserEditOrderScreenProps> = observer((props) => {
  const [listData, setListData] = React.useState<any>([]);
  const [listDataUnchanged, setListDataUnchanged] = React.useState<any>([]);
  const { zoneId } = useParams();
  const [languageCode, setLanguageCode] = React.useState('ko');
  const location = useLocation();
  const [artistZone, setArtistZone] = React.useState({ title: '', zoneId: '' });

  React.useEffect(() => {
    const state: any = location.state;
    state.artistZone && setArtistZone(state.artistZone);
    zoneId && listDataStore.setZoneId(zoneId);
    zoneId &&
      BannerRequestHandler.getArtistActiveBannerList(
        { zoneId: zoneId, languageCode: languageCode },
        {
          onSuccess: (responseData: any) => {
            setListData(responseData);
            setListDataUnchanged(responseData);
          },
          onFail: () => alert('fail')
        }
      );
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
      <div className="htmlSummaryElement">
        <Typography>{getBannerActionTypeText(data)}</Typography>
        {data.type !== 'NM' && <Typography>{getActionContentBody(data)}</Typography>}
      </div>
    );
  };

  const getBannserStateText = (data: any) => {
    switch (data) {
      case 'display':
        return '노출';
      case 'hide':
        return '숨김';
      case 'expired':
        return '종료';
      default:
        return '';
    }
  };

  const handleLanguageÇhange = (e: any) => {
    setLanguageCode(e.target.value);
  };

  React.useEffect(() => {
    BannerRequestHandler.getArtistActiveBannerList({ zoneId: zoneId, languageCode: languageCode }, { onSuccess: (responseData: any) => setListData(responseData), onFail: () => alert('fail') });
  }, [languageCode]);

  const cancleOrdering = () => {
    setListData(listDataUnchanged);
  };

  const handleSave = () => {
    const param: any = listData.map((item: any) => {
      return {
        bannerId: item.bannerId,
        ord: item.ord
      };
    });
    BannerRequestHandler.reorder({ newOrderList: param }, { onSuccess: (data: any) => alert('순서를 변경하였습니다') });
  };

  return (
    <CMContentFlexBox>
      <PageTitle title={`배너 순서편집 / ${artistZone.title}`} />
      <Divider />
      <CMBoxFlexEnd>
        <Box p={2}>
          {/* <LightButton text="취소" onClick={() => cancleOrdering()} /> */}
          <BasicButton text="저장하기" onClick={() => handleSave()} />
        </Box>
      </CMBoxFlexEnd>
      <CMLineBox my={2}>
        <RadioGroup row onChange={(e: any) => handleLanguageÇhange(e)} value={languageCode}>
          <FormControlLabel value="ko" control={<Radio />} label="한국어" />
          <FormControlLabel value="en" control={<Radio />} label="영어" />
        </RadioGroup>
      </CMLineBox>
      <ReorderableListContent
        cols={[
          { key: 'rowNumber', name: 'No', width: 30 },
          { key: 'bannerImage', name: '썸네일', thumbnail: true, width: 80 },
          { key: 'language', name: '언어', attr: 'nameKo' },
          { key: 'title', name: '내용' },
          { key: 'action', name: '랜딩', convertToHtml: (row: any) => processLanding(row.action) },
          { key: 'state', name: '상태', processData: (item: any) => getBannserStateText(item) },
          { key: 'displayPeriod', name: '노출기간' },
          { key: 'created', name: '생성일자', processData: (item: any) => util.getDate(item) }
        ]}
        listData={listData}
        setListData={setListData}
      />
    </CMContentFlexBox>
  );
});

export default ArtistBannserEditOrderScreen;
