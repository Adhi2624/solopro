import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { CircularProgress } from '@mui/material';

const backend = process.env.REACT_APP_BACKEND;

const DatatableStudents = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backend}/getstudents`);
        const studentData = response.data.map((student) => ({
          id: student._id,
          name: student.name,
          email: student.email,
          course: student.course,
          status: student.status ? 'Active' : 'Inactive',
        }));
        setData(studentData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    console.log('Deleting student with ID:', id);
    try {
      setLoading(true);
      await axios.delete(`${backend}/api/students/${id}`);
      setData(data.filter((item) => item.id !== id));
      setLoading(false);
    } catch (error) {
      console.error('Error deleting student:', error);
      setError('Error deleting student');
      setLoading(false);
    }
  };

  const handleEdit = async (updatedStudent) => {
    console.log('Editing student:', updatedStudent);
    try {
      setLoading(true);
      await axios.put(`${backend}/api/students/${updatedStudent.id}`, updatedStudent);
      setData(data.map((item) => (item.id === updatedStudent.id ? updatedStudent : item)));
      setLoading(false);
    } catch (error) {
      console.error('Error updating student:', error);
      setError('Error updating student');
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

  const studentColumns = [
    { field: "id", headerName: "ID", width: 70, editable: false },
    { field: "name", headerName: "Name", width: 200, editable: true },
    { field: "email", headerName: "Email", width: 230, editable: true },
    { field: "course", headerName: "Course", width: 200, editable: true },
    { field: "status", headerName: "Status", width: 120, editable: true },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div className="cellAction">
          <Link to={`/students/${params.row.id}`} style={{ textDecoration: "none" }}>
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
        Student List
        <Link to="/students/new" className="link">
          Add New
        </Link>
      </div>
      {renderLoading()}
      {error && <div className="errorMessage">{error}</div>}
      <DataGrid
        className="datagrid"
        rows={data}
        columns={studentColumns.concat(actionColumn)}
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

export default DatatableStudents;
