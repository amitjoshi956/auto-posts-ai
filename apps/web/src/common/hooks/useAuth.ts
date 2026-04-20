import { useLazyLogout } from '@api/user/mutation';
import { useUserProfile } from '@api/user/query';

export const useAuth = () => {
  const { data: userProfile, isLoading, isSuccess, isError } = useUserProfile();
  const [logoutUser] = useLazyLogout();

  const isAuthenticated = isSuccess && !!userProfile?.fullName;
  const userName = userProfile?.fullName || '';

  return { isAuthenticated, userName, isLoading, isError, logout: logoutUser };
};
