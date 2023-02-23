import axios from "./api/axios";
import jwt_decode from "jwt-decode";

const refreshToken = async () => {
  try {
    const res = await axios.post("/auth/refresh");
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export const createAxios = (user, dispatch, sateSuccess) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decoedToken = jwt_decode(user?.accessToken);
      console.log(decoedToken);
      if (decoedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshTokenUser = {
          ...user,
          refreshToken: data.refreshToken,
          accessToken: data.accessToken,
        };
        dispatch(sateSuccess(refreshTokenUser));
        config = data.refreshToken;
      }
      return config;
    },
    (err) => {
      console.log(err);
      return Promise.reject(err);
    },
  );
  return newInstance;
};
