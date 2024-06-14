import { Box, Checkbox, FormControlLabel, FormGroup, styled, TextField, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useParams } from 'react-router';
import { ZoneRequestHandler } from '../../../api/content';
import { EditorRequestHandler } from '../../../api/member';
import { CMBoxStretch } from '../../../component/common/Box';
import { ItemBox } from '../../../component/common/ItemBox';
import { ItemHead16 } from '../../../component/common/ItemHead';
import util from '../../../helper/util';

interface IBasicInfoContentProps {
  artistZoneFormStore: any;
}

const PreviewBox: any = styled('div')((props: any) => ({
  flex: 1,
  height: '200px',
  width: props.width ? props.width : '200px',
  backgroundColor: 'rgb(222,222,222)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  backgroundImage: props.imgsrc && `url(${props.imgsrc})`
}));

const BasicInfoContent: React.FunctionComponent<IBasicInfoContentProps> = observer(({ artistZoneFormStore }) => {
  const { zoneId } = useParams();
  const [editorList, setEditorList] = React.useState([]);
  const [stillImageUrl, setStillImageUrl] = React.useState<any>('');
  // const [shortcutImageUrl, setShortcutImageUrl] = React.useState<any>('');

  const encodeFileToBase64 = (fileBlob: any, imageKey: string) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve: any) => {
      reader.onload = () => {
        if (imageKey === 'still-image') {
          setStillImageUrl(reader.result);
        }

        // else if (imageKey === 'shortcut-image') {
        //   setShortcutImageUrl(reader.result);
        // }
        resolve();
      };
    });
  };

  React.useEffect(() => {
    EditorRequestHandler.getSummaryInfoList({
      onSuccess: (data: any) => setEditorList(data),
      onFail: (data: any) => {
        alert('에디터 리스트를 불러오는데 실패했습니다');
        console.log('error : ', data);
      }
    });

    const formType = artistZoneFormStore.formType;

    if (formType === 'update') {
      ZoneRequestHandler.getZone(zoneId || '', {
        onSuccess: (data: any) => {
          artistZoneFormStore.setMultipleItem(data);
          setStillImageUrl(util.getImageProxyPath(data.stillImage.url, 200));
          // setShortcutImageUrl(`${IMAGE_PROXY_SERVER_URL}/150/${MEDIA_BASE_URL}/${data.shortcutImage.url}`);
        },
        onFail: (data: any) => {
          alert('서버 응답 오류입니다33');
          console.log('error : ', data);
        }
      });

      EditorRequestHandler.getEditorIdList(zoneId, {
        onSuccess: (data: any) => artistZoneFormStore.setEditorList(data),
        onFail: (data: any) => {
          alert('서버 응답 오류입니다');
          console.log('error : ', data);
        }
      });
    }
  }, []);

  return (
    <Box>
      <CMBoxStretch direction="column">
        <ItemBox>
          <ItemHead16 text="아티스트명" fontSize={18} />
          <Box sx={{ flex: 1 }}>
            <TextField size="small" sx={{ borderRadius: 2, flex: 1 }} value={artistZoneFormStore.title} onChange={(e: any) => artistZoneFormStore.setTitle(e.target.value)} />
            <Typography variant="h6" py={1}>
              아티스트 선택하기에 표기되는 이름입니다.
            </Typography>
            {artistZoneFormStore.showTitleInfoMsg && <Typography sx={{ color: 'red', fontSize: 12 }}>*아티스트명을 입력해주세요</Typography>}
          </Box>
        </ItemBox>

        <ItemBox>
          <ItemHead16 text="대표사진" fontSize={18} />

          <Box sx={{ flex: 1 }}>
            <PreviewBox imgsrc={stillImageUrl} />
            <input
              type="file"
              onChange={(e: any) => {
                artistZoneFormStore.setStillImageFile(e.target.files[0]);
                encodeFileToBase64(e.target.files[0], 'still-image');
                // )
              }}
            />
            <Typography variant="h6" py={1}>
              대표사진은 앱 내 아티스트 선택화면에 표시됩니다.
            </Typography>
            {artistZoneFormStore.showImageInfoMsg && <Typography sx={{ color: 'red', fontSize: 12 }}>*대표사진을 추가해주세요</Typography>}
          </Box>
        </ItemBox>

        {/* <ItemBox> 
          <ItemHead16 text="숏컷이미지" fontSize={18} />
          <PreviewBox imgsrc={shortcutImageUrl} />

          <input
            type="file"
            onChange={(e: any) => {
              // Array.from(e.target.files).forEach((file) => {}
              artistZoneFormStore.setShortcutImageFile(e.target.files[0]);
              encodeFileToBase64(e.target.files[0], 'shortcut-image');
              // )
            }}
          />
        </ItemBox> */}

        {/* <ItemBox maxWidth="1000px">
          <Box sx={{ width: '130px' }}>
            <Typography sx={{ fontSize: 16 }}>아티스트존</Typography>
            <Typography sx={{ fontSize: 16 }}>옵션이미지</Typography>
          </Box>
          <Box sx={{ backgroundColor: 'rgb(222,222,222)' }}>
            <img src={shortcutImageUrl} width="300px" />
          </Box>
          <input
            type="file"
            onChange={(e: any) => {
              artistZoneFormStore.setShortcutImageFile(e.target.files[0]);
              encodeFileToBase64(e.target.files[0], 'shortcut-image');
            }}
          />
        </ItemBox> */}

        <ItemBox>
          <ItemHead16 text="오피셜 닉네임" fontSize={18} />
          <Box sx={{ flex: 1 }}>
            <TextField
              size="small"
              sx={{ borderRadius: 2, flex: 1 }}
              value={artistZoneFormStore.zoneOfficialName}
              onChange={(e: any) => artistZoneFormStore.setZoneOfficialName(e.target.value)}
              inputProps={{ maxLength: 30 }}
            />

            <Typography variant="h6" py={1}>
              오피셜은 30자 이내로 설정 가능합니다.
            </Typography>
            <Typography variant="h6">피드-Official에 표시되는 대표 닉네임입니다.</Typography>
            {artistZoneFormStore.showOfficialNickNameInfoMsg && <Typography sx={{ color: 'red', fontSize: 12 }}>*오피셜 닉네임을 입력해주세요</Typography>}
          </Box>
        </ItemBox>

        <ItemBox>
          <ItemHead16 text="담당 에디터" fontSize={18} />
          <Box sx={{ flex: 1, border: '1px solid gray', height: 300, overflowY: 'auto' }} pl={3}>
            <FormGroup>
              {editorList.map((item: any) => {
                return (
                  <FormControlLabel
                    key={item.admin_id}
                    control={<Checkbox checked={artistZoneFormStore.editorList.includes(item.admin_id) ? true : false} />}
                    value={item.admin_id}
                    onClick={() => artistZoneFormStore.changeEditorList(item.admin_id)}
                    label={item.name}
                  />
                );
              })}
            </FormGroup>
          </Box>
        </ItemBox>
      </CMBoxStretch>
    </Box>
  );
});

export default BasicInfoContent;
