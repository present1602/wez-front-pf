import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem } from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router';
import { UserRequestHandler } from '../../../../api/member';
import { ItemHead16 } from '../../../../component/common/ItemHead';
import { ItemBoxLineSpacing } from '../../../../component/common/ItemBox';
import util from '../../../../helper/util';
import { SmallButton } from '../../../../component/common/Button';
import Cookies from 'js-cookie';
import { UpdateUserTypeParam, UpdateUserStatusParam } from '../../../../types/user';
import SuspendUserModal from '../module/SuspendUserModal';

interface IUserAccountInfoProps {}

const UserAccountInfo: React.FunctionComponent<IUserAccountInfoProps> = (props) => {
  const { userId } = useParams();
  const [userData, setUserData] = React.useState<any>({});
  const [isSuspendModalOpen, setIsSuspendModalOpen] = React.useState(false);
  const adminType = Cookies.get('type');

  React.useEffect(() => {
    UserRequestHandler.getUser(userId || '', {
      onSuccess: (responseData: any) => {
        setUserData(responseData);
      },
      onFail: () => alert('fail')
    });
  }, []);

  const handleUserTypeChange = (val: string) => {
    setUserData({ ...userData, userType: val });
  };
  const submitUserTypeUpdate = () => {
    const updateParam: UpdateUserTypeParam = {
      userId: userData.userId,
      type: userData.userType
    };
    UserRequestHandler.updateUserType(updateParam, {
      onSuccess: () => {
        alert('수정이 완료되었습니다');
      },
      onFail: (error: any) => console.log(error)
    });
  };

  const submitUserStatusUpdate = (param: UpdateUserStatusParam) => {
    UserRequestHandler.updateUserStatus(param, {
      onSuccess: (responseData: any) => {
        alert('수정이 완료되었습니다');
        setUserData(responseData);
        setIsSuspendModalOpen(false);
      },
      onFail: (error: any) => console.log(error)
    });
  };

  const handleUserStatusChange = (command: string) => {
    if (command === 'suspended') {
      setIsSuspendModalOpen(true);
    } else if (command === 'normal') {
      const updateParam: UpdateUserStatusParam = {
        userId: userData.userId,
        status: command
      };
      submitUserStatusUpdate(updateParam);
    }
  };
  return (
    <>
      {isSuspendModalOpen && <SuspendUserModal setIsSuspendModalOpen={setIsSuspendModalOpen} submitUserStatusUpdate={submitUserStatusUpdate} userId={userId} />}

      <Box sx={{ display: 'flex', flexDirection: 'column' }} my={2}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2%' }}>
          <ItemBoxLineSpacing>
            <ItemHead16 text="지역" />
            <Box sx={{ flex: 1 }}>
              <Typography>{userData.countryCode}</Typography>
              {/* <Typography>{util.getCountryText(userData.countryCode)}</Typography> */}
            </Box>
          </ItemBoxLineSpacing>
          <ItemBoxLineSpacing>
            <ItemHead16 text="가입일" />
            <Box sx={{ flex: 1 }}>
              <Typography>{util.getDate(userData.created)}</Typography>
            </Box>
          </ItemBoxLineSpacing>
          <ItemBoxLineSpacing>
            <ItemHead16 text="소셜" />
            <Box sx={{ flex: 1 }}>
              <Typography>{util.getSnsTypeText(userData.snsType)}</Typography>
            </Box>
          </ItemBoxLineSpacing>
          <ItemBoxLineSpacing>
            <ItemHead16 text="상태" />
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'inline-block' }}>
                <Typography>{util.getStatusText(userData.status, 'user')}</Typography>
              </Box>

              <Box sx={{ display: 'inline' }} px={1} />

              {adminType === 'MASTER' && userData.status === 'normal' && <SmallButton text="이용정지" onClick={() => handleUserStatusChange('suspended')} backgroundColor={'neutral.moderate'} />}
              {adminType === 'MASTER' && userData.status === 'suspended' && <SmallButton text="해제" onClick={() => handleUserStatusChange('normal')} backgroundColor={'green'} />}
            </Box>
          </ItemBoxLineSpacing>
          <ItemBoxLineSpacing>
            <ItemHead16 text="닉네임" />
            <Box sx={{ flex: 1 }}>
              <Typography>{userData.nickName}</Typography>
            </Box>
          </ItemBoxLineSpacing>
          <ItemBoxLineSpacing>
            <ItemHead16 text="이메일" />
            <Box sx={{ flex: 1 }}>
              <Typography>{userData.snsEmail}</Typography>
            </Box>
          </ItemBoxLineSpacing>
          <ItemBoxLineSpacing>
            <ItemHead16 text="핸드폰번호" />
            <Box sx={{ flex: 1 }}>
              <Typography>{userData.phone}</Typography>
            </Box>
          </ItemBoxLineSpacing>
          <ItemBoxLineSpacing>
            <ItemHead16 text="분류" />

            {adminType === 'MASTER' ? (
              <Box sx={{ flex: 1 }}>
                <Select value={userData.userType || 'NORMAL'} onChange={(e: any) => handleUserTypeChange(e.target.value)} size="small">
                  <MenuItem value="NORMAL">일반</MenuItem>
                  <MenuItem value="ARTIST">아티스트</MenuItem>
                </Select>
                <Box sx={{ display: 'inline' }} px={1} />

                <SmallButton text="적용" onClick={() => submitUserTypeUpdate()} backgroundColor={'neutral.moderate'} />
              </Box>
            ) : (
              <Box sx={{ flex: 1 }}>
                <Typography>{util.getTypeText(userData.userType)}</Typography>
              </Box>
            )}
          </ItemBoxLineSpacing>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30% 2%' }} my={2}>
          <Box sx={{}}>
            <ItemBoxLineSpacing>
              <ItemHead16 text="가입아티스트 수" />
              <Box sx={{ flex: 1 }}>
                <Typography>{userData.artistCount}</Typography>
              </Box>
            </ItemBoxLineSpacing>

            {/* <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow> */}

            {userData.artistCount > 0 && (
              <Box my={2}>
                <ItemHead16 text="가입아티스트" />
                <Box>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>아티스트</TableCell>
                        <TableCell>최종접속시간</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {userData.artistList &&
                        userData.artistList.map((item: any) => {
                          return (
                            <TableRow key={Math.random()}>
                              <TableCell>{item.title}</TableCell>
                              <TableCell>{util.convertDateFormat(item.lastLogin)}</TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </Box>
              </Box>
            )}
          </Box>
          <Box sx={{}}>
            <ItemBoxLineSpacing>
              <ItemHead16 text="이용정지기간" />
              {userData.suspendList && userData.suspendList.length > 0 ? (
                <Box>
                  {userData.suspendList.map((item: any) => {
                    return (
                      <Box key={Math.random()}>
                        <Typography display="inline" sx={{ fontSize: 14 }}>
                          {util.getDate(item.startTs)}
                        </Typography>
                        <Typography display="inline" sx={{ fontSize: 14 }}>
                          {' '}
                          ~{' '}
                        </Typography>
                        {item.endTs && (
                          <Typography display="inline" sx={{ fontSize: 14 }}>
                            {util.getDate(item.endTs)}
                          </Typography>
                        )}
                      </Box>
                    );
                  })}
                </Box>
              ) : (
                <Box sx={{ flex: 1 }}>
                  <Typography>해당없음</Typography>
                </Box>
              )}
            </ItemBoxLineSpacing>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserAccountInfo;
