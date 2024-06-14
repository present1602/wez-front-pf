import { Box, TextField } from '@mui/material';
import * as React from 'react';
import { BasicItemBox, ItemBox } from '../../../component/common/ItemBox';
import { ItemHead16 } from '../../../component/common/ItemHead';
import PreviewBox from '../../../component/common/PreviewBox';
import { observer } from 'mobx-react';
import util from '../../../helper/util';

interface IBasicInfoContentProps {
  photoCardFormStore?: any;
}

const BasicInfoContent: React.FunctionComponent<IBasicInfoContentProps> = observer(({ photoCardFormStore }) => {
  const [photoCardImageUrl, setPhotoCardImageUrl] = React.useState<any>('');

  React.useEffect(() => {
    if (photoCardFormStore.photoCardImageData && photoCardFormStore.photoCardImageData.url) {
      setPhotoCardImageUrl(util.getImageProxyPath(photoCardFormStore.photoCardImageData.url));
    }
  });
  const handleImageChange = (fileBlob: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve: any) => {
      reader.onload = () => {
        photoCardFormStore.setPhotoCardImageFile(fileBlob);
        setPhotoCardImageUrl(reader.result);
        resolve();
      };
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <BasicItemBox>
        <ItemHead16 text="멤버" />
        <Box sx={{ flex: 1 }}>
          <TextField
            size="small"
            sx={{ borderRadius: 2, flex: 1 }}
            inputProps={{
              readOnly: !photoCardFormStore.isActive ? true : false
            }}
            value={photoCardFormStore.memberName}
            onChange={(e: any) => photoCardFormStore.setMemberName(e.target.value)}
          />
        </Box>
      </BasicItemBox>

      <ItemBox>
        <ItemHead16 text="사진" />
        <Box sx={{ flex: 1 }}>
          <Box pb={1}>
            <PreviewBox imgsrc={photoCardImageUrl} />
          </Box>
          {photoCardFormStore.isActive && (
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
      <ItemBox>
        <ItemHead16 text="내용" />
        <Box sx={{ flex: 1 }}>
          <TextField
            sx={{ width: '100%' }}
            inputProps={{
              readOnly: !photoCardFormStore.isActive ? true : false
            }}
            value={photoCardFormStore.memo}
            multiline={true}
            minRows={3}
            onChange={(e: any) => photoCardFormStore.setMemo(e.target.value)}
          />
        </Box>
      </ItemBox>
    </Box>
  );
});

export default BasicInfoContent;
