import { Divider } from '@mui/material';
import * as React from 'react';
import PageTitle from '../../component/contentHeader/PageTitle';
import { CMBoxStretch, CMContentFlexBox } from '../../component/common/Box';
import { useStore } from '../../store/RootStore';
import AppHistory from '../../AppHistory';
import FlexEndMainButton from '../../component/common/FlexEndMainButton';
import ListDataStore from '../../store/ListDataStore';
import ZoneListContent from '../../component/content/ListContent';
import util from '../../helper/util';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router';
import CountListHeader from '../../component/content/CountListHeader';

interface IZoneScreenProps {}

const listDataStore = new ListDataStore('zone', false, false);

const ZoneScreen: React.FunctionComponent<IZoneScreenProps> = observer((props) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    listDataStore.init();
  }, []);
  return (
    <CMContentFlexBox>
      <PageTitle title="아티스트존" />
      <Divider />
      <CMBoxStretch direction="column">
        <FlexEndMainButton onClick={() => AppHistory.push('/zone/create')} text="추가" />
        <CountListHeader listDataStore={listDataStore} />

        <ZoneListContent
          store={listDataStore}
          cols={[
            { key: 'rowNumber', name: '번호', width: 30 },
            { key: 'title', name: '아티스트', onRowClick: (zoneId: string) => navigate(`./${zoneId}/basic`), rowKey: 'zoneId' },
            { key: 'stillImage', name: '대표사진', thumbnail: true, width: 100 },
            { key: 'userCount', name: '가입자 수' },
            { key: 'postCount', name: '게시물 수' },
            { key: 'albumCount', name: '앨범 수' },
            { key: 'photoCardCount', name: '포토카드 수' },
            { key: 'isActive', name: '상태', processData: (isActive: boolean) => util.getActivationText(isActive) },
            { key: 'updated', name: '수정일' },
            { key: 'created', name: '생성일' }
          ]}
        />
      </CMBoxStretch>
    </CMContentFlexBox>
  );
});

export default ZoneScreen;
