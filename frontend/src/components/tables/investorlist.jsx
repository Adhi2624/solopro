import React, { useEffect, useState } from 'react';
import InvestorRow from '../investorRow';
import axios from 'axios';
import Nav1 from '../nav1';
import { TextField, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';

const CustomTextField = styled(TextField)({
    "& .MuiInputBase-root": {
        color: "white",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "white",
        },
        "&:hover fieldset": {
            borderColor: "white",
        },
        "&.Mui-focused fieldset": {
            borderColor: "white",
        },
    },
    "& input:-webkit-autofill": {
        "-webkit-box-shadow": "0 0 0 1000px #000 inset",
        "-webkit-text-fill-color": "white",
        "caret-color": "white",
    },
});

const CustomSelect = styled(Select)({
    color: "white",
    borderColor: "white",
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "white",
        },
        "&:hover fieldset": {
            borderColor: "white",
        },
        "&.Mui-focused fieldset": {
            borderColor: "white",
        },
    },
    "& .MuiSelect-select": {
        backgroundColor: "transparent",
    },
    "& input:-webkit-autofill": {
        "-webkit-box-shadow": "0 0 0 1000px #000 inset",
        "-webkit-text-fill-color": "white",
        "caret-color": "white",
    },
});

const InvestorList = () => {
    const [investorList, setInvestorList] = useState([]);
    const [filteredInvestors, setFilteredInvestors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [investorsPerPage, setInvestorsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('name'); // Default search field
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
        setSearchTerm(''); // Clear search term when changing search field
    };

    return (
        <div>
            <Nav1 />
            <div className='p-5 mt-3'>
                <div className="d-flex justify-content-center mb-3">
                    <CustomTextField
                        label="Search"
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        onChange={handleSearch}
                        InputProps={{
                            className: 'custom-input',
                        }}
                    />
                    <CustomSelect
                        value={searchField}
                        onChange={handleSearchFieldChange}
                        variant="outlined"
                        fullWidth
                    >
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="areaOfExpertise">Area of Expertise</MenuItem>
                       
                        <MenuItem value="numberOfPeopleMentored">Number of People Mentored</MenuItem>
                        <MenuItem value="status">Status</MenuItem>
                    </CustomSelect>
                </div>
                <div className="d-flex justify-content-center mb-3">
                    
                </div>
                <div className="table-responsive">
                    <table className="table text-light" id="mentor-table">
                        <thead>
                            <tr className='text-center'>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Area of Expertise</th>
                              
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
