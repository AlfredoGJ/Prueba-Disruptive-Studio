import React, { useEffect } from "react";
import { LoginAndSignForm } from "../organisms";
import { useAPI } from "../../hooks/useAPI";
import { writeAccessToken } from "../../utils/session/SessionUtils";
import { useNavigate } from "react-router-dom";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { UserContext } from "../../context/UserContext";
import {User} from "../../types/types";

export const Login: React.FC = () => {
  const [call, , response, error] = useAPI({ endpoint: "login" });
  const navigate = useNavigate();
  const [user, setUser] = React.useContext(UserContext);
  function handleSubmit(username: string, email: string) {
    call({ username, email });
  }

  
  useEffect(() => {
    if (response && response.status === 200) {
      const user:User  = jwtDecode(response.data.token);
      setUser(user);
      writeAccessToken(response.data.token);
      navigate("/home");
    }
  }, [response]);

  return (
    <div className="h-screen p-2 flex flex-col justify-center items-center">
      <h1 className="text-3xl pb-3">Login</h1>
      <LoginAndSignForm onSubmit={handleSubmit} />
      {error && <p className="text-red-500 mt-2">{error.error}</p>}
    </div>
  );
};
