import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav1 from '../nav1';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const UserList = () => {
    const [userList, setUserList] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const backend = process.env.REACT_APP_BACKEND;

    useEffect(() => {
        axios.get(`${backend}/totaldata`)
            .then(res => {
                console.log("Fetched data:", res.data);
                setUserList(res.data);
                setFilteredUsers(res.data);
            })
            .catch(err => console.log(err));
    }, [backend]);

    useEffect(() => {
        const results = userList.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log("Filtered results:", results);
        setFilteredUsers(results);
        setCurrentPage(1);
    }, [searchTerm, userList]);

    const sortData = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });

        const sortedData = [...filteredUsers].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
            return 0;
        });

        setFilteredUsers(sortedData);
    };

    const getSortIcon = (columnName) => {
        if (sortConfig.key === columnName) {
            return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
        }
        return <FaSort />;
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleUsersPerPageChange = (event) => {
        setUsersPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <Nav1/>
            <div className='p-1 mt-3'>
                <div className="d-flex justify-content-center mb-3">
                    <input
                        type="text"
                        className="form-control w-50"
                        placeholder="Search 🔍"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <div className="table-responsive">
                    <table className="table text-light" id="user-table">
                        <thead>
                            <tr className='text-center'>
                                <th scope="col">Name {getSortIcon('name')}</th>
                                <th scope="col">Email {getSortIcon('email')}</th>
                                <th scope="col">Role {getSortIcon('role')}</th>
                                <th scope="col">Status {getSortIcon('status')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user, idx) => (
                                <tr key={idx}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredUsers.length >= 10 && (
                    <Pagination 
                        itemsPerPage={usersPerPage} 
                        totalItems={filteredUsers.length} 
                        paginate={paginate} 
                        currentPage={currentPage} 
                        handleItemsPerPageChange={handleUsersPerPageChange}
                        indexOfFirstItem={indexOfFirstUser}
                        indexOfLastItem={indexOfLastUser}
                    />
                )}
            </div>
        </div>
    );
}

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage, handleItemsPerPageChange, indexOfFirstItem, indexOfLastItem }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const showingFrom = indexOfFirstItem + 1;
    const showingTo = Math.min(indexOfLastItem, totalItems);

    return (
        <nav className='d-flex flex-column flex-md-row justify-content-between align-items-center p-3' id='pagebar'>
            <div className='text-light mb-2 mb-md-0'>
                {`Showing ${showingFrom} to ${showingTo} of ${totalItems} entries`}
            </div>
            <div className='d-flex justify-content-end align-items-center'>
                <div className='me-3 d-flex align-items-center'> 
                    <label htmlFor="itemsPerPageSelect" className="ms-md-1 ms-sm-1 form-label text-light me-2 text-wrap row-label">Rows per page:</label>
                    <select id="itemsPerPageSelect" className="form-select w-auto" value={itemsPerPage} onChange={handleItemsPerPageChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>
                <div className='pagination-container'>
                    <ul className='pagination mb-0'>
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <a onClick={(e) => { e.preventDefault(); if (currentPage > 1) paginate(currentPage - 1); }} href='!#' className='page-link'>
                                Previous
                            </a>
                        </li>
                        {pageNumbers.map(number => (
                            <li key={number} className={`page-item ${currentPage === number ? 'active-page' : ''}`}>
                                <a onClick={(e) => { e.preventDefault(); paginate(number); }} href='!#' className='page-link'>
                                    {number}
                                </a>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
                            <a onClick={(e) => { e.preventDefault(); if (currentPage < pageNumbers.length) paginate(currentPage + 1); }} href='!#' className='page-link'>
                                Next
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default UserList;
