import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/",
});

export const createIdiea = async (
  axiosJWT,
  accessToken,
  content,
  anonymous,
  idCategory,
  files
) => {
  try {
    let formData = new FormData();
    formData.append("content", content);
    formData.append("anonymous", anonymous);
    idCategory.forEach((id) => {
      formData.append("idCategory[]", id);
    });
    for (let i = 0; i < files.length; i++) {
      formData.append("files[]", files[i]);
    }

    await axiosJWT.post("/idieas/createidiea", formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
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

export const editIdiea = async (axiosJWT, accessToken, idieaId, content) => {
  try {
    await axiosJWT.post(
      "/idieas/update",
      {
        idieaId: idieaId,
        content: content,
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

export const deleteIdiea = async (axiosJWT, accessToken, idieaId) => {
  try {
    await axiosJWT.post(
      "/idieas/delete",
      {
        idieaId: idieaId,
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
