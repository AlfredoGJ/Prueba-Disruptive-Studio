import axios, { AxiosError } from "axios";
import { useMemo, useState } from "react";

const endpoints = {
  login: {
    method: "POST",
    url: "/auth/login",
  },
  register: {
    method: "POST",
    url: "/auth/register",
  },
};

interface IUseAPIProps {
  endpoint: keyof typeof endpoints;
}

const baseURL = process.env.REACT_APP_API_URL;

export const useAPI = ({ endpoint }: IUseAPIProps) => {
  //   const axiosInstance = useMemo(() => axios.create({ baseURL }), []);
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const call = async (data: any) => {
    setLoading(true);
    try {
      const { method, url } = endpoints[endpoint];
      const res = await axios({ method, url: `${baseURL}${url}`, data });
      console.log("Response:", res);
      setResponse(res.data);
    } catch (err: any) {
      setError(err.response.data);
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, call };
};
