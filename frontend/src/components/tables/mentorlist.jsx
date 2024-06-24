import React, { useEffect, useState } from 'react';
import MentorTableRow from '../mentorRow';
import axios from 'axios';
import Nav1 from '../nav1';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const MentorList = () => {
    const [mentorList, setMentorList] = useState([]);
    const [filteredMentors, setFilteredMentors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [mentorsPerPage, setMentorsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const backend = process.env.REACT_APP_BACKEND;

    useEffect(() => {
        axios.get(`${backend}/getmentors`)
            .then(res => {
                setMentorList(res.data);
                setFilteredMentors(res.data);
            })
            .catch(err => console.log(err));
    }, [backend]);

    useEffect(() => {
        const results = mentorList.filter(mentor =>
            mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mentor.areaOfExpertise.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMentors(results);
        setCurrentPage(1);
    }, [searchTerm, mentorList]);

    const sortData = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });

        const sortedData = [...filteredMentors].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
            return 0;
        });

        setFilteredMentors(sortedData);
    };

    const getSortIcon = (columnName) => {
        if (sortConfig.key === columnName) {
            return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
        }
        return <FaSort />;
    };

    const indexOfLastMentor = currentPage * mentorsPerPage;
    const indexOfFirstMentor = indexOfLastMentor - mentorsPerPage;
    const currentMentors = filteredMentors.slice(indexOfFirstMentor, indexOfLastMentor);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleMentorsPerPageChange = (event) => {
        setMentorsPerPage(Number(event.target.value));
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
                    <table className="table text-light" id="mentor-table">
                        <thead>
                            <tr className='text-center'>
                                <th scope="col">Image</th>
                                <th scope="col" onClick={() => sortData('name')}>Name {getSortIcon('name')}</th>
                                <th scope="col" onClick={() => sortData('areaOfExpertise')}>Area of Expertise {getSortIcon('areaOfExpertise')}</th>
                                <th scope="col" onClick={() => sortData('placeOfService')}>Place of Service {getSortIcon('placeOfService')}</th>
                                <th scope="col" onClick={() => sortData('peopleMentored')}>Number of People Mentored {getSortIcon('peopleMentored')}</th>
                                <th scope="col" onClick={() => sortData('status')}>Status {getSortIcon('status')}</th>
                                <th scope="col">Profile</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentMentors.map((mentor, idx) => (
                                <MentorTableRow key={idx} mentor={mentor} />
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredMentors.length >= 10 && (
                    <Pagination 
                        mentorsPerPage={mentorsPerPage} 
                        totalMentors={filteredMentors.length} 
                        paginate={paginate} 
                        currentPage={currentPage} 
                        handleMentorsPerPageChange={handleMentorsPerPageChange}
                        indexOfFirstMentor={indexOfFirstMentor}
                        indexOfLastMentor={indexOfLastMentor}
                    />
                )}
            </div>
        </div>
    );
}
    const Pagination = ({ mentorsPerPage, totalMentors, paginate, currentPage, handleMentorsPerPageChange, indexOfFirstMentor, indexOfLastMentor }) => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(totalMentors / mentorsPerPage); i++) {
            pageNumbers.push(i);
        }

        const showingFrom = indexOfFirstMentor + 1;
        const showingTo = Math.min(indexOfLastMentor, totalMentors);

        return (
            <nav className='d-flex flex-column flex-md-row justify-content-between align-items-center p-3' id='pagebar'>
            <div className='text-light mb-2 mb-md-0'>
                {`Showing ${showingFrom} to ${showingTo} of ${totalMentors} entries`}
            </div>
            <div className='d-flex justify-content-end align-items-center'>
                <div className='me-3 d-flex align-items-center'> 
                    <label htmlFor="mentorsPerPageSelect" className="ms-md-1 ms-sm-1 form-label text-light me-2 text-wrap row-label">Rows per page:</label>
                    <select id="mentorsPerPageSelect" className="form-select w-auto" value={mentorsPerPage} onChange={handleMentorsPerPageChange}>
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

    export default MentorList;
