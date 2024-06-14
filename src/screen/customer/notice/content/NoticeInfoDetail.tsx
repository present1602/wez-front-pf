import { Box, MenuItem, Select, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NoticeRequestHandler } from '../../../../api/content';
import { CMBoxStretch } from '../../../../component/common/Box';
import { SmallButton } from '../../../../component/common/Button';
import { BasicItemBox } from '../../../../component/common/ItemBox';
import { ItemHead16 } from '../../../../component/common/ItemHead';
import util from '../../../../helper/util';
import { useStore } from '../../../../store/RootStore';

interface INoticeInfoDetailProps {}

const NoticeInfoDetail: React.FunctionComponent<INoticeInfoDetailProps> = observer(() => {
  const { noticeId } = useParams();
  const { optionDataStore } = useStore();
  const [noticeData, setNoticeData] = React.useState<any>({ isHide: false });

  const [noticeStateOptionList, setNoticeStateOptionList] = React.useState<any>([]);

  const handleNoticeStateChange = (e: any) => {
    setNoticeData({ ...noticeData, isHide: e.target.value });
  };

  React.useEffect(() => {
    const data = optionDataStore.getOptionData('noticeState');
    setNoticeStateOptionList(data);

    noticeId &&
      NoticeRequestHandler.getNoticeDetail(noticeId, {
        onSuccess: (data: any) => {
          setNoticeData(data);
        }
      });
  }, []);

  const submitUpdateNoticeState = () => {
    const param = {
      noticeId: noticeId,
      isHide: noticeData.isHide
    };
    NoticeRequestHandler.updateNoticeState(param, { onSuccess: () => alert('공지사항 상태를 수정하였습니다') });
  };

  return (
    <CMBoxStretch direction="column">
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <BasicItemBox>
            <ItemHead16 text="등록일" fontSize={18} />
            <Box sx={{ flex: 1 }}>
              <Typography>{util.getDate(noticeData.created)}</Typography>
            </Box>
          </BasicItemBox>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <BasicItemBox>
            <ItemHead16 text="상태" />
            <Box sx={{ flex: 1 }}>
              <Select value={noticeData.isHide.toString()} onChange={handleNoticeStateChange}>
                <MenuItem value={'false'}>노출</MenuItem>
                <MenuItem value={'true'}>숨김</MenuItem>
              </Select>

              <Box sx={{ display: 'inline' }} px={1} />
              <SmallButton text="적용" onClick={() => submitUpdateNoticeState()} backgroundColor={'neutral.moderate'} />
            </Box>
          </BasicItemBox>
        </Box>
      </Box>
      <BasicItemBox>
        <ItemHead16 text="최근 수정일" fontSize={18} />
        <Box sx={{ flex: 1 }}>
          <Typography>{util.getDate(noticeData.updated)}</Typography>
        </Box>
      </BasicItemBox>
      <BasicItemBox>
        <ItemHead16 text="조회수" fontSize={18} />
        <Box sx={{ flex: 1 }}>
          <Typography>{noticeData.viewsCount || 0}</Typography>
        </Box>
      </BasicItemBox>
    </CMBoxStretch>
  );
});

export default NoticeInfoDetail;
