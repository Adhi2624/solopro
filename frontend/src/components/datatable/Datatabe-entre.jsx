import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { CircularProgress } from '@mui/material';

const backend = process.env.REACT_APP_BACKEND;

const DatatableEntrepreneurs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backend}/api/getEntrepreneurs`);
        const entrepreneurData = response.data.map((entrepreneur) => ({
          id: entrepreneur._id,
          name: entrepreneur.name,
          email: entrepreneur.email,
          expertise: entrepreneur.expertise,
          status: entrepreneur.status ? 'Active' : 'Inactive',
        }));
        setData(entrepreneurData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    console.log('Deleting entrepreneur with ID:', id);
    try {
      setLoading(true);
      await axios.delete(`${backend}/api/entrepreneurs/${id}`);
      setData(data.filter((item) => item.id !== id));
      setLoading(false);
    } catch (error) {
      console.error('Error deleting entrepreneur:', error);
      setError('Error deleting entrepreneur');
      setLoading(false);
    }
  };

  const handleEdit = async (updatedEntrepreneur) => {
    console.log('Editing entrepreneur:', updatedEntrepreneur);
    try {
      setLoading(true);
      await axios.put(`${backend}/api/entrepreneurs/${updatedEntrepreneur.id}`, updatedEntrepreneur);
      setData(data.map((item) => (item.id === updatedEntrepreneur.id ? updatedEntrepreneur : item)));
      setLoading(false);
    } catch (error) {
      console.error('Error updating entrepreneur:', error);
      setError('Error updating entrepreneur');
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

  const entrepreneurColumns = [
    { field: "id", headerName: "ID", width: 70, editable: false },
    { field: "name", headerName: "Name", width: 200, editable: true },
    { field: "email", headerName: "Email", width: 230, editable: true },
    { field: "expertise", headerName: "Expertise", width: 200, editable: true },
    { field: "status", headerName: "Status", width: 120, editable: true },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div className="cellAction">
          <Link to={`/entrepreneurs/${params.row.id}`} style={{ textDecoration: "none" }}>
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
        Entrepreneur List
        <Link to="/entrepreneurs/new" className="link">
          Add New
        </Link>
      </div>
      {renderLoading()}
      {error && <div className="errorMessage">{error}</div>}
      <DataGrid
        className="datagrid"
        rows={data}
        columns={entrepreneurColumns.concat(actionColumn)}
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

export default DatatableEntrepreneurs;
