import React, { useState } from 'react';
import { useRBAC } from '../context/RBACContext';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/solid';

const UserManagement = () => {
  const { users, roles, addUser, updateUser, deleteUser } = useRBAC();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    if (currentUser) {
      updateUser({ ...currentUser, ...userData });
    } else {
      addUser(userData);
    }
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">User Management</h2>
        <button 
          onClick={() => {
            setCurrentUser(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <PlusIcon className="w-5 h-5 mr-2" /> Add User
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form 
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg w-96"
          >
            <h3 className="text-xl mb-4">
              {currentUser ? 'Edit User' : 'Add New User'}
            </h3>
            <input 
              type="text" 
              name="username" 
              placeholder="Username" 
              defaultValue={currentUser?.username || ''}
              required 
              className="w-full mb-3 p-2 border rounded"
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              defaultValue={currentUser?.email || ''}
              required 
              className="w-full mb-3 p-2 border rounded"
            />
            <select 
              name="role" 
              defaultValue={currentUser?.role || ''}
              className="w-full mb-3 p-2 border rounded"
            >
              {roles.map(role => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
            <select 
              name="status" 
              defaultValue={currentUser?.status || 'Active'}
              className="w-full mb-3 p-2 border rounded"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Username</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-t">
              <td className="p-3">{user.username}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.role}</td>
              <td className="p-3">
                <span className={`
                  px-2 py-1 rounded text-sm
                  ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                `}>
                  {user.status}
                </span>
              </td>
              <td className="p-3 text-right">
                <button 
                  onClick={() => {
                    setCurrentUser(user);
                    setIsModalOpen(true);
                  }}
                  className="text-blue-500 mr-2"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => deleteUser(user.id)}
                  className="text-red-500"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;