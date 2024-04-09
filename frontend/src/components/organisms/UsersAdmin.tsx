import React, { useEffect } from "react";
import { useAPI } from "../../hooks/useAPI";
import UserItem from "../molecules/UserItem";
import { User } from "../../types/types";
import { Button } from "../atoms";
import { Modal } from "../molecules/Modal/Modal";
import { UserForm } from "../molecules/UserForm/UserForm";

interface UsersAdminProps {
  // Define your props here
}

const UsersAdmin: React.FC<UsersAdminProps> = (props) => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [call, , response, error] = useAPI({
    endpoint: "getUsers",
    useAuth: true,
  });

  const [callCreateUser, , responseCreateUser, errorCreateUser] = useAPI({
    endpoint: "createUser",
    useAuth: true,
  });

  const formRef = React.useRef<HTMLFormElement>(null);

  useEffect(() => {
    call("");
  }, []);

  useEffect(() => {
    if (response) setUsers(response.data);
  }, [response]);

  useEffect(() => {
    if (responseCreateUser) {
      call("");
      setDialogOpen(false);
    }
  }, [responseCreateUser, errorCreateUser]);

  function handleAddUser() {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data = {
        email: formData.get("email"),
        name: formData.get("name"),
        type: formData.get("type[name]"),
      };
      callCreateUser(data);
    }
  }

  return (
    <div className="p-2">
      {users.map((user) => (
        <UserItem user={user} />
      ))}
      <div className=" flex justify-end pt-2">
        <Button onClick={() => setDialogOpen(true)}>Add User</Button>
      </div>
      <Modal
        title="Add User"
        onClose={() => {}}
        open={dialogOpen}
        mainActionText="Add"
        secondaryActionText="Cancel"
        handleMainAction={handleAddUser}
        handleSecondaryAction={() => setDialogOpen(false)}
      >
        <UserForm ref={formRef} />
        {errorCreateUser && (
          <p className="text-red-500 mt-2">{errorCreateUser.message}</p>
        )}
      </Modal>
    </div>
  );
};

export default UsersAdmin;
