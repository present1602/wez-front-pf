import { styled } from '@mui/material';

const PreviewBox: any = styled('div')((props: any) => ({
  width: props.width ? props.width : '120px',
  height: props.height ? props.height : '120px',
  backgroundColor: 'rgb(222,222,222)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  backgroundImage: props.imgsrc && `url(${props.imgsrc})`
}));

export default PreviewBox;
