import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import './BlogDetails.css';

const BlogDetail = () => {
  const { id, type } = useParams();
  const [content, setContent] = useState(null);
  const backend = process.env.REACT_APP_BACKEND;

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`${backend}/api/${type}/${id}`);
        setContent(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchContent();
  }, [id, type]);

  if (!content) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className="bg-dark text-white py-3 mb-4">
        <div className="container">
          <h1 className="mb-0">Content Detail</h1>
        </div>
      </header>

      <div className="container">
        <Zoom>
          <img
            src={`data:image/png;base64,${content.image}`}
            className="responsive-img"
            alt={content.title || content.description}
          />
        </Zoom>

        <div className="content-container">
          <h1 className="content-title" style={{ color: 'white' }}>{content.title || 'Story'}</h1>
          <p className="content-description" style={{ color: 'white' }}>{content.description || content.shortDescription}</p>
          <p className="content-date">Posted on {new Date(content.date).toLocaleDateString()}</p>
          <p className="content-author">By {content.authorName} - {content.authorRole}</p>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <p className="mb-0">© 2024 SoloPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BlogDetail;
