import React, { useEffect, useState } from 'react';
import axios from "axios";
import { EditUserModal } from './Modal/EditUserModal';
import { AddUserModal } from './Modal/AddUserModal';

export const UsersTable = () => {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchNIC, setSearchNIC] = useState('');
  const [userId, setUserId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [addModal, setAddModal] = useState(false);

  const handleOpenModal = (id) => {
    setUserId(id);
    setShowModal(true);
  }
  const handleAddModal = () => {
    setAddModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setAddModal(false);
    window.location.reload();
  }

  useEffect(() => {
    
    axios.get("http://localhost:3001/auth").then((response) => {
      if (Array.isArray(response.data)) {
        setListOfUsers(response.data);
      } else {
        console.error("Response data is not an array:", response.data);
      }
    });
  }, []);

  const handleDelete = (id) => {

    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {

    axios.delete(`http://localhost:3001/auth/delete/${id}`)
      .then((response) => {
        setListOfUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== id)
        );
      });
    }
  };

  const filteredUsers = listOfUsers.filter((user) => {
    const nicMatch = user.nic.toLowerCase().includes(searchNIC.toLowerCase());
    const nameMatch = user.name.toLowerCase().includes(searchName.toLowerCase());
    return  nameMatch && nicMatch;
  });

  return (
    <div className='relative'>
      <div className="w-full min-w-[690px] bg-white mb-5 rounded-xl shadow-lg z-0">
        <div className='justify-center'>
          <div className="mt-1">

            <div className='flex justify-center items-center gap-10'>

                <input
                  className="px-2 border border-gray-300 rounded mt-3"
                  type="text"
                  placeholder="Search by name"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />

                <input
                  className="px-2 border border-gray-300 rounded mt-3"
                  type="number"
                  placeholder="Search by nic"
                  value={searchNIC}
                  onChange={(e) => setSearchNIC(e.target.value)}
                />

                <button 
                className='sm:w-[100px] mt-3 text-white font-medium bg-purple-600 rounded-lg p-1 text-center flex items-center justify-center transition-all duration-100 hover:bg-purple-500 cursor-pointer'
                onClick={() => handleAddModal()}
                >
                    Add
                </button>
            </div>
          </div>
          <table className="min-w-full my-3 bg-white rounded">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-100 border-b">ID</th>
                <th className="py-2 px-4 bg-gray-100 border-b">Username</th>
                <th className="py-2 px-4 bg-gray-100 border-b">Name</th>
                <th className="py-2 px-4 bg-gray-100 border-b">Mob. Number</th>
                <th className="py-2 px-4 bg-gray-100 border-b">Address</th>
                <th className="py-2 px-4 bg-gray-100 border-b">NIC</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((value, key) => (
                <tr key={value.id}>
                  <td className="py-2 px-4 border-b text-center">{value.id}</td>
                  <td className="py-2 px-4 border-b text-center">{value.username}</td>
                  <td className="py-2 px-4 border-b text-center">{value.name}</td>
                  <td className="py-2 px-4 border-b text-center">{value.number}</td>
                  <td className="py-2 px-4 border-b text-center">{value.address}</td>
                  <td className="py-2 px-4 border-b text-center">{value.nic}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      className="text-blue-600 hover:underline mr-2"
                      onClick={() => handleOpenModal(value.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(value.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EditUserModal userId={userId} isOpen={showModal} onClose={handleCloseModal}/>
      <AddUserModal isOpen={addModal} onClose={handleCloseModal}/>

    </div>
  );
};
