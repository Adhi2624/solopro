import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav1 from '../nav1';
import Navinvmen from '../navinme';
import { Box, TextField, Button, Typography, Snackbar, Alert, styled } from '@mui/material';
import '../../css/postFrom.css';

const StyledForm = styled('form')({
    maxWidth: '600px',
    width: '100%',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#1E2A38',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
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
    '& .MuiInputBase-root': {
        padding: '0.5rem',
    },
});

const FileInputLabel = styled('label')({
    color: 'white',
    display: 'block',
    marginBottom: '0.5rem',
    cursor: 'pointer',
});

const StyledFileInput = styled('input')({
    display: 'none',
});

const FilePreviewContainer = styled(Box)({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '10px',
});

const FilePreviewItem = styled(Box)({
    position: 'relative',
    width: '100px',
    height: '100px',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#1E2A38',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid white',
});

const PreviewImage = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

const PreviewVideo = styled('video')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

const RemoveButton = styled(Button)({
    position: 'absolute',
    top: '5px',
    right: '5px',
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
    padding: '2px 6px',
    minWidth: '0',
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
            setImages([...images, ...Array.from(files)]);
        } else {
            setVideos([...videos, ...Array.from(files)]);
        }
    };

    const removeFile = (file, type) => {
        if (type === 'image') {
            setImages(images.filter((img) => img !== file));
        } else {
            setVideos(videos.filter((vid) => vid !== file));
        }
    };

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
                        0.75
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

        setOpenSnackbar(true);

        setTimeout(() => {
            navigate(-1);
        }, 2000);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ backgroundColor: "#040F15", minHeight: "100vh", display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexShrink: 0 }}>
                {isstudent ? <Nav1 /> : <Navinvmen />}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
                <StyledForm onSubmit={submitPost}>
                    <Typography variant="h4" align="center" color="white" gutterBottom>
                        Create a Post
                    </Typography>
                    <StyledTextField
                        fullWidth
                        id="title"
                        label="Title"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        margin="normal"
                    />
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
                    
                    {/* Image Upload */}
                    <Box>
                        <FileInputLabel htmlFor="images">Upload Images
                        <Button variant="contained" component="span" fullWidth>
                            Upload Images
                        </Button>
                        </FileInputLabel>
                        <StyledFileInput
                            id="images"
                            type="file"
                            name="images"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        
                    </Box>
                    
                    {/* Video Upload */}
                    <Box>
                        <FileInputLabel htmlFor="videos">Upload Videos<Button variant="contained" component="span" fullWidth>
                            Upload Videos
                        </Button>

                        </FileInputLabel>
                        <StyledFileInput
                            id="videos"
                            type="file"
                            name="videos"
                            multiple
                            accept="video/*"
                            onChange={handleFileChange}
                        />
                        
                    </Box>

                    {/* File Preview */}
                    <FilePreviewContainer>
                        {images.length > 0 && images.map((file, index) => (
                            <FilePreviewItem key={index}>
                                <PreviewImage src={URL.createObjectURL(file)} alt={`preview-${index}`} />
                                <RemoveButton
                                    onClick={() => removeFile(file, 'image')}
                                    size="small"
                                >
                                    X
                                </RemoveButton>
                            </FilePreviewItem>
                        ))}
                        {videos.length > 0 && videos.map((file, index) => (
                            <FilePreviewItem key={index}>
                                <PreviewVideo src={URL.createObjectURL(file)} controls />
                                <RemoveButton
                                    onClick={() => removeFile(file, 'video')}
                                    size="small"
                                >
                                    X
                                </RemoveButton>
                            </FilePreviewItem>
                        ))}
                    </FilePreviewContainer>
                    
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: '1rem' }}
                    >
                        Submit Post
                    </Button>
                </StyledForm>
            </Box>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success">
                    Post submitted successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default PostForm;
