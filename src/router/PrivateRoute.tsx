import Cookies from 'js-cookie';
import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../store/RootStore';

interface IPrivateRouteProps {
  component: any;
}

const PrivateRoute: React.FunctionComponent<IPrivateRouteProps> = ({ component }) => {
  const { authStore } = useStore();
  let location = useLocation();

  const adminId = Cookies.get('admin_id');

  // React.useEffect(() => {
  //   const isAuth = authStore.isAuthenticated;

  //   if (isAuth) {
  //     setIsChecking(true);
  //   } else {
  //     const cookies = new Cookies();
  //     const cookieAdminId = cookies.get('admin_id');
  //     if (cookieAdminId) {
  //       const cookieType = cookies.get('type');
  //       authStore.changeAuthState(true);
  //       authStore.setUser({ adminId: cookieAdminId });
  //       if (cookieType === 'OFFICIAL') {
  //         authStore.setIsAdmin(false);
  //       }
  //       setIsChecking(true);
  //     } else {
  //       setIsChecking(true);
  //     }
  //   }
  // }, []);
  // return isChecking && (authStore.isAuthenticated ? component : <Navigate to="/login" state={{ from: location }} />);
  // return authStore.isAuthenticated ? component : <Navigate to="/login" state={{ from: location }} />;
  return adminId ? component : <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
