import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router';
import { ZoneRequestHandler } from '../../../api/content';
import { CMBoxStretch } from '../../../component/common/Box';
import { AccentButton, LightButton } from '../../../component/common/Button';
import { BasicItemBox } from '../../../component/common/ItemBox';
import { ItemHead20 } from '../../../component/common/ItemHead';
import DeleteArtistZoneModal from '../module/DeleteArtistZoneModal';

interface IZoneInfoDetailProps {
  artistZone: any;
}

const initData: any = {
  userCount: 0,
  postCount: 0,
  albumCount: 0,
  photoCardCount: 0
};
const ZoneInfoDetail: React.FunctionComponent<IZoneInfoDetailProps> = ({ artistZone }) => {
  const { zoneId } = useParams<string>();
  const navigate = useNavigate();
  const [data, setData] = React.useState<any>(initData);

  const [isOpenDeleteModal, setIsOpenDeleteModal] = React.useState(false);

  React.useEffect(() => {
    if (typeof zoneId === 'string' && zoneId.length > 0) {
      ZoneRequestHandler.getDetailInfo(zoneId, {
        onSuccess: (data: any) => {
          setData(data);
        }
      });
    }
  }, []);

  const changeArtistZoneStateActive = () => {
    if (zoneId) {
      const param = {
        zoneId: zoneId,
        isActive: true
      };
      let msg = '아티스트존을 활성화시키시겠습니까?';

      if (window.confirm(msg)) {
        ZoneRequestHandler.updateArtistActiveState(param, {
          onSuccess: (data: any) => {
            setData(data);
          }
        });
      }
    }
  };

  const openArtistZoneDeleteModal = () => {
    setIsOpenDeleteModal(true);
  };

  const moveContentPage = (contentKey: string) => {
    if (!data.isActive) {
      alert('아티스트존이 비활성상태입니다.');
      return;
    }
    if (contentKey === 'post') {
      navigate('/content/post', { state: { zoneId: zoneId } });
    } else if (contentKey === 'album') {
      navigate('/collection/album', { state: { zoneId: zoneId } });
    } else if (contentKey === 'photocard') {
      navigate('/collection/photocard', { state: { zoneId: zoneId } });
    }
  };

  return (
    <>
      {isOpenDeleteModal && <DeleteArtistZoneModal artistZone={artistZone} setData={setData} setIsOpenDeleteModal={setIsOpenDeleteModal} />}
      <CMBoxStretch direction="column">
        <Box my={4} />
        <BasicItemBox>
          <ItemHead20 text="가입자 수" />
          <Box sx={{ display: 'flex' }}>
            <Typography>{data.userCount}</Typography>
          </Box>
        </BasicItemBox>
        <BasicItemBox>
          <ItemHead20 text="게시물 수" />
          <Box sx={{ display: 'flex' }}>
            <Typography>{data.postCount}</Typography>
            {data.postCount ? (
              <Typography color="#0000FF" sx={{ margin: '2px 24px', cursor: 'pointer', fontSize: 18 }} onClick={() => moveContentPage('post')}>
                게시물 보기
              </Typography>
            ) : null}
          </Box>
        </BasicItemBox>
        <BasicItemBox>
          <ItemHead20 text="앨범 수" />
          <Box sx={{ display: 'flex' }}>
            <Typography>{data.albumCount}</Typography>
          </Box>
          {data.albumCount ? (
            <Typography color="#0000FF" sx={{ margin: '2px 24px', cursor: 'pointer', fontSize: 18 }} onClick={() => moveContentPage('album')}>
              앨범리스트
            </Typography>
          ) : null}
        </BasicItemBox>

        <BasicItemBox>
          <ItemHead20 text="포토카드 수" />
          <Box sx={{ display: 'flex' }}>
            <Typography>{data.photoCardCount}</Typography>
            {data.photoCardCount ? (
              <Typography color="#0000FF" sx={{ margin: '2px 24px', cursor: 'pointer', fontSize: 18 }} onClick={() => moveContentPage('photocard')}>
                포토카드 리스트
              </Typography>
            ) : null}
          </Box>
        </BasicItemBox>
        <BasicItemBox>
          <ItemHead20 text="설정" />
          {data.isActive ? (
            <AccentButton text="아티스트 비활성화" backgroundColor="#Cf3a03" onClick={() => openArtistZoneDeleteModal()} />
          ) : (
            <LightButton text="아티스트 활성화" onClick={() => changeArtistZoneStateActive()} />
          )}
        </BasicItemBox>
      </CMBoxStretch>
    </>
  );
};

export default ZoneInfoDetail;
