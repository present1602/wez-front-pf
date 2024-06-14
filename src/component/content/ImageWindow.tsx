import { Box, CardMedia } from '@mui/material';
import * as React from 'react';
import { ModalBackground } from '../common/Modal';
import CancelIcon from '@mui/icons-material/CancelOutlined';
import { observer } from 'mobx-react';

interface IImageWindowProps {
  imgsrc: string;
  setModalImgSrc: any;
}

const ImageWindow: React.FunctionComponent<IImageWindowProps> = observer(({ imgsrc, setModalImgSrc }) => {
  return (
    <ModalBackground zIndex={99999}>
      <Box sx={{ backgroundColor: '#fff', position: 'relative' }}>
        <CancelIcon onClick={() => setModalImgSrc('')} sx={{ cursor: 'pointer', position: 'absolute', top: 8, right: 8, fontSize: 36 }} />
        {imgsrc && (
          <CardMedia
            component="img"
            sx={{
              width: '100%',
              height: '100%',
              maxHeight: '80vh',
              margin: '0 auto'
            }}
            image={imgsrc}
            alt="image window"
          />
        )}
      </Box>
    </ModalBackground>
  );
});

export default ImageWindow;
