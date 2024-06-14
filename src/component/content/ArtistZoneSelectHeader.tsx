import * as React from 'react';
import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '../../store/RootStore';
import { v4 } from 'uuid';

interface IArtistZoneSelectHeaderProps {
  listDataStore: any;
}

const ArtistZoneSelectHeader: React.FunctionComponent<IArtistZoneSelectHeaderProps> = observer(({ listDataStore }) => {
  const { optionDataStore } = useStore();
  const [artistList, setArtistList] = React.useState(optionDataStore.getOptionData('artistList'));

  const handleArtistZoneChange = (val: any) => {
    listDataStore.setZoneId(val);

    listDataStore.setPage(1);
    listDataStore.fetchListData();
  };

  React.useEffect(() => {
    if (optionDataStore.getOptionData('artistList').length === 0) {
      const strData: any = localStorage.getItem('artistList');
      setArtistList(JSON.parse(strData));
    }
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} my={2}>
      <Typography ml={1} mr={2}>
        아티스트
      </Typography>
      <FormControl>
        <Select size="small" onChange={(e: any) => handleArtistZoneChange(e.target.value)} sx={{ height: '30px' }} defaultValue={'all'}>
          <MenuItem key={v4()} value={'all'} defaultChecked={true}>
            전체
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
  );
});

export default ArtistZoneSelectHeader;
