import React, { useEffect, useState } from 'react';
import InvestorRow from '../investorRow';
import axios from 'axios';
import Nav1 from '../nav1';

const InvestorList = () => {
    const [investorList, setInvestorList] = useState([]);
    const [filteredInvestors, setFilteredInvestors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [investorsPerPage, setInvestorsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('name');
    const backend = process.env.REACT_APP_BACKEND;

    useEffect(() => {
        axios.get(`${backend}/getinvestors`)
            .then(res => {
                setInvestorList(res.data);
                setFilteredInvestors(res.data);
            })
            .catch(err => console.log(err));
    }, [backend]);

    useEffect(() => {
        const results = investorList.filter(investor =>
            investor[searchField].toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredInvestors(results);
        setCurrentPage(1);
    }, [searchTerm, searchField, investorList]);

    const indexOfLastInvestor = currentPage * investorsPerPage;
    const indexOfFirstInvestor = indexOfLastInvestor - investorsPerPage;
    const currentInvestors = filteredInvestors.slice(indexOfFirstInvestor, indexOfLastInvestor);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleInvestorsPerPageChange = (event) => {
        setInvestorsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchFieldChange = (event) => {
        setSearchField(event.target.value);
    };

    return (
        <div>
            <Nav1/>
            <div className='p-1 mt-3'>
                <div className="d-flex justify-content-center mb-3">
                    <input
                        type="text"
                        className="form-control w-50 me-2"
                        placeholder="Search 🔍"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <select
                        className="form-select w-auto"
                        value={searchField}
                        onChange={handleSearchFieldChange}
                    >
                        <option value="name">Name</option>
                        <option value="areaOfExpertise">Area of Expertise</option>
                        <option value="placeOfService">Place of Service</option>
                        <option value="peopleMentored">Number of People Mentored</option>
                        <option value="status">Status</option>
                    </select>
                </div>
                <div className="table-responsive">
                    <table className="table text-light" id="mentor-table">
                        <thead>
                            <tr className='text-center'>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Area of Expertise</th>
                                <th scope="col">Place of Service</th>
                                <th scope="col">Number of People Mentored</th>
                                <th scope="col">Status</th>
                                <th scope="col">Profile</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentInvestors.map((investor, idx) => (
                                <InvestorRow key={idx} mentor={investor} />
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredInvestors.length >= 10 && (
                    <Pagination 
                        investorsPerPage={investorsPerPage} 
                        totalInvestors={filteredInvestors.length} 
                        paginate={paginate} 
                        currentPage={currentPage} 
                        handleInvestorsPerPageChange={handleInvestorsPerPageChange}
                        indexOfFirstInvestor={indexOfFirstInvestor}
                        indexOfLastInvestor={indexOfLastInvestor}
                    />
                )}
            </div>
        </div>
    );
}

const Pagination = ({ investorsPerPage, totalInvestors, paginate, currentPage, handleInvestorsPerPageChange, indexOfFirstInvestor, indexOfLastInvestor }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalInvestors / investorsPerPage); i++) {
        pageNumbers.push(i);
    }

    const showingFrom = indexOfFirstInvestor + 1;
    const showingTo = Math.min(indexOfLastInvestor, totalInvestors);

    return (
        <nav className='d-flex flex-column flex-md-row justify-content-between align-items-center p-3' id='pagebar'>
            <div className='text-light mb-2 mb-md-0'>
                {`Showing ${showingFrom} to ${showingTo} of ${totalInvestors} entries`}
            </div>
            <div className='d-flex justify-content-end align-items-center'>
                <div className='me-3 d-flex align-items-center'> 
                    <label htmlFor="investorsPerPageSelect" className="ms-md-1 ms-sm-1 form-label text-light me-2 text-wrap row-label">Rows per page:</label>
                    <select id="investorsPerPageSelect" className="form-select w-auto" value={investorsPerPage} onChange={handleInvestorsPerPageChange}>
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

export default InvestorList;
