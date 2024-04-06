import React, { useEffect } from "react";
import { LoginAndSignForm } from "../organisms";
import { useAPI } from "../../hooks/useAPI";

export const Register: React.FC = () => {
  const { response, error, call } = useAPI({ endpoint: "login" });

  const handleSubmit = (username: string, email: string) => {
    call({ username, email });
  };

  useEffect(() => {
    if (response) {
      console.log(response);
    }
  }, [response]);

  return (
    <div className="h-screen p-2 flex flex-col justify-center items-center">
      <h1 className="text-3xl pb-3">Register</h1>
      <LoginAndSignForm onSubmit={handleSubmit} />
      {error && <p className="text-red-500 mt-2">{error.error}</p>}
    </div>
  );
};
