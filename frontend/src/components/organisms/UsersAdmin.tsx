import React, { useEffect } from "react";
import { useAPI } from "../../hooks/useAPI";
import UserItem from "../molecules/UserItem";
import { User } from "../../types/types";
import { Button } from "../atoms";
import { Modal } from "../molecules/Modal/Modal";
import { UserForm } from "../molecules/UserForm/UserForm";

interface UsersAdminProps {}

const UsersAdmin: React.FC<UsersAdminProps> = (props) => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [tempUser, setTempUser] = React.useState<User | undefined>();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [call, , response, error] = useAPI({
    endpoint: "getUsers",
    useAuth: true,
  });

  const [callCreateUser, , responseCreateUser, errorCreateUser] = useAPI({
    endpoint: "createUser",
    useAuth: true,
  });

  const [callUpdateUser, , responseUpdateUser, errorUpdateUser] = useAPI({
    endpoint: "updateUser",
    useAuth: true,
  });

  const [callDeleteUser, , responseDeleteUser, errorDeleteUser] = useAPI({
    endpoint: "deleteUser",
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
    if (responseCreateUser || responseUpdateUser || responseDeleteUser) {
      call("");
      setDialogOpen(false);
      setDeleteDialogOpen(false);
    }
  }, [
    responseCreateUser,
    errorCreateUser,
    responseUpdateUser,
    errorUpdateUser,
    responseDeleteUser,
  ]);

  function handleAddUser() {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data = {
        email: formData.get("email"),
        name: formData.get("name"),
        type: formData.get("type[name]"),
      };

      if (tempUser) {
        callUpdateUser(data, tempUser._id);
        setTempUser(undefined);
      } else callCreateUser(data);
    }
  }

  function handleDeleteClick(user: User) {
    setTempUser(user);
    setDeleteDialogOpen(true);
  }

  function handleUpdateClick(user: User) {
    setDialogOpen(true);
    setTempUser(user);
  }

  function handleContentTypeDelete() {
    callDeleteUser("", tempUser?._id);
    setTempUser(undefined);
  }

  function handleDeleteModalSecondaryAction() {
    setDeleteDialogOpen(false);
    setTempUser(undefined);
  }

  function handleAddUserSecondaryAction() {
    setDialogOpen(false);
    setTempUser(undefined);
  }

  return (
    <div className="p-2">
      <div className="grid gap-2 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <UserItem
            key={user._id}
            user={user}
            onDeleteClick={handleDeleteClick}
            onEditClick={handleUpdateClick}
          />
        ))}
      </div>
      <div className=" flex justify-end pt-2">
        <Button onClick={() => setDialogOpen(true)}>Add User</Button>
      </div>
      <Modal
        title="Add User"
        onClose={() => {}}
        open={dialogOpen}
        mainActionText="Save"
        secondaryActionText="Cancel"
        handleMainAction={handleAddUser}
        handleSecondaryAction={handleAddUserSecondaryAction}
      >
        <UserForm ref={formRef} initialUser={tempUser} />
        {errorCreateUser && (
          <p className="text-red-500 mt-2">{errorCreateUser.message}</p>
        )}
      </Modal>
      <Modal
        open={deleteDialogOpen}
        title="Delete User"
        mainActionText="Confirm"
        secondaryActionText="Cancel"
        handleMainAction={handleContentTypeDelete}
        handleSecondaryAction={handleDeleteModalSecondaryAction}
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </div>
  );
};

export default UsersAdmin;
