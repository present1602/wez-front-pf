import { Box, Divider } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router';
import { BannerRequestHandler } from '../../api/content';
import { CMContentFlexBox } from '../../component/common/Box';
import FlexEndMainButton from '../../component/common/FlexEndMainButton';
import BannerGroupListContent from '../../component/content/SimpleListContent';
import PageTitle from '../../component/contentHeader/PageTitle';

interface IBannserScreenProps {}

const BannserScreen: React.FunctionComponent<IBannserScreenProps> = (props) => {
  const [listData, setListData] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    BannerRequestHandler.getGroupCountList({
      onSuccess: (data: any) => {
        setListData(data);
      }
    });
  }, []);

  return (
    <CMContentFlexBox>
      <PageTitle title="배너" />
      <Divider />
      <FlexEndMainButton text="추가하기" onClick={() => navigate('/content/banner/create')} />
      <Box sx={{ maxWidth: '1200px' }}>
        <BannerGroupListContent
          cols={[
            { key: 'rowNumber', name: 'No', width: 50, sx: { cursor: 'pointer' } },
            { key: 'artistZone', name: '아티스트', attr: 'title', sx: { cursor: 'pointer' } },
            { key: 'bannerTotalCount', name: '개수', sx: { cursor: 'pointer' } }
          ]}
          onItemClick={(row: any) => navigate(`/content/banner/artist/${row.artistZone.zoneId}`, { state: { ...row, init: true } })}
          listData={listData}
        />
      </Box>
    </CMContentFlexBox>
  );
};

export default BannserScreen;
