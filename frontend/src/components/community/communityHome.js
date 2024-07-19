import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Nav1 from '../nav1';
import Navinvmen from '../navinme';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
//import './CommunityHome.css'; // Assuming you have custom CSS for additional styles

const CommunityHome = () => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('content');
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');
    const backend = process.env.REACT_APP_BACKEND;
    const lstorage = localStorage.getItem('user');
    const lstorageparse = JSON.parse(lstorage);
    const urole = lstorageparse.value.role;
    const isstudent = urole === 'Student';
    const fetchPosts = async () => {
        try {
            const res = await axios.get(`${backend}/posts`);

            // Fetch author details for each post
            const postsWithAuthors = await Promise.all(
                res.data.map(async (post) => {
                    const authorRes = await axios.get(`${backend}/users/${post.author}`);
                    const author = authorRes.data;
                    console.log(author)
                    return {
                        ...post,
                        authorName: author.name,         // Assuming the author object has a 'name' field
                        authorProfileImg: author.profileImage // Assuming the author object has a 'profileImg' field
                    };
                })
            );

            setPosts(postsWithAuthors);
            console.log(posts)
        } catch (err) {
            console.error("Error fetching posts:", err);
        }
    };

    useEffect(() => {
        fetchPosts();
        console.log(posts);
    }, []);

    // const fetchPosts = async () => {
    //     try {
    //         const res = await axios.get(`${backend}/posts`);
    //         setPosts(res.data);

    //     } catch (err) {
    //         console.error("Error fetching posts:", err);
    //     }
    // };

    const handleSearch = () => {
        const searchTerm = search.toLowerCase();
        return posts.filter(post => {
            if (filter === 'content') return post.content.toLowerCase().includes(searchTerm);
            if (filter === 'title') return post.title.toLowerCase().includes(searchTerm);
            if (filter === 'author') return post.author.name.toLowerCase().includes(searchTerm);
            return true;
        });
    };

    const handleSort = (filteredPosts) => {
        return filteredPosts.sort((a, b) => {
            if (sortBy === 'date') {
                return sortOrder === 'asc' ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt);
            } else if (sortBy === 'title') {
                return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
            }
            return 0;
        });
    };

    const displayPosts = handleSort(handleSearch());

    return (
        <div>
            {isstudent ? <Nav1 /> : <Navinvmen />}
            <div className="container mt-5">
                <h1 className="text-white">Community Posts</h1>
                <Button href='community/post'>post</Button>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search"
                    />
                    <div className="input-group-append">
                        <select className="form-control" value={filter} onChange={(e) => setFilter(e.target.value)}>
                            <option value="content">Content</option>
                            <option value="title">Title</option>
                            <option value="author">Author</option>
                        </select>
                        <select className="form-control" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="date">Date</option>
                            <option value="title">Title</option>
                        </select>
                        <select className="form-control" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    {displayPosts.length === 0 ? (
                        <p className="text-white">There are currently no community posts available.</p>
                    ) : (
                        displayPosts.map((post) => (
                            <div key={post._id} className="col-md-4">
                                <div className="card mb-4">
                                    <img src={post.images[0]} alt={post.author.name} className="card-img-top" />
                                    <div className="card-body">
                                        <h5 className="card-title">{post.title}</h5>
                                        <p className="card-text">{post.shortDesc}</p>
                                        <p className="card-text">Posted by:  <img src={post.authorProfileImg
                                        } alt={"profileimg not found"} className="w-25" />{post.authorName
                                            } ({post.author.role})</p>
                                        <p className="card-text">Date: {new Date(post.createdAt).toLocaleDateString()}</p>
                                        <Link to={`posts/${post._id}`} className="btn btn-primary">View Post</Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommunityHome;
