import { Box, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { BasicItemBox, ItemBox } from '../../../component/common/ItemBox';
import { ItemHead16 } from '../../../component/common/ItemHead';
import PreviewBox from '../../../component/common/PreviewBox';
import DatePicker from 'react-datepicker';
import { SmallButton } from '../../../component/common/Button';
import { observer } from 'mobx-react';
import { KOMCA_INITIAL } from '../../../store/AlbumFormStore';
import util from '../../../helper/util';
import moment from 'moment';

interface IBasicInfoContentProps {
  albumFormStore?: any;
}

const BasicInfoContent: React.FunctionComponent<IBasicInfoContentProps> = observer(({ albumFormStore }) => {
  const [coverImageUrl, setCoverImageUrl] = React.useState<any>('');

  const handleDateChange = (date: any) => {
    albumFormStore.setReleaseDate(date);
  };

  React.useEffect(() => {
    if (albumFormStore.albumCover && albumFormStore.albumCover.url) {
      setCoverImageUrl(util.getImageProxyPath(albumFormStore.albumCover.url));
    }
  });
  const handleImageChange = (fileBlob: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve: any) => {
      reader.onload = () => {
        albumFormStore.setAlbumCoverFile(fileBlob);
        setCoverImageUrl(reader.result);
        resolve();
      };
    });
  };

  const addKOMCA = () => {
    albumFormStore.addKOMCAInputGroup();
  };

  const removeKOMCA = (idx: number) => {
    if (idx === 0 && albumFormStore.albumSerialList.length === 1) {
      albumFormStore.setAlbumSerialList([KOMCA_INITIAL]);
    } else {
      albumFormStore.removeKOMCAInputGroup(idx);
    }
  };

  const handleRangeNumberChange = (e: any, idx: number, startOrEnd: string) => {
    albumFormStore.changeKomkaRangeInput(e.target.value, idx, startOrEnd);
  };

  const onBlurKomcaInput = () => {
    albumFormStore.updateAlbumVolume();
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {/* <BasicItemBox>
        <ItemHead16 text="아티스트" />
        <Box sx={{ flex: 1 }}>
          <Select size="small" sx={{ height: '30px' }} value={albumFormStore.zoneId ? albumFormStore.zoneId : 0} onChange={(e) => albumFormStore.setZoneId(e.target.value)}>
            <MenuItem value={0}>선택</MenuItem>
            {artistOptionList.map((option: any) => {
              return (
                <MenuItem value={option.value} key={v4()}>
                  {option.text}
                </MenuItem>
              );
            })}
          </Select>
        </Box>
      </BasicItemBox> */}

      <BasicItemBox>
        <ItemHead16 text="앨범명" />
        <Box sx={{ flex: 1 }}>
          <TextField
            size="small"
            sx={{ borderRadius: 2, flex: 1 }}
            inputProps={{
              readOnly: !albumFormStore.isActive ? true : false
            }}
            value={albumFormStore.title}
            onChange={(e: any) => albumFormStore.setTitle(e.target.value)}
          />
        </Box>
      </BasicItemBox>

      <ItemBox>
        <ItemHead16 text="사진" />
        <Box sx={{ flex: 1 }}>
          <Box pb={1}>
            <PreviewBox imgsrc={coverImageUrl} />
          </Box>
          {albumFormStore.isActive && (
            <Box>
              <input
                type="file"
                onChange={(e: any) => {
                  handleImageChange(e.target.files[0]);
                }}
              />
            </Box>
          )}
        </Box>
      </ItemBox>

      <BasicItemBox>
        <ItemHead16 text="출시일" />
        <Box sx={{ flex: 1 }}>
          {/* <DatePicker onChange={(val: any) => {}} inline /> */}
          {albumFormStore.isActive ? (
            <DatePicker selected={albumFormStore.releaseDate} customInput={<TextField size="small" sx={{ width: 140 }} />} onChange={(date: any) => handleDateChange(date)} />
          ) : (
            <TextField
              size="small"
              sx={{ width: 140 }}
              inputProps={{
                readOnly: true
              }}
              value={moment(albumFormStore.releaseDate).format('MM/DD/YYYY')}
            />
          )}

          {/* <Calendar onChange={(date: any) => handleDateChange(date)} value={albumFormStore.releaseDate} /> */}
        </Box>
      </BasicItemBox>

      <ItemBox>
        <ItemHead16 text="KOMCA번호" />
        <Box sx={{ flex: 1 }}>
          {albumFormStore.albumSerialList.map((item: any, idx: number) => {
            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }} key={`inp-grp-${idx}`} my={1}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    inputProps={{
                      readOnly: !albumFormStore.isActive ? true : false
                    }}
                    size="small"
                    // label="시작번호"
                    value={item.rangeStartNumber}
                    key={`stinp_${idx}`}
                    onChange={(e: any) => handleRangeNumberChange(e, idx, 'start')}
                    onBlur={() => onBlurKomcaInput()}
                  />
                  <Typography px={2}>~</Typography>
                  <TextField
                    inputProps={{
                      readOnly: !albumFormStore.isActive ? true : false
                    }}
                    size="small"
                    // label="끝번호"
                    value={item.rangeEndNumber}
                    key={`endinp_${idx}`}
                    onChange={(e: any) => handleRangeNumberChange(e, idx, 'end')}
                    onBlur={() => onBlurKomcaInput()}
                  />
                </Box>
                <Box px={1} />
                <Box sx={{ width: '200px' }}>
                  {albumFormStore.albumSerialList.length === idx + 1 ? (
                    <SmallButton text="추가하기" onClick={() => addKOMCA()} backgroundColor={'neutral.moderate'} />
                  ) : (
                    <SmallButton text="삭제" onClick={() => removeKOMCA(idx)} backgroundColor={'neutral.moderate'} />
                  )}
                </Box>
                {/* {albumFormStore.albumSerialList.length === idx + 1 && <SmallButton text="추가하기" onClick={() => {}} backgroundColor={'neutral.moderate'} />} */}
              </Box>
            );
          })}
        </Box>
        {/* <Box sx={{ display: 'flex', alignItems: 'flex-end' }} mb={1}>
          <SmallButton text="추가하기" onClick={() => addKOMCA()} backgroundColor={'neutral.moderate'} />
        </Box> */}
      </ItemBox>

      <BasicItemBox>
        <ItemHead16 text="앨범 수량" />
        <Box sx={{ flex: 1 }}>
          <TextField
            size="small"
            InputProps={{
              readOnly: true
            }}
            sx={{ borderRadius: 2, flex: 1 }}
            value={albumFormStore.albumVolume}
            onChange={(e: any) => {
              albumFormStore.setAlbumVolume(e.target.value);
            }}
          />
        </Box>
      </BasicItemBox>
    </Box>
  );
});

export default BasicInfoContent;
