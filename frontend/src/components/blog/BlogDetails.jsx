import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import './BlogDetails.css';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) {
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
          <h1 className="mb-0">Blog Detail</h1>
        </div>
      </header>

      <div className="container">
        <Zoom>
          <img
            src={`data:image/png;base64,${blog.image}`}
            className="responsive-img"
            alt={blog.title}
          />
        </Zoom>

        <div className="content-container">
          <h1 className="blog-title">{blog.title}</h1>
          <p className="blog-description">{blog.description}</p>
          <p className="blog-date">Posted on {new Date(blog.date).toLocaleDateString()}</p>
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

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';
// import Zoom from 'react-medium-image-zoom';
// import 'react-medium-image-zoom/dist/styles.css';
// import './BlogDetails.css';

// const BlogDetail = () => {
//   const { type, id } = useParams();
//   const [blog, setBlog] = useState(null);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/${type}/${id}`);
//         setBlog(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchBlog();
//   }, [type, id]);

//   if (!blog) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//         <div className="spinner-border text-primary" role="status">
//           <span className="sr-only">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <header className="bg-dark text-white py-3 mb-4">
//         <div className="container">
//           <h1 className="mb-0">Blog Detail</h1>
//         </div>
//       </header>

//       <div className="container">
//         <Zoom>
//           <img
//             src={`data:image/png;base64,${blog.image}`}
//             className="responsive-img"
//             alt={blog.title}
//           />
//         </Zoom>

//         <div className="content-container">
//           <h1 className="blog-title">{blog.title || 'Story Title'}</h1>
//           <p className="blog-description">{blog.description || blog.shortDescription}</p>
//           <p className="blog-date">Posted on {new Date(blog.date).toLocaleDateString()}</p>
//         </div>
//       </div>

//       <footer className="footer">
//         <div className="container">
//           <p className="mb-0">© 2024 SoloPro. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default BlogDetail;