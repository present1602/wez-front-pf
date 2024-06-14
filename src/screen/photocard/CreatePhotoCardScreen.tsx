import { Box, Divider, MenuItem, Select } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { v4 } from 'uuid';
import { CMBoxFlexEnd, CMBoxStretch, CMContentFlexBox } from '../../component/common/Box';
import { BasicButton, LightButton } from '../../component/common/Button';
import { BasicItemBox } from '../../component/common/ItemBox';
import { ItemHead16 } from '../../component/common/ItemHead';
import PageTitle from '../../component/contentHeader/PageTitle';
import PhotoCardFormStore from '../../store/PhotoCardFormStore';
import { useStore } from '../../store/RootStore';
import PhotoCardBasicInfoContent from './module/BasicInfoContent';

interface ICreatePhotoCardScreenProps {}

const photoCardFormStore = new PhotoCardFormStore();
const CreatePhotoCardScreen: React.FunctionComponent<ICreatePhotoCardScreenProps> = observer((props) => {
  const { optionDataStore } = useStore();
  const [artistOptionList, setArtistOptionList] = React.useState<any>(optionDataStore.getOptionData('artistList'));

  const submitCreate = () => {
    photoCardFormStore.submit();
  };

  React.useEffect(() => {
    if (optionDataStore.getOptionData('artistList').length === 0) {
      const strData: any = localStorage.getItem('artistList');
      setArtistOptionList(JSON.parse(strData));
    }
  }, []);

  return (
    <CMContentFlexBox>
      <PageTitle title="새 포토카드 등록" />
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
            <Select size="small" sx={{ height: '30px' }} value={photoCardFormStore.zoneId ? photoCardFormStore.zoneId : 0} onChange={(e) => photoCardFormStore.setZoneId(e.target.value)}>
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
        <PhotoCardBasicInfoContent photoCardFormStore={photoCardFormStore} />
      </CMBoxStretch>
    </CMContentFlexBox>
  );
});

export default CreatePhotoCardScreen;
