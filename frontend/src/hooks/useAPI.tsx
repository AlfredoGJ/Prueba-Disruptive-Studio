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
  getTopics: {
    method: "GET",
    url: "/topics",
  },
  createTopic: {
    method: "POST",
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
  getTopicsThatAcceptContent: {
    method: "GET",
    url: "/topics",
  },
  createPost: {
    method: "POST",
    url: "/posts",
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

  const call = async (data: any, params: string) => {
    setLoading(true);
    try {
      const { method, url } = endpoints[endpoint];
      const res = await axios({
        method,
        url: `${baseURL}${url}${params? `/${params}`:""}`,
        data,
        ...{
          headers: useAuth
            ? { Authorization: `Bearer ${readAccessToken()}` }
            : {},
        },
      });

      console.log("Response:", res);
      setResponse(res);
    } catch (err: any) {
      setError(err.response.data);
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return [call, loading, response, error];
};
