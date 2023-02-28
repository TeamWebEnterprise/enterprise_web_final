import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/",
});

export const createIdiea = async (
  axiosJWT,
  accessToken,
  content,
  anonymous,
  idCategory
) => {
  try {
    await axiosJWT.post(
      "/idieas/createidiea",
      {
        content: content,
        anonymous: anonymous,
        idCategory: idCategory,
      },
      {
        headers: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      }
    );
  } catch (error) {}
};

export const getIdieas = (orderField, orderBy, page) => {
  if (orderField === "likes") {
    return api.get(`/idieas/all-by-likes?page=${page}`).then((res) => res.data);
  }

  return api
    .get(
      `/idieas/all?order-field=${orderField}&orderby=${orderBy}&page=${page}`
    )
    .then((res) => res.data);
};

export const like = async (axiosJWT, accessToken, idieaId, positive) => {
  try {
    await axiosJWT.post(
      "/idieas/like",
      {
        idieaId: idieaId,
        positive: positive,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

export const comment = async (
  axiosJWT,
  accessToken,
  anonymous,
  content,
  idieaId
) => {
  try {
    await axiosJWT.post(
      "/comment/add",
      {
        anonymous: anonymous,
        content: content,
        idieaId: idieaId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (error) {}
};

export const getAllCategory = async () => {
  try {
    return api.get("/category/all").then((res) => res.data);
  } catch (error) {}
};
