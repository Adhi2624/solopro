import React, { useState } from 'react';
import axios from 'axios';

const PostForm = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [shortDesc, setShortDesc] = useState('');
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);

    const handleFileChange = (e) => {
        const { files, name } = e.target;
        if (name === 'images') {
            setImages(files);
        } else {
            setVideos(files);
        }
    };

    const submitPost = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('content', content);
        formData.append('title', title);
        formData.append('shortDesc', shortDesc);
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }
        for (let i = 0; i < videos.length; i++) {
            formData.append('videos', videos[i]);
        }
        await axios.post('http://localhost:5000/posts', formData, {
            headers: {
                Authorization: token,
                'Content-Type': 'multipart/form-data',
            },
        });
        setContent('');
        setTitle('');
        setShortDesc('');
        setImages([]);
        setVideos([]);
    };

    return (
        <form onSubmit={submitPost}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
            />
            <textarea
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                placeholder="Short Description"
            />
            <input type="file" name="images" multiple onChange={handleFileChange} />
            <input type="file" name="videos" multiple onChange={handleFileChange} />
            <button type="submit">Post</button>
        </form>
    );
};

export default PostForm;
