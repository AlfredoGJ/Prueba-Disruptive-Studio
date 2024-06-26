import axios, { AxiosError } from "axios";
import { useMemo, useState } from "react";
import { readAccessToken } from "../utils/session/SessionUtils";

const endpoints = {
  login: {
    method: "POST",
    url: "/auth/login",
  },
  signup: {
    method: "POST",
    url: "/auth/signup",
  },
  getContentTypes: {
    method: "GET",
    url: "/contentTypes",
  },
  createContentType: {
    method: "POST",
    url: "/contentTypes",
  },
  updateContentType: {
    method: "PATCH",
    url: "/contentTypes",
  },
  deleteContentType: {
    method: "DELETE",
    url: "/contentTypes",
  },
  getTopics: {
    method: "GET",
    url: "/topics",
  },
  createTopic: {
    method: "POST",
    url: "/topics",
  },
  editTopic: {
    method: "PATCH",
    url: "/topics",
  },
  deleteTopic: {
    method: "DELETE",
    url: "/topics",
  },
  getUsers: {
    method: "GET",
    url: "/users",
  },
  createUser: {
    method: "POST",
    url: "/users",
  },
  updateUser: {
    method: "PATCH",
    url: "/users",
  },
  deleteUser: {
    method: "DELETE",
    url: "/users",
  },
  getTopicsThatAcceptContent: {
    method: "GET",
    url: "/topics",
  },
  createPost: {
    method: "POST",
    url: "/posts",
  },
  getPosts: {
    method: "GET",
    url: "/posts",
  },
  updatePost: {
    method: "PATCH",
    url: "/posts",
  },
  deletePost: {
    method: "DELETE",
    url: "/posts",
  },
  getPostsSummary: {
    method: "GET",
    url: "/posts/summary",
  },
  queryPosts: {
    method: "GET",
    url: "/posts/query",
  },
};

interface IUseAPIProps {
  endpoint: keyof typeof endpoints;
  useAuth?: boolean;
}

const baseURL = process.env.REACT_APP_API_URL;

export const useAPI = ({ endpoint, useAuth }: IUseAPIProps) => {
  //   const axiosInstance = useMemo(() => axios.create({ baseURL }), []);
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const call = async (
    data: any,
    params: string,
    queryParams: [Record<string, string>]
  ) => {
    setLoading(true);
    try {
      const { method, url } = endpoints[endpoint];
      const res = await axios({
        params: queryParams,
        method,
        url: `${baseURL}${url}${params ? `/${params}` : ""}`,
        data,
        ...{
          headers: useAuth
            ? { Authorization: `Bearer ${readAccessToken()}` }
            : {},
        },
      });

      setResponse(res);
    } catch (err: any) {
      setError(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  return [call, loading, response, error];
};
