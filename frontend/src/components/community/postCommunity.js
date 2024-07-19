import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav1 from '../nav1';
import Navinvmen from '../navinme';
import '../../css/postFrom.css'; // We'll use this for custom styles

const PostForm = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [shortDesc, setShortDesc] = useState('');
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const backend=process.env.REACT_APP_BACKEND;
    const lstorage = localStorage.getItem('user');
    const lstorageparse=JSON.parse(lstorage);
  const urole=lstorageparse.value.role;
  const isstudent= urole==='Student';
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
        const lstorage = localStorage.getItem('user');
        const lstorageparse = JSON.parse(lstorage);
        const token = lstorageparse;
        const formData = new FormData();
        formData.append('content', content);
        formData.append('title', title);
        formData.append('shortDesc', shortDesc);
        console.log(token.value.uid)
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }
        for (let i = 0; i < videos.length; i++) {
            formData.append('videos', videos[i]);
        }
        formData.append('uid',token.value.id);
        formData.append('role',token.value.role);
        await axios.post(`${backend}/posts`, formData);
        setContent('');
        setTitle('');
        setShortDesc('');
        setImages([]);
        setVideos([]);
    };

    return (
        <div>
            {isstudent?<Nav1/>:<Navinvmen/>}
        <form className="post-form container" onSubmit={submitPost}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    className="form-control text-white bg-dark"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
            </div>
            <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    className="form-control text-white bg-dark"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                />
            </div>
            <div className="form-group">
                <label htmlFor="shortDesc">Short Description</label>
                <textarea
                    id="shortDesc"
                    className="form-control text-white bg-dark"
                    value={shortDesc}
                    onChange={(e) => setShortDesc(e.target.value)}
                    placeholder="Short Description"
                />
            </div>
            <div className="form-group">
                <label htmlFor="images">Images</label>
                <input
                    id="images"
                    className="form-control-file"
                    type="file"
                    name="images"
                    multiple
                    onChange={handleFileChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="videos">Videos</label>
                <input
                    id="videos"
                    className="form-control-file"
                    type="file"
                    name="videos"
                    multiple
                    onChange={handleFileChange}
                />
            </div>
            <button className="btn btn-primary" type="submit">Post</button>
        </form>
        </div>
    );
};

export default PostForm;
