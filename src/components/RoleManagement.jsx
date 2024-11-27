import React, { useState } from 'react';
import { useRBAC } from '../context/RBACContext';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/solid';

const PERMISSION_OPTIONS = [
  'user:read', 'user:write', 'user:delete', 
  'role:read', 'role:write', 'role:delete', 
  'dashboard:view', 'reports:generate'
];

const RoleManagement = () => {
  const { roles, addRole, updateRole } = useRBAC();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const roleData = {
      name: formData.get('roleName'),
      permissions: formData.getAll('permissions')
    };

    if (currentRole) {
      updateRole({ ...currentRole, ...roleData });
    } else {
      addRole(roleData);
    }
    setIsModalOpen(false);
    setCurrentRole(null);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Role Management</h2>
        <button 
          onClick={() => {
            setCurrentRole(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <PlusIcon className="w-5 h-5 mr-2" /> Add Role
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form 
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg w-96"
          >
            <h3 className="text-xl mb-4">
              {currentRole ? 'Edit Role' : 'Add New Role'}
            </h3>
            <input 
              type="text" 
              name="roleName" 
              placeholder="Role Name" 
              defaultValue={currentRole?.name || ''}
              required 
              className="w-full mb-3 p-2 border rounded"
            />
            <div className="mb-3">
              <h4 className="mb-2 font-semibold">Permissions</h4>
              {PERMISSION_OPTIONS.map(permission => (
                <div key={permission} className="flex items-center">
                  <input 
                    type="checkbox" 
                    name="permissions" 
                    value={permission} 
                    id={permission}
                    defaultChecked={currentRole?.permissions?.includes(permission)}
                    className="mr-2"
                  />
                  <label htmlFor={permission}>{permission}</label>
                </div>
              ))}
            </div>
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
            <th className="p-3 text-left">Role Name</th>
            <th className="p-3 text-left">Permissions</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role.id} className="border-t">
              <td className="p-3">{role.name}</td>
              <td className="p-3">
                {role.permissions.map(perm => (
                  <span 
                    key={perm} 
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-1"
                  >
                    {perm}
                  </span>
                ))}
              </td>
              <td className="p-3 text-right">
                <button 
                  onClick={() => {
                    setCurrentRole(role);
                    setIsModalOpen(true);
                  }}
                  className="text-blue-500 mr-2"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleManagement;