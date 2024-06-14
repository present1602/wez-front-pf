import { Box, Typography, TextField, Select, MenuItem, FormControl } from '@mui/material';
import * as React from 'react';
import { CMBoxFlexEnd, CMBoxJustifyCenter } from '../../../component/common/Box';
import { ModalBackground } from '../../../component/common/Modal';
import CancelIcon from '@mui/icons-material/CancelOutlined';
import { BasicItemBox, ItemBox } from '../../../component/common/ItemBox';
import { ItemHead16 } from '../../../component/common/ItemHead';
import { AccentButton, LightButton } from '../../../component/common/Button';
import { observer } from 'mobx-react';
import { useStore } from '../../../store/RootStore';
import { v4 } from 'uuid';
import { ChatRequestHandler } from '../../../api/content';
interface ICreateChatModalProps {
  setIsCreateChatModalOpen: any;
  setRoomListData: any;
}

const CreateChatModal: React.FunctionComponent<ICreateChatModalProps> = observer(({ setIsCreateChatModalOpen, setRoomListData }) => {
  const [subject, setSubject] = React.useState('');
  const [zoneId, setZoneId] = React.useState<any>(0);
  const { optionDataStore } = useStore();
  const [artistList, setArtistList] = React.useState(optionDataStore.getOptionData('artistList'));

  const cancleProcess = () => {
    setSubject('');
    setZoneId('');
    setIsCreateChatModalOpen(false);
  };

  const handleArtistZoneChange = (val: any) => {
    setZoneId(val);
  };

  const submit = () => {
    if (window.confirm('채팅방을 생성하시겠습니까?')) {
      if (subject.trim() === '') {
        alert('채팅방 이름을 입력해주세요');
        return;
      }
      const param = {
        subject: subject,
        zoneId: zoneId
      };

      ChatRequestHandler.createOpenChat(param, {
        onSuccess: (data: any) => {
          alert('채팅방을 생성하였습니다.');
          setTimeout(() => {
            setRoomListData(data);
            cancleProcess();
          }, 300);
        },
        onFail: (data: any) => {
          alert('채팅방 생성에 실패했습니다.');
          return;
        }
      });
      // submitUserStatusUpdate(param);
    }
  };

  return (
    <ModalBackground>
      <Box width={'460px'} sx={{ backgroundColor: '#fff' }} p={2}>
        <CMBoxFlexEnd px={1}>
          <CancelIcon onClick={() => cancleProcess()} sx={{ cursor: 'pointer' }} />
        </CMBoxFlexEnd>
        <CMBoxJustifyCenter>
          <Typography variant="h6">새 채팅방 등록</Typography>
        </CMBoxJustifyCenter>

        <Box>
          <BasicItemBox>
            <ItemHead16 text="아티스트" width="100px" />
            <Box sx={{ flex: 1 }}>
              <FormControl>
                <Select size="small" onChange={(e: any) => handleArtistZoneChange(e.target.value)} sx={{ width: '120px' }} value={zoneId}>
                  <MenuItem key={v4()} value={0} defaultChecked={true}>
                    선택
                  </MenuItem>
                  {artistList.map((option: any) => {
                    return (
                      <MenuItem key={v4()} value={option.value}>
                        {option.text}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </BasicItemBox>
          <ItemBox>
            <ItemHead16 text="채팅방 이름" width="100px" />
            <Box sx={{ flex: 1 }} pr={3} pl={1}>
              <TextField sx={{ width: '100%' }} inputProps={{ maxLength: 50 }} variant="standard" value={subject} onChange={(e: any) => setSubject(e.target.value)} />
            </Box>
          </ItemBox>
          <CMBoxFlexEnd>
            <Typography px={3}>{subject.length} / 50</Typography>
          </CMBoxFlexEnd>
        </Box>
        <CMBoxJustifyCenter>
          <LightButton onClick={() => cancleProcess()} text="취소" />
          <AccentButton onClick={() => submit()} text="등록" backgroundColor="highlight.main" />
        </CMBoxJustifyCenter>
      </Box>
    </ModalBackground>
  );
});

export default CreateChatModal;
