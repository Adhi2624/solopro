import React from 'react';
import { Link } from 'react-router-dom';

const InvestorRow = ({ mentor }) => {
    console.log(mentor._id)
    return (
        <tr className='text-center'>
            <td>{mentor.profileImage ? <img className='img-fluid rounded-circle' src={mentor.profileImage} alt="Mentor" width="50" height="50" /> : ""}</td>
            <td>{mentor.name || ""}</td>
            <td>{mentor.areaOfExpertise || ""}</td>
            <td>{mentor.nativePlaceOrWork || ""}</td>
            <td>{mentor.mentorshipCount || ""}</td>
            <td><span className={mentor.availableToMentor === 'true' ? 'badge text-bg-success' : 'badge text-bg-danger'}>{mentor.availableToMentor === 'true' ? 'Available' : 'Not Available'}</span></td>
            <td>
            <Link to={`/student/investor/${mentor._id}`}>
    <button className="btn btn-primary">View Profile</button>
</Link>

            </td>
        </tr>
    );
};

export default InvestorRow;
