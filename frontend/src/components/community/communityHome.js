import React, { useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import { Link, useLocation,useNavigate } from 'react-router-dom';

import Nav1 from '../nav1';
import Navinvmen from '../navinme';
import { Box, Grid, Typography, Avatar, Button, TextField, Paper, MenuItem, Select } from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
const CustomSelect = styled(Select)({
    color: "white",
    borderColor: "white",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
    "& .MuiSelect-select": {
      backgroundColor: "transparent",
    },
    "& input:-webkit-autofill": {
      "-webkit-box-shadow": "0 0 0 1000px #000 inset",
      "-webkit-text-fill-color": "black",
      "caret-color": "black",
    },
  });
  
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#000000",
    },
    background: {
      default: "#07161F",
    },
  },
  typography: {
    allVariants: {
      color: "white",
    },
  },
});

const CustomTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
  "& input:-webkit-autofill": {
    "-webkit-box-shadow": "0 0 0 1000px #000 inset",
    "-webkit-text-fill-color": "white",
    "caret-color": "white",
  },
});

const Card = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#1a202c',
  color: 'white',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  transition: '0.3s',
  '&:hover': {
    boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.2)',
  },
}));

const CommunityHome = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('content');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const navigate = useNavigate();

  const backend = process.env.REACT_APP_BACKEND;
  const lstorage = localStorage.getItem('user');
  const lstorageparse = JSON.parse(lstorage);
  const urole = lstorageparse.value.role;
  const isStudent = urole === 'Student';
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${backend}/posts`);
        const postsWithAuthors = await Promise.all(
          res.data.map(async (post) => {
            const authorRes = await axios.get(`${backend}/users/${post.author}`);
            const author = authorRes.data;
            return {
              ...post,
              authorName: author.name,
              authorProfileImg: author.profileImage,
            };
          })
        );
        setPosts(postsWithAuthors);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, [backend]);

  const filteredPosts = useMemo(() => {
    const searchTerm = search.toLowerCase();
    return posts.filter(post => {
      if (filter === 'content') return post.content.toLowerCase().includes(searchTerm);
      if (filter === 'title') return post.title.toLowerCase().includes(searchTerm);
      if (filter === 'author') return post.authorName.toLowerCase().includes(searchTerm);
      return true;
    });
  }, [posts, search, filter]);

  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc' ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'title') {
        return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      }
      return 0;
    });
  }, [filteredPosts, sortBy, sortOrder]);
  const newlink= window.location.href+'/post'
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: "#040F15", minHeight: '100vh' }}>
        {isStudent ? <Nav1 /> : <Navinvmen />}
        <div className="container mt-5">
          <Typography variant="h4" className="text-white" align="center">Solopro's Community</Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
            <Button variant="contained" color="primary" onClick={() => navigate(-1)}>Back</Button>
            
            <Button component={Link} to={newlink} variant="contained" color="primary">
      Create New Post
    </Button>
          </Box>
          <Grid container spacing={2} alignItems="center" className="mt-3">
            <Grid item xs={12} sm={4}>
              <CustomTextField
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant="body2" color="white">Filter By:</Typography>
              <CustomSelect
                value={filter}
                
                onChange={(e) => setFilter(e.target.value)}
                variant="outlined"
                fullWidth
              >
                <MenuItem sx={{color:'black'}} value="content">Content</MenuItem>
                <MenuItem sx={{color:'black'}} value="title">Title</MenuItem>
                <MenuItem value="author" sx={{color:'black'}}>Author</MenuItem>
              </CustomSelect>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant="body2" color="white">Sort By:</Typography>
              <CustomSelect
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                variant="outlined"
                fullWidth
              >
                <MenuItem value="date" sx={{color:'black'}}>Date</MenuItem>
                <MenuItem value="title" sx={{color:'black'}}>Title</MenuItem>
              </CustomSelect>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant="body2" color="white">Order:</Typography>
              <CustomSelect
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                variant="outlined"
                fullWidth
              >
                <MenuItem value="asc" sx={{color:'black'}}>Ascending</MenuItem>
                <MenuItem value="desc" sx={{color:'black'}}>Descending</MenuItem>
              </CustomSelect>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="mt-4">
            {sortedPosts.length === 0 ? (
              <Typography variant="body1" className="text-white" align="center">There are currently no community posts available.</Typography>
            ) : (
              sortedPosts.map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post._id}>
                  <Card>
                    <img src={post.images[0]} alt={post.authorName} style={{ width: '100%', borderRadius: '8px' }} />
                    <Typography variant="h6" className="mt-2">{post.title}</Typography>
                    <Typography variant="body2" className="mt-1">{post.shortDesc}</Typography>
                    <Box display="flex" alignItems="center" className="mt-1">
                      <Avatar src={post.authorProfileImg} alt="Profile" style={{ display: 'inline-block', marginRight: '8px' }} />
                      <Typography variant="body2">{post.authorName}</Typography>
                    </Box>
                    <Typography variant="body2" className="mt-1">Date: {new Date(post.createdAt).toLocaleDateString()}</Typography>
                    <Button component={Link} to={`posts/${post._id}`} variant="contained" color="primary" className="mt-2">View Post</Button>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </div>
      </Box>    
    </ThemeProvider>
  );
};

export default CommunityHome;
