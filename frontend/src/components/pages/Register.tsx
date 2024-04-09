import React, { useEffect } from "react";
import { LoginAndSignForm } from "../organisms";
import { useAPI } from "../../hooks/useAPI";
import { Toggle } from "../atoms/Toggle/Toggle";
import { UserType } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { writeAccessToken } from "../../utils/session/SessionUtils";

export const Register: React.FC = () => {
  const [call, , response, error] = useAPI({ endpoint: "signup" });
  const navigate = useNavigate();
  const [userType, setUserType] = React.useState<UserType>(UserType.VIEWER);

  const handleSubmit = (username: string, email: string) => {
    call({ name: username, email, type: userType });
  };

  function handleToggleChange(value: boolean) {
    if (value) setUserType(UserType.CREATOR);
    else setUserType(UserType.VIEWER);
  }

  useEffect(() => {
    if (response && response.status === 200) {
      writeAccessToken(response.data.token);
      navigate("/home");
    }
  }, [response, navigate]);

  const creatorStyle = "bg-gradient-to-tr from-amber-500 to-orange-700";
  const viewerStyle = "bg-gradient-to-tr from-sky-500 to-indigo-700";
  return (
    <div
      className={`${
        userType === UserType.CREATOR ? creatorStyle : viewerStyle
      } h-screen p-2 flex flex-col justify-center items-center`}
    >
      <div className="flex items-center space-x-2 pb-4">
        <div className="text-2xl  text-white">Register as </div>
        {userType === UserType.CREATOR ? (
          <div className="text-3xl text-orange-200 font-semibold">Creator</div>
        ) : (
          <div className="text-3xl text-blue-200 font-semibold">Viewer</div>
        )}
        <Toggle
          enabled={userType === UserType.CREATOR}
          onChange={handleToggleChange}
        />
      </div>

      <LoginAndSignForm onSubmit={handleSubmit} />
      {error && <p className="text-red-500 mt-2">{error.error}</p>}
    </div>
  );
};
