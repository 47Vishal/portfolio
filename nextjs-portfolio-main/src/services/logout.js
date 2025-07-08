// src/hooks/useLogout.js
import { useUserLogOutMutation } from '@/services/userAuthAPI';
import { remove_Token, getToken } from '@/services/LocalStoreService';
import { UnsetUserToken } from '@/features/authSlice';
import { UnsetUserInfo } from '@/features/userSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

export const useLogout = () => {
  const [userLogOut] = useUserLogOutMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = async () => {
    const { refresh_token, access_token } = getToken();
    console.log("Logging out with refresh token:", refresh_token);

    try {
      if (!refresh_token || !access_token) {
        console.warn('No tokens found.');
      } else {
        await userLogOut({
          refreshToken: refresh_token,
          accessToken: access_token,
        }).unwrap();
      }

      // Clear tokens and Redux state
      remove_Token();
      dispatch(UnsetUserToken());
      dispatch(UnsetUserInfo());

      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      remove_Token();
      dispatch(UnsetUserToken());
      dispatch(UnsetUserInfo());
      router.push('/');
    }
  };

  return { logout };
};
