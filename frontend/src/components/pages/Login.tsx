import React from "react";
import { LoginAndSignForm } from "../organisms";




export const Login: React.FC = () => {
  return (
    <div className="h-screen p-2 flex flex-col justify-center items-center">
      <h1 className="text-3xl pb-3">Login</h1>
      <LoginAndSignForm
        onSubmit={(username, password) => console.log(username)}
      />
    </div>
  );
};
