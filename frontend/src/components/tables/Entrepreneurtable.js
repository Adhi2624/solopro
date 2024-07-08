import React, { useEffect, useState } from 'react';
import entrepreneurTableRow from '../entrepreneurrow'; // Assuming this component exists
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
    borderColor: "white !important", // Ensure border color is white
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "white !important", // Ensure border color is white
        },
        "&:hover fieldset": {
            borderColor: "white !important", // Ensure border color is white on hover
        },
        "&.Mui-focused fieldset": {
            borderColor: "white !important", // Ensure border color is white when focused
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


const MentorentrepenureList = () => {
    const [entrepreneurlist, setEntrepreneurlist] = useState([]);
    const [filteredEntrepreneur, setFilteredEntrepreneur] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [EntrepreneurPerPage, setEntrepreneurPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('name'); // Default search field
    const backend = process.env.REACT_APP_BACKEND;

    useEffect(() => {
        axios.get(`${backend}/getentrepreneur`)
            .then(res => {
                setEntrepreneurlist(res.data);
                setFilteredEntrepreneur(res.data);
            })
            .catch(err => console.log(err));
    }, [backend]);

    useEffect(() => {
        const results = entrepreneurlist.filter(mentor =>
            mentor[searchField].toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEntrepreneur(results);
        setCurrentPage(1);
    }, [searchTerm, searchField, entrepreneurlist]);

    const indexOfLastMentor = currentPage * EntrepreneurPerPage;
    const indexOfFirstMentor = indexOfLastMentor - EntrepreneurPerPage;
    const currentEntrepreneur = filteredEntrepreneur.slice(indexOfFirstMentor, indexOfLastMentor);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleEntrepreneurPerPageChange = (event) => {
        setEntrepreneurPerPage(Number(event.target.value));
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
            <div className='p-1 mt-3'>
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
                        <MenuItem value="placeOfService">Place of Service</MenuItem>
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
                                <th scope="col">Place of Service</th>
                                <th scope="col">Number of People Mentored</th>
                                <th scope="col">Status</th>
                                <th scope="col">Profile</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentEntrepreneur.map((mentor, idx) => (
                                <entrepreneurTableRow  key={idx} entrepreneur={mentor} />
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredEntrepreneur.length >= 10 && (
                    <Pagination
                        EntrepreneurPerPage={EntrepreneurPerPage}
                        totalEntrepreneur={filteredEntrepreneur.length}
                        paginate={paginate}
                        currentPage={currentPage}
                        handleEntrepreneurPerPageChange={handleEntrepreneurPerPageChange}
                        indexOfFirstMentor={indexOfFirstMentor}
                        indexOfLastMentor={indexOfLastMentor}
                    />
                )}
            </div>
        </div>
    );
}

const Pagination = ({ EntrepreneurPerPage, totalEntrepreneur, paginate, currentPage, handleEntrepreneurPerPageChange, indexOfFirstMentor, indexOfLastMentor }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalEntrepreneur / EntrepreneurPerPage); i++) {
        pageNumbers.push(i);
    }

    const showingFrom = indexOfFirstMentor + 1;
    const showingTo = Math.min(indexOfLastMentor, totalEntrepreneur);

    return (
        <nav className='d-flex flex-column flex-md-row justify-content-between align-items-center p-3' id='pagebar'>
            <div className='text-light mb-2 mb-md-0'>
                {`Showing ${showingFrom} to ${showingTo} of ${totalEntrepreneur} entries`}
            </div>
            <div className='d-flex justify-content-end align-items-center'>
                <div className='me-3 d-flex align-items-center'>
                    <label htmlFor="EntrepreneurPerPageSelect" className="ms-md-1 ms-sm-1 form-label text-light me-2 text-wrap row-label">Rows per page:</label>
                    <select id="EntrepreneurPerPageSelect" className="form-select w-auto" value={EntrepreneurPerPage} onChange={handleEntrepreneurPerPageChange}>
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

export default MentorentrepenureList;