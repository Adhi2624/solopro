import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommunityHome = () => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('content');
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');
    const backend = process.env.REACT_APP_BACKEND;

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await axios.get(`${backend}/posts`);
            setPosts(res.data);
            console.log(res.data);
        } catch (err) {
            console.error("Error fetching posts:", err);
        }
    };

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
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="date">Date</option>
                    <option value="title">Title</option>
                </select>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <div>
                {displayPosts.length === 0 ? (
                    <p>There are currently no community posts available.</p>
                ) : (
                    displayPosts.map((post) => (
                        <div key={post._id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
                            <img src={post.author.photo} alt={post.author.name} width="50" height="50" />
                            <h3>{post.title}</h3>
                            <p>{post.shortDesc}</p>
                            <p>Posted by: {post.author.name} ({post.author.role})</p>
                            <p>Date: {new Date(post.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CommunityHome;
