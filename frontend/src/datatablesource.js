// export const userColumns = [
//   { field: "id", headerName: "ID", width: 70 },
//   {
//     field: "user",
//     headerName: "User",
//     width: 230,
//     renderCell: (params) => {
//       return (
//         <div className="cellWithImg">
//           <img className="cellImg" src={params.row.img} alt="avatar" />
//           {params.row.username}
//         </div>
//       );
//     },
//   },
//   {
//     field: "email",
//     headerName: "Email",
//     width: 230,
//   },

//   {
//     field: "age",
//     headerName: "Age",
//     width: 100,
//   },
//   {
//     field: "status",
//     headerName: "Status",
//     width: 160,
//     renderCell: (params) => {
//       return (
//         <div className={`cellWithStatus ${params.row.status}`}>
//           {params.row.status}
//         </div>
//       );
//     },
//   },
// ];

// //temporary data
// export const userRows = [
//   {
//     id: 1,
//     username: "Snow",
//     img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//     status: "active",
//     email: "1snow@gmail.com",
//     age: 35,
//   },
//   {
//     id: 2,
//     username: "Jamie Lannister",
//     img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//     email: "2snow@gmail.com",
//     status: "passive",
//     age: 42,
//   },
//   {
//     id: 3,
//     username: "Lannister",
//     img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//     email: "3snow@gmail.com",
//     status: "pending",
//     age: 45,
//   },
//   {
//     id: 4,
//     username: "Stark",
//     img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//     email: "4snow@gmail.com",
//     status: "active",
//     age: 16,
//   },
//   {
//     id: 5,
//     username: "Targaryen",
//     img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//     email: "5snow@gmail.com",
//     status: "passive",
//     age: 22,
//   },
//   {
//     id: 6,
//     username: "Melisandre",
//     img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//     email: "6snow@gmail.com",
//     status: "active",
//     age: 15,
//   },
//   {
//     id: 7,
//     username: "Clifford",
//     img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//     email: "7snow@gmail.com",
//     status: "passive",
//     age: 44,
//   },
//   {
//     id: 8,
//     username: "Frances",
//     img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//     email: "8snow@gmail.com",
//     status: "active",
//     age: 36,
//   },
//   {
//     id: 9,
//     username: "Roxie",
//     img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//     email: "snow@gmail.com",
//     status: "pending",
//     age: 65,
//   },
//   {
//     id: 10,
//     username: "Roxie",
//     img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//     email: "snow@gmail.com",
//     status: "active",
//     age: 65,
//   },
// ];




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import './investorList.scss';

const backend = process.env.REACT_APP_BACKEND;

const InvestorList = () => {
  const [investorList, setInvestorList] = useState([]);
  
  useEffect(() => {
    axios.get(`${backend}/getinvestors`)
      .then(res => {
        setInvestorList(res.data);
      })
      .catch(err => console.log(err));
  }, [backend]);

  const investorColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Name",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
    {
      field: "areaOfExpertise",
      headerName: "Area of Expertise",
      width: 200,
    },
    {
      field: "placeOfService",
      headerName: "Place of Service",
      width: 200,
    },
    {
      field: "numberOfPeopleMentored",
      headerName: "Number of People Mentored",
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
  ];

  return (
    <div className="investorList">
      <div className="investorListTitle">
        Investors
      </div>
      <DataGrid
        rows={investorList}
        columns={investorColumns}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

export default InvestorList;
