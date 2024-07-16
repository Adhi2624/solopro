import React from 'react';
import { Link } from 'react-router-dom';

const entrepreneurTableRow = ({ Entrepreneur }) => {
    console.log(Entrepreneur._id)
    return (
        <tr className='text-center'>
            <td>{Entrepreneur.profileImage ? <img className='img-fluid rounded-circle' src={Entrepreneur.profileImage} alt="Entrepreneur" width="50" height="50" /> : ""}</td>
            <td>{Entrepreneur.name || ""}</td>
            <td>{Entrepreneur.areaOfExpertise || ""}</td>
            <td>{Entrepreneur.nativePlaceOrWork || ""}</td>
            <td>{Entrepreneur.EntrepreneurshipCount || ""}</td>
            <td><span className={Entrepreneur.availableToEntrepreneur === 'true' ? 'badge text-bg-success' : 'badge text-bg-danger'}>{Entrepreneur.availableToEntrepreneur === 'true' ? 'Available' : 'Not Available'}</span></td>
            <td>
                <Link to={`/student/Entrepreneur/${Entrepreneur._id}`}>
                    <button className="btn btn-primary">View Profile</button>
                </Link>
            </td>
        </tr>
    );
};

export default entrepreneurTableRow;
