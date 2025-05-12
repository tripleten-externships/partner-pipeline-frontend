import { useCallback } from "react";
import { AUTH_TOKEN } from "../store";
import { useMutation, useQuery } from "@apollo/client";
import { USER_LOGIN, USER_LOGOUT } from "../graphql/mutations/users";
import {
  User,
  UserAuthenticationWithPasswordResult,
  UserAuthenticationWithPasswordSuccess,
  UserAuthenticationWithPasswordFailure,
} from "../__generated__/graphql";
import { GET_CURRENT_USER } from "../graphql/queries/users";
import { client, setGraphqlHeaders } from "../store";

interface UseAuthProps {
  onLoginSuccess?: (data: { session: User }) => void;
  onLogoutSuccess?: () => void;
}

export const useAuth = ({ onLoginSuccess, onLogoutSuccess }: UseAuthProps) => {
  const [login, { error: loginError, loading: loginLoading }] = useMutation(USER_LOGIN);
  const {
    data: currentUserData,
    loading: currentUserLoading,
    error: currentUserError,
  } = useQuery(GET_CURRENT_USER);
  const [logout, { error: logoutError, loading: logoutLoading }] = useMutation(USER_LOGOUT);

  const handleLoginSuccess = useCallback(
    (sessionToken: string, user: User) => {
      localStorage.setItem(AUTH_TOKEN, sessionToken);
      setGraphqlHeaders(sessionToken);
      client.refetchQueries({
        include: [GET_CURRENT_USER],
      });
      onLoginSuccess?.({ session: user });
    },
    [onLoginSuccess]
  );

  const isSuccessResponse = (
    auth: UserAuthenticationWithPasswordResult
  ): auth is UserAuthenticationWithPasswordSuccess => {
    return auth.__typename === "UserAuthenticationWithPasswordSuccess";
  };

  const isFailureResponse = (
    auth: UserAuthenticationWithPasswordResult
  ): auth is UserAuthenticationWithPasswordFailure => {
    return auth.__typename === "UserAuthenticationWithPasswordFailure";
  };

  const handleLogin = useCallback(
    ({ email, password }: { email: string; password: string }) => {
      login({
        variables: { email, password },
        onCompleted: (data) => {
          const auth = data?.authenticateUserWithPassword;
          if (!auth) return;

          if (isSuccessResponse(auth)) {
            handleLoginSuccess(auth.sessionToken, auth.item);
          } else if (isFailureResponse(auth)) {
            throw new Error(auth.message);
          }
        },
      });
    },
    [login, handleLoginSuccess]
  );

  const handleLogout = useCallback(async () => {
    try {
      const res = await logout();
      if (res) {
        localStorage.removeItem(AUTH_TOKEN);
        setGraphqlHeaders(undefined);
        client.refetchQueries({
          include: [GET_CURRENT_USER],
        });
        onLogoutSuccess?.();
      }
    } catch (err) {
      console.error(err);
    }
  }, [logout, onLogoutSuccess]);

  return {
    currentUser: currentUserData?.authenticatedItem,
    login: handleLogin,
    error: currentUserError ?? logoutError ?? loginError,
    logout: handleLogout,
    loading: currentUserLoading || loginLoading || logoutLoading,
  };
};
