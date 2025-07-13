import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:3111/api";

export const setAuthTokens = (accessToken, refreshToken) => {
  Cookies.set("accessToken", accessToken, { expires: 1 });
  Cookies.set("refreshToken", refreshToken, { expires: 7 });
};

export const getAuthTokens = () => {
  return {
    accessToken: Cookies.get("accessToken"),
    refreshToken: Cookies.get("refreshToken"),
  };
};

export const removeAuthTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};

export const authAxios = axios.create({
  baseURL: API_URL,
});

authAxios.interceptors.request.use(
  (config) => {
    const { accessToken } = getAuthTokens();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { refreshToken } = getAuthTokens();

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(`${API_URL}/refresh-token`, {
          refreshToken,
        });
        const { accessToken, refreshToken: newRefreshToken } = response.data;

        setAuthTokens(accessToken, newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return authAxios(originalRequest);
      } catch (refreshError) {
        removeAuthTokens();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const checkAuth = async (dispatch) => {
  const { refreshToken } = getAuthTokens();

  if (refreshToken) {
    try {
      const response = await axios.post(`${API_URL}/refresh-token`, {
        refreshToken,
      });
      const { accessToken: newAccessToken } = response.data;
      setAuthTokens(newAccessToken, refreshToken);
      dispatch({ type: "LOGIN_SUCCESS" });
      return true;
    } catch {
      removeAuthTokens();
      dispatch({ type: "LOGOUT" });
      return false;
    }
  }

  return false;
};
