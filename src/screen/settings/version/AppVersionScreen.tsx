import { Box, Divider } from '@mui/material';
import * as React from 'react';
import { SettingsRequestHandler } from '../../../api/content';
import { CMContentFlexBox } from '../../../component/common/Box';
import SimpleListContent from '../../../component/content/SimpleListContent';
import PageTitle from '../../../component/contentHeader/PageTitle';
import util from '../../../helper/util';
import CheckIcon from '@mui/icons-material/Check';

interface IAppVersionScreenProps {}

const AppVersionScreen: React.FunctionComponent<IAppVersionScreenProps> = (props) => {
  const [appVersionListData, setAppVersionListData] = React.useState([]);

  React.useEffect(() => {
    SettingsRequestHandler.getAppVerionList({
      onSuccess: (data: any) => {
        setAppVersionListData(data);
      }
    });
  }, []);

  const processSetCheck = (val: boolean) => {
    if (val) {
      return <CheckIcon />;
    }
  };
  return (
    <CMContentFlexBox>
      <PageTitle title="앱 버전 관리" />
      <Divider />

      <Box py={5} />
      <SimpleListContent
        cols={[
          { key: 'rowNumber', name: 'No' },
          { key: 'os', name: '플랫폼' },
          { key: 'version', name: '버전' },
          { key: 'force', name: '종류', processData: (item: any) => util.getAppVersionForceText(item) },
          { key: 'updated', name: '등록일', processData: (item: any) => util.getDate(item) },
          { key: 'status', name: '최신', processData: (val: any) => processSetCheck(val) }
        ]}
        listData={appVersionListData}
      />
    </CMContentFlexBox>
  );
};

export default AppVersionScreen;
