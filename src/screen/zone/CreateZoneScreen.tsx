import { Box, Divider, TextField, Typography, FormGroup, Checkbox, FormControlLabel, styled } from '@mui/material';
import * as React from 'react';
import AppHistory from '../../AppHistory';
import { CMBoxFlexEnd, CMContentFlexBox } from '../../component/common/Box';
import { BasicButton, LightButton } from '../../component/common/Button';
import PageTitleWithTail from '../../component/contentHeader/PageTitleWithTail';
import ArtistZoneFormStore from '../../store/ArtistZoneFormStore';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import ZoneBasicInfoContent from './module/BasicInfoContent';

interface ICreateZoneScreenProps {}

const artistZoneFormStore = new ArtistZoneFormStore('create');

const CreateZoneScreen: React.FunctionComponent<ICreateZoneScreenProps> = observer((props) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    artistZoneFormStore.init();
    navigate('/zone');
  };

  return (
    <CMContentFlexBox>
      <PageTitleWithTail title="아티스트존 추가하기" tailText="목록으로 돌아가기" onClick={() => AppHistory.push('/zone')} />
      <Divider />

      <CMContentFlexBox>
        <CMBoxFlexEnd>
          <Box p={2}>
            <LightButton text="취소" onClick={() => handleCancel()} />
            <BasicButton text="저장" onClick={() => artistZoneFormStore.submit('create')} />
          </Box>
        </CMBoxFlexEnd>

        <ZoneBasicInfoContent artistZoneFormStore={artistZoneFormStore} />
      </CMContentFlexBox>
    </CMContentFlexBox>
  );
});

export default CreateZoneScreen;
