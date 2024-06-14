import * as React from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { CMBoxStretch } from '../../../component/common/Box';
import FlexEndMainButton from '../../../component/common/FlexEndMainButton';
// import ArtistZoneFormStore from '../../../store/ArtistZoneFormStore';
import ZoneBasicInfoContent from '../module/BasicInfoContent';

interface IZoneInfoBasicProps {
  artistZoneFormStore: any;
}

const ZoneInfoBasic: React.FunctionComponent<IZoneInfoBasicProps> = ({ artistZoneFormStore }) => {
  return (
    <CMBoxStretch direction="column">
      <FlexEndMainButton onClick={() => artistZoneFormStore.submit('update')} text="저장하기" />
      <ZoneBasicInfoContent artistZoneFormStore={artistZoneFormStore} />
    </CMBoxStretch>
  );
};

export default ZoneInfoBasic;
