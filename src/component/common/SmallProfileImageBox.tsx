import { styled } from '@mui/material';

const SmallProfileImageBox: any = styled('div')((props: any) => ({
  width: props.width ? props.width : '64px',
  height: props.height ? props.height : '64px',
  borderRadius: '32px',
  backgroundColor: 'rgb(222,222,222)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  backgroundImage: props.imgsrc && `url(${props.imgsrc})`
}));

export default SmallProfileImageBox;
