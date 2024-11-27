import React, { createContext, useState, useContext } from 'react';

const RBACContext = createContext();

const initialRoles = [
  {
    id: 1,
    name: 'Admin',
    permissions: ['user:read', 'user:write', 'user:delete', 'role:read', 'role:write']
  },
  {
    id: 2,
    name: 'Viewer',
    permissions: ['user:read', 'role:read']
  }
];

const initialUsers = [
  {
    id: 1,
    username: 'admin_user',
    email: 'admin@vrvsecurity.com',
    role: 'Admin',
    status: 'Active'
  }
];

export const RBACProvider = ({ children }) => {
  const [users, setUsers] = useState(initialUsers);
  const [roles, setRoles] = useState(initialRoles);

  const addUser = (user) => {
    const newUser = { ...user, id: Date.now() };
    setUsers([...users, newUser]);
    return newUser;
  };

  const updateUser = (updatedUser) => {
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
  };

  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const addRole = (role) => {
    const newRole = { ...role, id: Date.now() };
    setRoles([...roles, newRole]);
    return newRole;
  };

  const updateRole = (updatedRole) => {
    setRoles(roles.map(role => 
      role.id === updatedRole.id ? updatedRole : role
    ));
  };

  return (
    <RBACContext.Provider value={{
      users,
      roles,
      addUser,
      updateUser,
      deleteUser,
      addRole,
      updateRole
    }}>
      {children}
    </RBACContext.Provider>
  );
};

export const useRBAC = () => useContext(RBACContext);