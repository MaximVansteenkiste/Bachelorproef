import useAccounts from "../../../hooks/api/admin/useAccounts";
import React from 'react';
const OtherPersonSelector = ({ selectedUser, setSelectedUser }) => {
  const { data: users } = useAccounts();

  return (
    <select
      className="w-min h-7 bg-transparent font-bold border-2 border-accent rounded text-center"
      onChange={(e) =>
        setSelectedUser(users.find((u) => u.id === e.target.value))
      }
    >
      {users?.map((u) => (
        <option
          key={`${u.id}option`}
          value={u.id}
          selected={u.id === (selectedUser.uid || selectedUser.id)}
        >
          {u.firstname} {u.lastname}
        </option>
      ))}
    </select>
  );
};

export default OtherPersonSelector;
