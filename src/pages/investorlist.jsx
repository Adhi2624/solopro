import React, { useEffect, useState } from 'react';
import InvestorRow from '../components/investorRow'
import axios from 'axios';
import Nav1 from '../components/nav1';

const InvestorList = () => {
    const [mentorList, setMentorList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [mentorsPerPage, setMentorsPerPage] = useState(10); // Default to 10 for this example
    const backend=process.env.REACT_APP_BACKEND;
    console.log(backend);
    
    useEffect(() => {
        axios.get(`${backend}/getmentors`)
            .then(res => {
                setMentorList(res.data);
                
            })
            .catch(err => console.log(err));
    }, [backend]);
    const indexOfLastMentor = currentPage * mentorsPerPage;
    const indexOfFirstMentor = indexOfLastMentor - mentorsPerPage;
    const currentMentors = mentorList.slice(indexOfFirstMentor, indexOfLastMentor);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleMentorsPerPageChange = (event) => {
        setMentorsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    return (
        <div>
            <Nav1/>
            <div className='p-1 mt-3'>
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
                            {currentMentors.map((mentor, idx) => (
                                <InvestorRow key={idx} mentor={mentor} />
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination 
                    mentorsPerPage={mentorsPerPage} 
                    totalMentors={mentorList.length} 
                    paginate={paginate} 
                    currentPage={currentPage} 
                    handleMentorsPerPageChange={handleMentorsPerPageChange}
                    indexOfFirstMentor={indexOfFirstMentor}
                    indexOfLastMentor={indexOfLastMentor}
                />
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

export default InvestorList;
