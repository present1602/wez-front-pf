import { Box, Divider, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useParams } from 'react-router';
import { PhotoCardRequestHandler } from '../../api/content';
import { CMBoxFlexEnd, CMBoxStretch, CMContentFlexBox } from '../../component/common/Box';
import { BasicButton, LightButton } from '../../component/common/Button';
import { BasicItemBox } from '../../component/common/ItemBox';
import { ItemHead16 } from '../../component/common/ItemHead';
import PageTitle from '../../component/contentHeader/PageTitle';
import util from '../../helper/util';
import PhotoCardFormStore from '../../store/PhotoCardFormStore';
import PhotoCardBasicInfoContent from './module/BasicInfoContent';

interface IPhotoCardInfoScreenProps {}

const photoCardFormStore = new PhotoCardFormStore();

const PhotoCardInfoScreen: React.FunctionComponent<IPhotoCardInfoScreenProps> = observer((props) => {
  const { photoCardId } = useParams();

  React.useEffect(() => {
    photoCardId &&
      PhotoCardRequestHandler.getPhotoCard(photoCardId, {
        onSuccess: (data: any) => {
          photoCardFormStore.setMultipleItem(data);
        }
      });
  }, []);

  const submitUpdate = () => {
    if (window.confirm('수정하시겠습니까?')) {
      photoCardFormStore.submitUpdate();
    }
  };

  const submitDelete = () => {
    if (window.confirm('포토카드를 삭제하시겠습니까?')) {
      photoCardId && photoCardFormStore.submitDelete(photoCardId);
    }
  };

  return (
    <CMContentFlexBox>
      <PageTitle title="포토카드 조회/수정" />
      <Divider />

      {photoCardFormStore.isActive && (
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
            <Typography>{photoCardFormStore.artistZone.title}</Typography>
          </Box>
        </BasicItemBox>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ flex: 4 }}>
            <PhotoCardBasicInfoContent photoCardFormStore={photoCardFormStore} />
          </Box>

          <Box sx={{ flex: 3 }}>
            <BasicItemBox>
              <ItemHead16 text="등록일" />
              <Box sx={{ flex: 1 }}>
                <Typography>{util.getDate(photoCardFormStore.created)}</Typography>
              </Box>
            </BasicItemBox>
            <BasicItemBox>
              <ItemHead16 text="상태" />
              <Box sx={{ flex: 1 }}>
                <Typography>{util.getDisplayActiveStateText(photoCardFormStore.isActive) || '노출'}</Typography>
              </Box>
            </BasicItemBox>
            <BasicItemBox>
              <ItemHead16 text="획득수" />
              <Box sx={{ flex: 1 }}>
                <Typography>{photoCardFormStore.photoCardKeepCount}</Typography>
              </Box>
            </BasicItemBox>
          </Box>
        </Box>
      </CMBoxStretch>
    </CMContentFlexBox>
  );
});

export default PhotoCardInfoScreen;
