import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav1 from '../nav1';
import Navinvmen from '../navinme';
import { Box, TextField, Button, Typography, Snackbar, Alert, styled } from '@mui/material';
import '../../css/postFrom.css'; // We'll use this for custom styles

const StyledForm = styled('form')({
    maxWidth: '600px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#1E2A38',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
});

const StyledTextField = styled(TextField)({
    '& .MuiInputBase-input': {
        color: 'white',
    },
    '& .MuiInputLabel-root': {
        color: 'white',
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        borderColor: '#80deea',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#80deea',
    },
});

const PostForm = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [shortDesc, setShortDesc] = useState('');
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();
    const backend = process.env.REACT_APP_BACKEND;
    
    const lstorage = localStorage.getItem('user');
    const lstorageparse = JSON.parse(lstorage);
    const urole = lstorageparse.value.role;
    const isstudent = urole === 'Student';
    
    const handleFileChange = (e) => {
        const { files, name } = e.target;
        if (name === 'images') {
            setImages(files);
        } else {
            setVideos(files);
        }
    };
    var now = new Date();
    const resizeImage = (file, maxWidth, maxHeight) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxWidth) {
                            height = Math.round((height *= maxWidth / width));
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width = Math.round((width *= maxHeight / height));
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);

                    canvas.toBlob(
                        (blob) => {
                            resolve(blob);
                        },
                        file.type,
                        0.75 // Adjust quality here
                    );
                };
                img.onerror = (error) => {
                    reject(error);
                };
            };
        });
    };

    const submitPost = async (e) => {
        e.preventDefault();
        const lstorage = localStorage.getItem('user');
        const lstorageparse = JSON.parse(lstorage);
        const token = lstorageparse;
        const formData = new FormData();
        formData.append('content', content);
        formData.append('title', title);
        formData.append('shortDesc', shortDesc);
        formData.append('Date',now);
        console.log(token.value.uid);


        // Resize images before appending to formData
        for (let i = 0; i < images.length; i++) {
            const resizedImage = await resizeImage(images[i], 800, 800);
            formData.append('images', resizedImage, images[i].name);
        }

        for (let i = 0; i < videos.length; i++) {
            formData.append('videos', videos[i]);
        }

        formData.append('uid', token.value.id);
        formData.append('role', token.value.role);

        await axios.post(`${backend}/posts`, formData);
        setContent('');
        setTitle('');
        setShortDesc('');
        setImages([]);
        setVideos([]);
        
        // Show the success message
        setOpenSnackbar(true);

        // Redirect to the previous page after 2 seconds
        setTimeout(() => {
            navigate(-1);
        }, 2000);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ backgroundColor: "#040F15", minHeight: "100vh", paddingTop: "2rem" }}>
            {isstudent ? <Nav1 /> : <Navinvmen />}
            <StyledForm onSubmit={submitPost}>
                <Typography variant="h4" align="center" color="white" gutterBottom>
                    Create a Post
                </Typography>
                <div className="form-group">
                    <StyledTextField
                        fullWidth
                        id="title"
                        label="Title"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        margin="normal"
                    />
                </div>
                <div className="form-group">
                    <StyledTextField
                        fullWidth
                        id="content"
                        label="Content"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        margin="normal"
                    />
                </div>
                <div className="form-group">
                    <StyledTextField
                        fullWidth
                        id="shortDesc"
                        label="Short Description"
                        variant="outlined"
                        multiline
                        rows={2}
                        value={shortDesc}
                        onChange={(e) => setShortDesc(e.target.value)}
                        margin="normal"
                    />
                </div>
                <div className="form-group">
                    <input
                        id="images"
                        className="form-control-file"
                        type="file"
                        name="images"
                        multiple
                        onChange={handleFileChange}
                        style={{ color: 'white', margin: '10px 0' }}
                    />
                </div>
                <div className="form-group">
                    <input
                        id="videos"
                        className="form-control-file"
                        type="file"
                        name="videos"
                        multiple
                        onChange={handleFileChange}
                        style={{ color: 'white', margin: '10px 0' }}
                    />
                </div>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Post
                </Button>
            </StyledForm>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Post submitted successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default PostForm;
