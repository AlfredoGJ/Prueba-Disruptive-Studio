import React, { useState, useEffect } from "react";
import Field from "../Field/Field";
import { Textbox } from "../../atoms";
import { Select } from "../Select/Select";
import { useAPI } from "../../../hooks/useAPI";
import { ContentType, Option, UserType } from "../../../types/types";
import { Console } from "console";
import FileUpload from "../../atoms/FileUpload/FileUpload";
import { User } from "../../../types/types";

interface UsersFormProps extends React.HTMLProps<HTMLFormElement> {
  initialUser?: User;
}

export const UserForm = React.forwardRef<HTMLFormElement, UsersFormProps>(
  ({ onSubmit, initialUser }, ref) => {
    const userTypes: UserType[] = [
      UserType.ADMIN,
      UserType.VIEWER,
      UserType.CREATOR,
    ];

    const [name, setName] = useState(initialUser?.name || "");
    const [email, setEmail] = useState(initialUser?.email || "");
    const [userType, setUserType] = useState<Option>({
      id: initialUser?.type || UserType.VIEWER,
      name: initialUser?.type || UserType.VIEWER,
    });

    function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
      setName(event.target.value);
    }

    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
      setEmail(event.target.value);
    }

    function handleUserTypeChange(newUsertype: Option) {
      setUserType(newUsertype);
    }

    return (
      <form ref={ref} onSubmit={onSubmit}>
        <Field label="Email">
          <Textbox
            name="email"
            placeholder="The email of the user"
            value={email}
            onChange={handleEmailChange}
          />
        </Field>
        <Field label="Username">
          <Textbox
            name="name"
            placeholder="The username of the user"
            value={name}
            onChange={handleNameChange}
          />
        </Field>
        <Field label="User Type">
          <Select
            multiple={false}
            name="type"
            options={userTypes.map((user) => ({
              id: user.toString(),
              name: user.toString(),
            }))}
            value={userType}
            onChange={handleUserTypeChange}
          />
        </Field>
      </form>
    );
  }
);
