import React from "react";
import Field from "../molecules/Field/Field";
import { Button, Textbox } from "../atoms";

interface LoginFormProps {
  onSubmit: (username: string, email: string) => void;
}

export const LoginAndSignForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = () => {
    if (onSubmit) onSubmit(username, email);
  };

  return (
    <form className="p-6 border-2 rounded-lg flex flex-col border-purple-200 shadow-md bg-purple-50">
      <Field label="Email">
        <Textbox
          placeholder="write your email: "
          value={email}
          onChange={handleEmailChange}
        />
      </Field>
      <Field label="Username">
        <Textbox
          placeholder="Write your user name "
          value={username}
          onChange={handleUsernameChange}
        />
      </Field>

      <Button type="submit" className="mt-6" onClick={handleSubmit}>
        Submit
      </Button>
    </form>
  );
};
