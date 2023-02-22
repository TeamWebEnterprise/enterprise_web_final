import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/",
});
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
