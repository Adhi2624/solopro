import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const AdminBlog = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [order, setOrder] = useState(0);
  const [archived, setArchived] = useState(false);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredDescription, setFeaturedDescription] = useState('');
  const [featuredOrder, setFeaturedOrder] = useState(0);
  const [featuredArchived, setFeaturedArchived] = useState(false);
  const [moreImage, setMoreImage] = useState(null);
  const [moreShortDescription, setMoreShortDescription] = useState('');
  const [moreOrder, setMoreOrder] = useState(0);
  const [moreArchived, setMoreArchived] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [featuredStories, setFeaturedStories] = useState([]);
  const [moreStories, setMoreStories] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const backend=process.env.REACT_APP_BACKEND;
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const blogsResponse = await axios.get(`${backend}/api/blogs`);
      const featuredStoriesResponse = await axios.get(`${backend}/api/featuredStories`);
      const moreStoriesResponse = await axios.get(`${backend}/api/moreStories`);
      setBlogs(blogsResponse.data);
      setFeaturedStories(featuredStoriesResponse.data);
      setMoreStories(moreStoriesResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddOrUpdateBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('description', description);
    formData.append('order', order);
    formData.append('archived', archived);

    try {
      if (editMode) {
        await axios.put(`${backend}/api/blogs/${currentId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await axios.post(`${backend}/api/blogs`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      fetchData();
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditBlog = (blog) => {
    setTitle(blog.title);
    setDescription(blog.description);
    setOrder(blog.order);
    setArchived(blog.archived);
    setCurrentId(blog._id);
    setEditMode(true);
  };

  const handleDeleteBlog = async (id) => {
    try {
      await axios.delete(`${backend}/api/blogs/${id}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddOrUpdateFeaturedStory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', featuredImage);
    formData.append('description', featuredDescription);
    formData.append('order', featuredOrder);
    formData.append('archived', featuredArchived);

    try {
      if (editMode) {
        await axios.put(`${backend}/api/featuredStories/${currentId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await axios.post(`${backend}/api/featuredStories`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      fetchData();
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditFeaturedStory = (story) => {
    setFeaturedDescription(story.description);
    setFeaturedOrder(story.order);
    setFeaturedArchived(story.archived);
    setCurrentId(story._id);
    setEditMode(true);
  };

  const handleDeleteFeaturedStory = async (id) => {
    try {
      await axios.delete(`${backend}/api/featuredStories/${id}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddOrUpdateMoreStory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', moreImage);
    formData.append('shortDescription', moreShortDescription);
    formData.append('order', moreOrder);
    formData.append('archived', moreArchived);

    try {
      if (editMode) {
        await axios.put(`${backend}/api/moreStories/${currentId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await axios.post(`${backend}/api/moreStories`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      fetchData();
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditMoreStory = (story) => {
    setMoreShortDescription(story.shortDescription);
    setMoreOrder(story.order);
    setMoreArchived(story.archived);
    setCurrentId(story._id);
    setEditMode(true);
  };

  const handleDeleteMoreStory = async (id) => {
    try {
      await axios.delete(`${backend}/api/moreStories/${id}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setImage(null);
    setDescription('');
    setOrder(0);
    setArchived(false);
    setFeaturedImage(null);
    setFeaturedDescription('');
    setFeaturedOrder(0);
    setFeaturedArchived(false);
    setMoreImage(null);
    setMoreShortDescription('');
    setMoreOrder(0);
    setMoreArchived(false);
    setEditMode(false);
    setCurrentId(null);
  };

  return (
    <div className="container mt-5" style={{color:'white'}}>
      <h2 className="text-center">Admin Panel</h2>
      <form onSubmit={handleAddOrUpdateBlog} className="mb-5">
        <h3>{editMode ? 'Update Blog Post' : 'Add New Blog Post'}</h3>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="order" className="form-label">Order</label>
          <input
            type="number"
            className="form-control"
            id="order"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="archived"
            checked={archived}
            onChange={(e) => setArchived(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="archived">Archive</label>
        </div>
        <button type="submit" className="btn btn-primary">{editMode ? 'Update Blog Post' : 'Add Blog Post'}</button>
      </form>

      <div className="table-responsive">
        <h3>Blog Posts</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Order</th>
              <th>Archived</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td>{blog.title}</td>
                <td>{blog.description}</td>
                <td>{blog.order}</td>
                <td>{blog.archived ? 'Yes' : 'No'}</td>
                <td>
                  <button className="btn btn-warning" onClick={() => handleEditBlog(blog)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDeleteBlog(blog._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form onSubmit={handleAddOrUpdateFeaturedStory} className="mb-5">
        <h3>{editMode ? 'Update Featured Story' : 'Add New Featured Story'}</h3>
        <div className="mb-3">
          <label htmlFor="featuredImage" className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            id="featuredImage"
            onChange={(e) => setFeaturedImage(e.target.files[0])}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="featuredDescription" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="featuredDescription"
            rows="3"
            value={featuredDescription}
            onChange={(e) => setFeaturedDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="featuredOrder" className="form-label">Order</label>
          <input
            type="number"
            className="form-control"
            id="featuredOrder"
            value={featuredOrder}
            onChange={(e) => setFeaturedOrder(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="featuredArchived"
            checked={featuredArchived}
            onChange={(e) => setFeaturedArchived(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="featuredArchived">Archive</label>
        </div>
        <button type="submit" className="btn btn-primary">{editMode ? 'Update Featured Story' : 'Add Featured Story'}</button>
      </form>

      <div className="table-responsive">
        <h3>Featured Stories</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Order</th>
              <th>Archived</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {featuredStories.map((story) => (
              <tr key={story._id}>
                <td>{story.description}</td>
                <td>{story.order}</td>
                <td>{story.archived ? 'Yes' : 'No'}</td>
                <td>
                  <button className="btn btn-warning" onClick={() => handleEditFeaturedStory(story)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDeleteFeaturedStory(story._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form onSubmit={handleAddOrUpdateMoreStory} className="mb-5">
        <h3>{editMode ? 'Update More Story' : 'Add New More Story'}</h3>
        <div className="mb-3">
          <label htmlFor="moreImage" className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            id="moreImage"
            onChange={(e) => setMoreImage(e.target.files[0])}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="moreShortDescription" className="form-label">Short Description</label>
          <textarea
            className="form-control"
            id="moreShortDescription"
            rows="3"
            value={moreShortDescription}
            onChange={(e) => setMoreShortDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="moreOrder" className="form-label">Order</label>
          <input
            type="number"
            className="form-control"
            id="moreOrder"
            value={moreOrder}
            onChange={(e) => setMoreOrder(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="moreArchived"
            checked={moreArchived}
            onChange={(e) => setMoreArchived(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="moreArchived">Archive</label>
        </div>
        <button type="submit" className="btn btn-primary">{editMode ? 'Update More Story' : 'Add More Story'}</button>
      </form>

      <div className="table-responsive">
        <h3>More Stories</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Short Description</th>
              <th>Order</th>
              <th>Archived</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {moreStories.map((story) => (
              <tr key={story._id}>
                <td>{story.shortDescription}</td>
                <td>{story.order}</td>
                <td>{story.archived ? 'Yes' : 'No'}</td>
                <td>
                  <button className="btn btn-warning" onClick={() => handleEditMoreStory(story)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDeleteMoreStory(story._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBlog;