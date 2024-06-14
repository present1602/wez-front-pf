import * as React from 'react';
import { useParams } from 'react-router';
import AppHistory from '../../AppHistory';
import { CMContentFlexBox } from '../../component/common/Box';
import ZoneInfoBasic from './content/ZoneInfoBasic';
import { Routes, Route } from 'react-router-dom';
import ZoneInfoDetail from './content/ZoneInfoDetail';
import PageTitleWithTail from '../../component/contentHeader/PageTitleWithTail';
import ContentTabMenu from '../../component/contentMenu/TabMenu';
import ArtistZoneFormStore from '../../store/ArtistZoneFormStore';
import { observer } from 'mobx-react';
import { ZoneRequestHandler } from '../../api/content';
import ZoneInfoSns from './content/ZoneInfoSns';

interface IZoneInfoScreenProps {}

interface MenuData {
  key: string;
  text: string;
  active: boolean;
}
const menuListData: Array<MenuData> = [
  { key: 'basic', text: '기본정보', active: true },
  { key: 'detail', text: '상세정보', active: false },
  { key: 'sns', text: '공식SNS', active: false }
];

const artistZoneFormStore = new ArtistZoneFormStore('update');

const ZoneInfoScreen: React.FunctionComponent<IZoneInfoScreenProps> = observer((props) => {
  const { zoneId } = useParams();
  const [artistZone, setArtistZone] = React.useState<any>({});

  React.useEffect(() => {
    zoneId &&
      ZoneRequestHandler.getZone(zoneId, {
        onSuccess: (data: any) => {
          setArtistZone({ zoneId: data.zoneId, title: data.title });
        }
      });
  }, []);

  return (
    <CMContentFlexBox>
      <PageTitleWithTail title={artistZone.title} tailText="목록으로 돌아가기" onClick={() => AppHistory.push('/zone')} />

      <ContentTabMenu menuListData={menuListData} />
      <Routes>
        <Route path="basic" element={<ZoneInfoBasic artistZoneFormStore={artistZoneFormStore} />} />
        <Route path="detail" element={<ZoneInfoDetail artistZone={artistZone} />} />
        <Route path="sns" element={<ZoneInfoSns artistZone={artistZone} />} />
      </Routes>
    </CMContentFlexBox>
  );
});

export default ZoneInfoScreen;
