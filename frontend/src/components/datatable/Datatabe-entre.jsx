import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { CircularProgress } from '@mui/material';

const backend = process.env.REACT_APP_BACKEND;

const DatatableEntrepreneur = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backend}/getEntrepreneur`);
        const mentorData = response.data.map((mentor) => ({
          id: mentor._id, 
          name: mentor.name,
          email: mentor.email,
          areaOfExpertise: mentor.areaOfExpertise,
          status: mentor.status ? 'Active' : 'Inactive',
        }));
        setData(mentorData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    console.log('Deleting mentor with ID:', id);
    try {
      setLoading(true);
      await axios.delete(`${backend}/api/Entrepreneur/${id}`);
      setData(data.filter((item) => item.id !== id));
      setLoading(false);
    } catch (error) {
      console.error('Error deleting mentor:', error);
      setError('Error deleting mentor');
      setLoading(false);
    }
  };

  const handleEdit = async (updatedMentor) => {
    console.log('Editing mentor:', updatedMentor);
    try {
      setLoading(true);
      await axios.put(`${backend}/api/Entrepreneur/${updatedMentor.id}`, updatedMentor);
      setData(data.map((item) => (item.id === updatedMentor.id ? updatedMentor : item)));
      setLoading(false);
    } catch (error) {
      console.error('Error updating mentor:', error);
      setError('Error updating mentor');
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

  const mentorColumns = [
    { field: "id", headerName: "ID", width: 70, editable: false },
    { field: "name", headerName: "Name", width: 200, editable: true },
    { field: "email", headerName: "Email", width: 230, editable: true },
    { field: "areaOfExpertise", headerName: "Area of Expertise", width: 200, editable: true },
    { field: "status", headerName: "Status", width: 120, editable: true },
  ];

  // const actionColumn = [
  //   {
  //     field: "action",
  //     headerName: "Action",
  //     width: 200,
  //     renderCell: (params) => (
  //       <div className="cellAction">
  //         <Link to={`/Entrepreneur/${params.row.id}`} style={{ textDecoration: "none" }}>
  //           <div className="viewButton">View</div>
  //         </Link>
  //         <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>Delete</div>
  //       </div>
  //     ),
  //   },
  // ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Mentor List
        {/* <Link to="/Entrepreneur/new" className="link">
          Add New
        </Link> */}
      </div>
      {renderLoading()}
      {error && <div className="errorMessage">{error}</div>}
      <DataGrid
        className="datagrid"
        rows={data}
        columns={mentorColumns}
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

export default DatatableEntrepreneur;
