import { Box, Divider, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useParams } from 'react-router';
import { AlbumRequestHandler } from '../../api/content';
import { CMBoxFlexEnd, CMBoxStretch, CMContentFlexBox } from '../../component/common/Box';
import { BasicButton, LightButton } from '../../component/common/Button';
import { BasicItemBox } from '../../component/common/ItemBox';
import { ItemHead16 } from '../../component/common/ItemHead';
import PageTitle from '../../component/contentHeader/PageTitle';
import util from '../../helper/util';
import AlbumFormStore from '../../store/AlbumFormStore';
import AlbumBasicInfoContent from './module/BasicInfoContent';

interface IAlbumInfoScreenProps {}

const albumFormStore = new AlbumFormStore();

const AlbumInfoScreen: React.FunctionComponent<IAlbumInfoScreenProps> = observer((props) => {
  const { albumId } = useParams();

  React.useEffect(() => {
    albumId &&
      AlbumRequestHandler.getAlbum(albumId, {
        onSuccess: (data: any) => {
          albumFormStore.setMultipleItem(data);
        }
      });

    // albumFormStore.setMultipleItem()
  }, []);

  const submitUpdate = () => {
    if (window.confirm('수정하시겠습니까?')) {
      albumFormStore.submitUpdate();
    }
  };

  const submitDelete = () => {
    if (window.confirm('앨범을 삭제하시겠습니까?')) {
      albumId && albumFormStore.submitDelete(albumId);
    }
  };

  return (
    <CMContentFlexBox>
      <PageTitle title="앨범 조회" />
      <Divider />

      {albumFormStore.isActive && (
        <CMBoxFlexEnd>
          <Box p={2}>
            <LightButton text="저장하기" onClick={() => submitUpdate()} />
            <BasicButton text="삭제하기" onClick={() => submitDelete()} />
          </Box>
        </CMBoxFlexEnd>
      )}
      <CMBoxStretch direction="column">
        <BasicItemBox>
          <ItemHead16 text="아티스트" />
          <Box sx={{ flex: 1 }}>
            <Typography>{albumFormStore.artistZone.title}</Typography>
          </Box>
        </BasicItemBox>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ flex: 4 }}>
            <AlbumBasicInfoContent albumFormStore={albumFormStore} />
          </Box>
          <Box sx={{ flex: 3 }}>
            <BasicItemBox>
              <ItemHead16 text="등록일" />
              <Box sx={{ flex: 1 }}>
                <Typography>{util.getDate(albumFormStore.created)}</Typography>
              </Box>
            </BasicItemBox>
            <BasicItemBox>
              <ItemHead16 text="상태" />
              <Box sx={{ flex: 1 }}>
                <Typography>{util.getDisplayActiveStateText(albumFormStore.isActive)}</Typography>
              </Box>
            </BasicItemBox>
            <BasicItemBox>
              <ItemHead16 text="등록수" />
              <Box sx={{ flex: 1 }}>
                <Typography>{albumFormStore.albumKeepCount}</Typography>
              </Box>
            </BasicItemBox>
          </Box>
        </Box>
      </CMBoxStretch>
    </CMContentFlexBox>
  );
});

export default AlbumInfoScreen;
