// import "./datatable.scss";
// import { DataGrid } from "@mui/x-data-grid";
// import { userColumns, userRows } from "../../datatablesource";
// import { Link } from "react-router-dom";
// import { useState } from "react";

// const Datatable = () => {
//   const [data, setData] = useState(userRows);

//   const handleDelete = (id) => {
//     setData(data.filter((item) => item.id !== id));
//   };

//   const actionColumn = [
//     {
//       field: "action",
//       headerName: "Action",
//       width: 200,
//       renderCell: (params) => {
//         return (
//           <div className="cellAction">
//             <Link to="/users/test" style={{ textDecoration: "none" }}>
//               <div className="viewButton">View</div>
//             </Link>
//             <div
//               className="deleteButton"
//               onClick={() => handleDelete(params.row.id)}
//             >
//               Delete
//             </div>
//           </div>
//         );
//       },
//     },
//   ];
//   return (
//     <div className="datatable">
//       <div className="datatableTitle">
//         Add New User
//         <Link to="/users/new" className="link">
//           Add New
//         </Link>
//       </div>
//       <DataGrid
//         className="datagrid"
//         rows={data}
//         columns={userColumns.concat(actionColumn)}
//         pageSize={9}
//         rowsPerPageOptions={[9]}
//         checkboxSelection
//       />
//     </div>
//   );
// };

// export default Datatable;




// import "./datatable.scss";
// import { DataGrid } from "@mui/x-data-grid";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from 'axios';

// const backend = process.env.REACT_APP_BACKEND;

// const Datatable = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${backend}/getinvestors`);
//         const investorData = response.data.map((investor, index) => ({
//           id: index + 1,
//           name: investor.name,
//           email: investor.email,
//           areaOfExpertise: investor.areaOfExpertise,
//           placeOfService: investor.placeOfService,
//           status: investor.status,
//           profile: investor.profile,
//         }));
//         setData(investorData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleDelete = (id) => {
//     setData(data.filter((item) => item.id !== id));
//   };

//   const actionColumn = [
//     {
//       field: "action",
//       headerName: "Action",
//       width: 200,
//       renderCell: (params) => {
//         return (
//           <div className="cellAction">
//             <Link to={`/investors/${params.row.id}`} style={{ textDecoration: "none" }}>
//               <div className="viewButton">View</div>
//             </Link>
//             <div
//               className="deleteButton"
//               onClick={() => handleDelete(params.row.id)}
//             >
//               Delete
//             </div>
//           </div>
//         );
//       },
//     },
//   ];

//   const investorColumns = [
//     { field: "id", headerName: "ID", width: 70 },
//     { field: "name", headerName: "Name", width: 200 },
//     { field: "email", headerName: "Email", width: 230 },
//     { field: "areaOfExpertise", headerName: "Area of Expertise", width: 200 },
//     { field: "placeOfService", headerName: "Place of Service", width: 200 },
//     { field: "status", headerName: "Status", width: 120 },
//     { field: "profile", headerName: "Profile", width: 200 },
//   ];

//   return (
//     <div className="datatable">
//       <div className="datatableTitle">
//         Add New Investor
//         <Link to="/investors/new" className="link">
//           Add New
//         </Link>
//       </div>
//       <DataGrid
//         className="datagrid"
//         rows={data}
//         columns={investorColumns.concat(actionColumn)}
//         pageSize={9}
//         rowsPerPageOptions={[9]}
//         checkboxSelection
//       />
//     </div>
//   );
// };

// export default Datatable;

import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { CircularProgress } from '@mui/material';

const backend = process.env.REACT_APP_BACKEND;

const Datatable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backend}/getinvestors`);
        const investorData = response.data.map((investor) => ({
          id: investor._id, 
          name: investor.name,
          email: investor.email,
          areaOfExpertise: investor.areaOfExpertise,
          placeOfService: investor.nativePlaceOrWork,
          status: investor.availableToInvest ? 'Available' : 'Not Available',
        }));
        setData(investorData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    console.log('Deleting investor with ID:', id);
    try {
      setLoading(true);
      await axios.delete(`${backend}/api/investors/${id}`);
      setData(data.filter((item) => item.id !== id));
      setLoading(false);
    } catch (error) {
      console.error('Error deleting investor:', error);
      setError('Error deleting investor');
      setLoading(false);
    }
  };

  const handleEdit = async (updatedInvestor) => {
    console.log('Editing investor:', updatedInvestor);
    try {
      setLoading(true);
      await axios.put(`${backend}/api/investors/${updatedInvestor.id}`, updatedInvestor);
      setData(data.map((item) => (item.id === updatedInvestor.id ? updatedInvestor : item)));
      setLoading(false);
    } catch (error) {
      console.error('Error updating investor:', error);
      setError('Error updating investor');
      setLoading(false);
    }
  };

  const processRowUpdate = (updatedRow) => {
    handleEdit(updatedRow);
    return updatedRow;
  };

  const renderLoading = () => {
    if (loading) {
      return <CircularProgress className="loadingIndicator" />;
    }
    return null;
  };

  const investorColumns = [
    { field: "id", headerName: "ID", width: 70, editable: false },
    { field: "name", headerName: "Name", width: 200, editable: true },
    { field: "email", headerName: "Email", width: 230, editable: true },
    { field: "areaOfExpertise", headerName: "Area of Expertise", width: 200, editable: true },
    
    { field: "status", headerName: "Status", width: 120, editable: true },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div className="cellAction">
          <Link to={`/investors/${params.row.id}`} style={{ textDecoration: "none" }}>
            <div className="viewButton">View</div>
          </Link>
          <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>Delete</div>
        </div>
      ),
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Investor List
        <Link to="/investors/new" className="link">
          Add New
        </Link>
      </div>
      {renderLoading()}
      {error && <div className="errorMessage">{error}</div>}
      <DataGrid
        className="datagrid"
        rows={data}
        columns={investorColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        disableSelectionOnClick
        processRowUpdate={processRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </div>
  );
};

export default Datatable;
