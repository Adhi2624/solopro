import React from 'react';
import { Link } from 'react-router-dom';

const EntrepreneurTableRow = ({ entrepreneur }) => {
    if (!entrepreneur || !entrepreneur._id) {
        return null; // Return null if entrepreneur is undefined or _id is not present
    }

    console.log(entrepreneur._id);

    return (
        <tr className='text-center'>
            <td>{entrepreneur.profileImage ? <img className='img-fluid rounded-circle' src={entrepreneur.profileImage} alt="Entrepreneur" width="50" height="50" /> : ""}</td>
            <td>{entrepreneur.name || ""}</td>
            <td>{entrepreneur.areaOfExpertise || ""}</td>
            <td>{entrepreneur.nativePlaceOrWork || ""}</td>
            <td>{entrepreneur.EntrepreneurshipCount || ""}</td>
            <td><span className={entrepreneur.availableToEntrepreneur === 'true' ? 'badge text-bg-success' : 'badge text-bg-danger'}>{entrepreneur.availableToEntrepreneur === 'true' ? 'Available' : 'Not Available'}</span></td>
            <td>
                <Link to={`/student/entrepreneur/${entrepreneur._id}`}>
                    <button className="btn btn-primary">View Profile</button>
                </Link>
            </td>
        </tr>
    );
};

export default EntrepreneurTableRow;
