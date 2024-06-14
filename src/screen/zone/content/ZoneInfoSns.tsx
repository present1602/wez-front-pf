import { Box, TextField, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router';
import { v4 } from 'uuid';
import { ZoneRequestHandler } from '../../../api/content';
import { CMBoxCenter, CMBoxStretch } from '../../../component/common/Box';
import { AccentButton, LightButton } from '../../../component/common/Button';
import FlexEndMainButton from '../../../component/common/FlexEndMainButton';
import { BasicItemBox } from '../../../component/common/ItemBox';
import { ItemHead16, ItemHead20 } from '../../../component/common/ItemHead';
import util from '../../../helper/util';

interface IZoneInfoSnsProps {
  artistZone: any;
}

const initialSnsList = [
  {
    type: 'Y',
    url: ''
  },
  {
    type: 'F',
    url: ''
  },
  {
    type: 'T',
    url: ''
  },
  {
    type: 'I',
    url: ''
  },
  {
    type: 'W',
    url: ''
  },
  {
    type: 'V',
    url: ''
  }
];

const ZoneInfoSns: React.FunctionComponent<IZoneInfoSnsProps> = observer(({ artistZone }) => {
  const { zoneId } = useParams<string>();
  const [snsDataList, setSnsDataList] = React.useState<any>([]);
  const navigate = useNavigate();

  React.useEffect(() => {}, []);

  const openWebLink = (url: string) => {
    if (url.trim() === '') {
      alert('url을 입력해주세요');
      return;
    }
    window.open(url, '팝업 테스트', 'width=400, height=300, top=10, left=10');
  };

  const handleInputChange = (value: string, snsType: string) => {
    const targetIndex = snsDataList.findIndex((item: any) => item.type === snsType);
    const updatedList = [...snsDataList.slice(0, targetIndex), { type: snsType, url: value }, ...snsDataList.slice(targetIndex + 1)];

    // updatedList.splice(targetIndex, 1, { type: snsType, url: value });
    // setSnsDataList(updatedList);
    // const updatedList = snsDataList;
    // updatedList.map((element: any, index: number) => {
    //   if (element.type == snsType) {
    //     element.url = value;
    //     return element;
    //   } else {
    //     return element;
    //   }
    // });

    setSnsDataList(updatedList);
  };

  // React.useEffect(() => {
  //   setSnsDataList(initialSnsList);
  // }, []);

  const submitSave = () => {
    const param = {
      zoneId: zoneId,
      snsList: snsDataList
    };
    ZoneRequestHandler.saveZoneSns(param, {
      onSuccess: (data: any) => {
        alert('SNS 계정정보를 저장했습니다.');
        setSnsDataList(data);
      }
    });
  };

  React.useEffect(() => {
    if (zoneId) {
      ZoneRequestHandler.getZoneSnsList(zoneId, {
        onSuccess: (data: any) => {
          if (data && data.length > 0) {
            setSnsDataList(data);
          } else {
            setSnsDataList(initialSnsList);
          }
        }
      });
    }
  }, []);

  return (
    <>
      <CMBoxStretch direction="column">
        <Box my={1} />
        <FlexEndMainButton text="저장하기" onClick={() => submitSave()} />
        {snsDataList.map((item: any) => {
          return (
            <BasicItemBox key={`sns_input_${item.type}`}>
              <ItemHead16 text={util.getOfficialSnsNameText(item.type)} />
              <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <TextField
                  size="small"
                  sx={{ borderRadius: 2, flex: 1 }}
                  value={item.url || ''}
                  onChange={(e: any) => {
                    handleInputChange(e.target.value, item.type);
                  }}
                />
                <Typography sx={{ color: '#0000ff', cursor: 'pointer', paddingLeft: 3 }} onClick={() => openWebLink(item.url)}>
                  url 확인
                </Typography>
              </Box>
            </BasicItemBox>
          );
        })}
        {/* <BasicItemBox>
          <ItemHead16 text="페이스북" />
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <TextField size="small" sx={{ borderRadius: 2, flex: 1 }} value={0} onChange={(e: any) => {}} />
            <Typography sx={{ color: '#0000ff', paddingLeft: 10 }} onClick = { () => moveSnsPage('F')} >url 이동</Typography>
          </Box>
        </BasicItemBox>
        <BasicItemBox>
          <ItemHead16 text="트위터" />
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <TextField size="small" sx={{ borderRadius: 2, flex: 1 }} value={0} onChange={(e: any) => {}} />
            <Typography sx={{ color: '#0000ff', paddingLeft: 10 }} onClick = { () => moveSnsPage('T')} >url 이동</Typography>
          </Box>
        </BasicItemBox>
        <BasicItemBox>
          <ItemHead16 text="인스타그램" />
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <TextField size="small" sx={{ borderRadius: 2, flex: 1 }} value={0} onChange={(e: any) => {}} />
          </Box>
        </BasicItemBox>
        <BasicItemBox>
          <ItemHead16 text="웨이보" />
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <TextField size="small" sx={{ borderRadius: 2, flex: 1 }} value={0} onChange={(e: any) => {}} />
            <Typography sx={{ color: '#0000ff', paddingLeft: 10 }} onClick = { () => moveSnsPage('')} >url 이동</Typography>
          </Box>
        </BasicItemBox>
        <BasicItemBox>
          <ItemHead16 text="브이앱" />
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <TextField size="small" sx={{ borderRadius: 2, flex: 1 }} value={0} onChange={(e: any) => {}} />
            <Typography sx={{ color: '#0000ff', paddingLeft: 10 }} onClick = { () => moveSnsPage('')} >url 이동</Typography>
          </Box>
        </BasicItemBox> */}
      </CMBoxStretch>
    </>
  );
});

export default ZoneInfoSns;
