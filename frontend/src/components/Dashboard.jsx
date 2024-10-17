import React, { useState } from 'react';
import { Settings, X, ChevronLeft, ChevronRight } from 'lucide-react';
import logo from "../assets/assig-logo.png"
import { Link } from 'react-router-dom';

const users = [
  { id: 1, name: 'Michael Holz', dateCreated: '04/10/2013', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Paula Wilson', dateCreated: '05/08/2014', role: 'Publisher', status: 'Active' },
  { id: 3, name: 'Antonio Moreno', dateCreated: '11/05/2015', role: 'Publisher', status: 'Suspended' },
  { id: 4, name: 'Mary Saveley', dateCreated: '06/09/2016', role: 'Reviewer', status: 'Active' },
  { id: 5, name: 'Martin Sommer', dateCreated: '12/08/2017', role: 'Moderator', status: 'Inactive' },
  { id: 6, name: 'Martin Sommer', dateCreated: '12/08/2017', role: 'Moderator', status: 'Inactive' },
  { id: 7, name: 'Martin Sommer', dateCreated: '12/08/2017', role: 'Moderator', status: 'Inactive' },
];

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage =5;

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full">
      <Link to={"/"}> <img src={logo} alt="" className='h-20 -mt-12 mb-12' /></Link>
      
      <table className="w-full bg-white">
        <thead>
          <tr className="bg-black text-white uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">#</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Date Created</th>
            <th className="py-3 px-6 text-left">Role</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {currentUsers.map((user) => (
            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{user.id}</td>
              <td className="py-3 px-6 text-left">
                <div className="flex items-center">
                  <div className="mr-2">
                    <img className="w-6 h-6 rounded-full" src={`https://i.pravatar.cc/150?u=${user.id}`} alt={user.name} />
                  </div>
                  <span>{user.name}</span>
                </div>
              </td>
              <td className="py-3 px-6 text-left">{user.dateCreated}</td>
              <td className="py-3 px-6 text-left">{user.role}</td>
              <td className="py-3 px-6 text-left">
                <span className={`${user.status === 'Active' ? 'bg-green-200 text-green-600' :
                  user.status === 'Inactive' ? 'bg-yellow-200 text-yellow-600' :
                    'bg-red-200 text-red-600'
                  } py-1 px-3 rounded-full text-xs`}>
                  {user.status}
                </span>
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <button className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                    <Settings size={16} />
                  </button>
                  <button className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                    <X size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {Math.ceil(users.length / usersPerPage)}
        </span>
        <button
          onClick={() => paginate(currentPage < Math.ceil(users.length / usersPerPage) ? currentPage + 1 : currentPage)}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
          disabled={currentPage === Math.ceil(users.length / usersPerPage)}
        >
          Next
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;