import { post } from "./index";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchToken = async (params = {}, header = {}) => {
  let headers = {
    ...header,
    "Content-Type": "application/json",
  };
  try {
    const result = await post(`${apiUrl}/auth/`, params, { headers });
    if (result?.data) {
      return result?.data;
    } else {
      return {};
    }
  } catch ({ response, message }) {
    return {
      status: response?.status ? response?.status : 404,
      error: response?.data?.message ? response?.data?.message : message,
    };
  }
};

export const getAuthUser = async ({ ...params } = {}, header = {}) => {
  let headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
    ...header,
  };

  const result = await get(
    `${apiUrl}/auth/realms/hasura/protocol/openid-connect/userinfo`,
    {
      params,
      headers,
    }
  ).catch((error) => error);

  if (result.data) {
    return result.data;
  } else {
    return {};
  }
};
