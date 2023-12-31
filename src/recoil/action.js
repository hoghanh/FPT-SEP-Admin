import { useSetRecoilState } from 'recoil';
import LocalStorageUtils from '../utils/LocalStorageUtils';
import { authState } from './atom';
import jwtDecode from 'jwt-decode';

const useAuthActions = () => {
  const setAuth = useSetRecoilState(authState);

  const login = (token) => {
    LocalStorageUtils.setUser(token);
    const {
      id,
      name,
      phone,
      email,
      address,
      image,
      password,
      role,
      currency,
      status,
    } = jwtDecode(token).result;

    setAuth({
      id,
      name,
      phone,
      email,
      address,
      image,
      password,
      role,
      currency,
      status,
      exp: jwtDecode(token).exp,
    });
  };

  const autoLogin = () => {
    const token = LocalStorageUtils.getToken();
    if (token) {
      const user = jwtDecode(token);
      const expireTime = new Date(jwtDecode(token).exp * 1000);
      if (expireTime > Date.now()) {
        setAuth({
          id: user.result.id,
          email: user.result.email,
          name: user.result.name,
          token,
          role: user.result.role,
          exp: user.exp,
        });
      } else {
        logout();
      }
    } else {
      setAuth({});
    }
  };

  const logout = () => {
    LocalStorageUtils.deleteUser();
    LocalStorageUtils.removeItem('profile');
    setAuth({});
  };

  return {
    login,
    autoLogin,
    logout,
  };
};

export default useAuthActions;
