import React from 'react';
import { Link } from 'react-router-dom';

const InvestorRow = ({ mentor }) => {
    console.log(mentor._id)
    return (
        <tr className='text-center'>
            <td>{mentor.imgurl ? <img className='img-fluid rounded-circle' src={mentor.imgurl} alt="Mentor" width="50" height="50" /> : ""}</td>
            <td>{mentor.name || ""}</td>
            <td>{mentor.areaOfExpertise || ""}</td>
            <td>{mentor.placeOfService || ""}</td>
            <td>{mentor.noOfPeopleMentored || ""}</td>
            <td><span className={mentor.Status === 'Available' ? 'badge text-bg-success' : 'badge text-bg-danger'}>{mentor.Status || ""}</span></td>
            <td>
            <Link to={`/student/investor/${mentor._id}`}>
    <button className="btn btn-primary">View Profile</button>
</Link>

            </td>
        </tr>
    );
};

export default InvestorRow;
