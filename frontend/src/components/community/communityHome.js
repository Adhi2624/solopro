import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommunityHome = () => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('content');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async (query = '') => {
        const res = await axios.get(`http://localhost:5000/posts${query}`);
        setPosts(res.data);
    };

    const handleSearch = () => {
        fetchPosts(`?search=${search}&filter=${filter}`);
    };

    return (
        <div>
            <h1>Community Posts</h1>
            <div>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                />
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="content">Content</option>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                </select>
                <button onClick={handleSearch}>Search</button>
            </div>
            <div>
                {posts.map((post) => (
                    <div key={post._id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
                        <img src={post.author.photo} alt={post.author.name} width="50" height="50" />
                        <h3>{post.title}</h3>
                        <p>{post.shortDesc}</p>
                        <p>Posted by: {post.author.name} ({post.author.role})</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommunityHome;
