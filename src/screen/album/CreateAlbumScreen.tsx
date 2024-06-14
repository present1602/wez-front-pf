import { Box, Divider, MenuItem, Select } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { v4 } from 'uuid';
import { CMBoxFlexEnd, CMBoxStretch, CMContentFlexBox } from '../../component/common/Box';
import { BasicButton, LightButton } from '../../component/common/Button';
import { BasicItemBox } from '../../component/common/ItemBox';
import { ItemHead16 } from '../../component/common/ItemHead';
import PageTitle from '../../component/contentHeader/PageTitle';
import AlbumFormStore from '../../store/AlbumFormStore';
import { useStore } from '../../store/RootStore';
import AlbumBasicInfoContent from './module/BasicInfoContent';

interface ICreateAlbumScreenProps {}

const albumFormStore = new AlbumFormStore();
const CreateAlbumScreen: React.FunctionComponent<ICreateAlbumScreenProps> = observer((props) => {
  const { optionDataStore } = useStore();
  const [artistOptionList, setArtistOptionList] = React.useState<any>([]);

  const submitCreate = () => {
    albumFormStore.submit();
  };

  React.useEffect(() => {
    const data = optionDataStore.getOptionData('artistList');
    setArtistOptionList(data);

    albumFormStore.init();
  }, []);

  return (
    <CMContentFlexBox>
      <PageTitle title="새 앨범 등록" />
      <Divider />
      <CMBoxFlexEnd>
        <Box p={2}>
          <LightButton text="취소" onClick={() => {}} />
          <BasicButton text="저장하기" onClick={() => submitCreate()} />
        </Box>
      </CMBoxFlexEnd>

      <CMBoxStretch direction="column">
        <BasicItemBox>
          <ItemHead16 text="아티스트" />
          <Box sx={{ flex: 1 }}>
            <Select size="small" sx={{ height: '30px' }} value={albumFormStore.zoneId ? albumFormStore.zoneId : 0} onChange={(e) => albumFormStore.setZoneId(e.target.value)}>
              <MenuItem value={0}>선택</MenuItem>
              {artistOptionList.map((option: any) => {
                return (
                  <MenuItem value={option.value} key={v4()}>
                    {option.text}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
        </BasicItemBox>
        <AlbumBasicInfoContent albumFormStore={albumFormStore} />
      </CMBoxStretch>
    </CMContentFlexBox>
  );
});

export default CreateAlbumScreen;
