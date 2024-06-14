import { Box, Divider, TextField, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router';
import { MissionRequestHandler } from '../../api/content';
import { CMBoxFlexEnd, CMBoxStretch, CMContentFlexBox } from '../../component/common/Box';
import { BasicButton, SmallButton } from '../../component/common/Button';
import { BasicItemBox } from '../../component/common/ItemBox';
import { ItemHead20 } from '../../component/common/ItemHead';
import PageTitle from '../../component/contentHeader/PageTitle';
import util from '../../helper/util';

interface IMissionInfoScreenProps {}

const MissionInfoScreen: React.FunctionComponent<IMissionInfoScreenProps> = observer((props) => {
  const { missionId } = useParams();
  const [missionData, setMissionData] = React.useState<any>({});
  const navigate = useNavigate();

  React.useEffect(() => {
    // Mission
    missionId &&
      MissionRequestHandler.getMission(missionId, {
        onSuccess: (data: any) => {
          setMissionData(data);
        }
      });
  }, []);

  const handleRateChange = (e: any) => {
    const newState = { ...missionData, point: e.target.value };
    setMissionData(newState);
  };

  const submitUpdate = () => {
    let numberCheck = /^[0-9.]+$/;
    if (!numberCheck.test(missionData.point)) {
      alert('미션 획득률은 숫자만 입력 가능합니다.');
      return;
    }
    if (missionData.point <= 0 || missionData.point > 100) {
      alert('미션포인트는 0 초과 100 이하로 입력 가능합니다.');
      return;
    }
    const param = {
      missionId: missionId,
      point: missionData.point
    };

    // missionId &&
    MissionRequestHandler.updateMissionPoint(param, {
      onSuccess: (data: any) => {
        alert('미션 획득률을 수정하였습니다.');
        setMissionData(data);
        navigate('/collection/mission');
      }
    });
  };

  return (
    <CMContentFlexBox>
      <PageTitle title={missionData.missionName} />
      <Divider />

      <CMBoxStretch direction="column">
        <Box my={1} />

        <CMBoxFlexEnd>
          <BasicButton text="취소" onClick={() => navigate('/collection/mission')} />
        </CMBoxFlexEnd>

        <BasicItemBox>
          <ItemHead20 text="종류" />
          <Box sx={{ display: 'flex' }}>
            <Typography px={1}>{util.getMissionTaskTypeText(missionData.taskType)}</Typography>
          </Box>
        </BasicItemBox>

        <BasicItemBox>
          <ItemHead20 text="액션" />
          <Box sx={{ display: 'flex' }}>
            <Typography px={1}>{missionData.missionName}</Typography>
          </Box>
        </BasicItemBox>

        <BasicItemBox>
          <ItemHead20 text="획득률" />
          <Box sx={{ display: 'flex' }}>
            <TextField size="small" InputProps={{ inputProps: { min: 1, max: 100 } }} value={missionData.point ? missionData.point : 100} onChange={handleRateChange} />
            <Box sx={{ display: 'inline' }} px={1} />
            <SmallButton text="저장" onClick={() => submitUpdate()} backgroundColor={'neutral.moderate'} />
          </Box>
        </BasicItemBox>

        <BasicItemBox>
          <ItemHead20 text="상태" />
          <Box sx={{ display: 'flex' }}>
            <Typography px={1}>{util.getPhotoCardStateText(missionData.isActive)}</Typography>
          </Box>
        </BasicItemBox>
        <BasicItemBox>
          <ItemHead20 text="등록일" />
          <Box sx={{ display: 'flex' }}>
            <Typography px={1}>{util.getDate(missionData.created)}</Typography>
          </Box>
        </BasicItemBox>
      </CMBoxStretch>
    </CMContentFlexBox>
  );
});

export default MissionInfoScreen;
