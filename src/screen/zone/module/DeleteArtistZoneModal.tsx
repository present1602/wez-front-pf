import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { ZoneRequestHandler } from '../../../api/content';
import { CMBoxCenter, CMBoxJustifyCenter } from '../../../component/common/Box';
import { AccentButton, LightButton } from '../../../component/common/Button';
import { ModalBackground } from '../../../component/common/Modal';

interface IDeleteArtistZoneModalProps {
  setIsOpenDeleteModal: any;
  setData: any;
  artistZone: any;
}

const DeleteArtistZoneModal: React.FunctionComponent<IDeleteArtistZoneModalProps> = ({ setData, artistZone, setIsOpenDeleteModal }) => {
  const cancleProcess = () => {
    setIsOpenDeleteModal(false);
  };

  const submit = () => {
    const param = {
      zoneId: artistZone.zoneId,
      isActive: false
    };

    ZoneRequestHandler.updateArtistActiveState(param, {
      onSuccess: (data: any) => {
        alert('아티스트존을 비활성화하였습니다.');
        setIsOpenDeleteModal(false);
        setData(data);
      }
    });
  };
  return (
    <ModalBackground>
      <Box width={'460px'} sx={{ backgroundColor: '#fff' }} p={4}>
        <Box py={2} />
        <CMBoxJustifyCenter>
          <Typography variant="h4">{artistZone.title}</Typography>
        </CMBoxJustifyCenter>

        <Box py={2} />

        <CMBoxCenter direction="column">
          <CMBoxJustifyCenter>
            <Typography variant="h5">아티스트존을</Typography>
          </CMBoxJustifyCenter>

          <CMBoxJustifyCenter>
            <Typography variant="h5">비활성화하시겠습니까?</Typography>
          </CMBoxJustifyCenter>
        </CMBoxCenter>

        <Box py={2} />

        <CMBoxCenter direction="column">
          <CMBoxJustifyCenter>
            <Typography>비활성화시 해당 아티스트 존 전체가</Typography>
          </CMBoxJustifyCenter>
          <CMBoxJustifyCenter>
            <Typography>숨김처리됩니다.</Typography>
          </CMBoxJustifyCenter>
        </CMBoxCenter>

        <Box py={2} />

        <CMBoxJustifyCenter>
          <LightButton onClick={() => cancleProcess()} text="취소" />
          <AccentButton onClick={() => submit()} text="비활성화" backgroundColor="#Cf3a03" />
        </CMBoxJustifyCenter>
      </Box>
    </ModalBackground>
  );
};

export default DeleteArtistZoneModal;
