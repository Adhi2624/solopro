import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Nav1 from "../nav1";
import Navinvmen from "../navinme";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Grid,
  Typography,
  Select,
  ThemeProvider,
} from "@mui/material";
import { styled, createTheme } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box } from "@mui/material";
const CustomSelect = styled(Select)({
    color: "black",
    borderColor: "white",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
    "& .MuiSelect-select": {
      backgroundColor: "transparent",
    },
    "& input:-webkit-autofill": {
      "-webkit-box-shadow": "0 0 0 1000px #000 inset",
      "-webkit-text-fill-color": "black",
      "caret-color": "black",
    },
  });
  
  // Theme configuration with blue background
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#000000",
      },
      background: {
        default: "#07161F", // Blue shade for the background
      },
    },
    typography: {
      allVariants: {
        color: "white",
      },
    },
  });
  
const CustomTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
  "& input:-webkit-autofill": {
    "-webkit-box-shadow": "0 0 0 1000px #000 inset",
    "-webkit-text-fill-color": "white",
    "caret-color": "white",
  },
});
const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const backend = process.env.REACT_APP_BACKEND;
  const lstorage = localStorage.getItem("user");
  const lstorageparse = JSON.parse(lstorage);
  const token = lstorageparse;
  const urole = lstorageparse.value.role;
  const isStudent = urole === "Student";

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`${backend}/posts/${id}`);
      const postWithAuthors = await Promise.all(
        res.data.comments.map(async (comment) => {
          const author = await axios.get(`${backend}/users/${comment.author}`);
          return { ...comment, author: author.data };
        })
      );
      setPost({ ...res.data, comments: postWithAuthors });
    } catch (err) {
      console.error("Error fetching post:", err);
    }
  };

  const handleLike = async () => {
    try {
      await axios.put(`${backend}/posts/${id}/like`, null, {
        headers: {
          "user-id": token.value.id,
        },
      });
      setPost((prevPost) => ({
        ...prevPost,
        likes: prevPost.likes + 1,
      }));
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backend}/posts/${id}/comments`, {
        text: comment,
        id: token.value.id,
      });
      setComment("");
      fetchPost(); 
    } catch (err) {
      console.error("Error submitting comment:", err);
    }
  };

  if (!post) return <p style={{ color: "white" }}>Loading...</p>;

  return (
    <Box sx={{ backgroundColor: "#040F15", fontStyle: "montserrat" }}>
      {isStudent ? <Nav1 /> : <Navinvmen />}
      <div
        className="container mt-5"
        style={{ color: "white", backgroundColor: "#040F15" }}
      >
        <Typography
          variant="h3"
          sx={{ textAlign: "center", fontStyle: "montserrat" }}
        >
          {post.title}
        </Typography>
    
        <p className="mt-5">{post.content}</p>
        <div>
          <button className="btn btn-primary" onClick={handleLike}>
            Like ({post.likes})
          </button>
        </div>
        <div>
          <h2>Comments</h2>
          <form onSubmit={handleCommentSubmit}>
            <div className="form-group">
              <textarea
                className="form-control"
                style={{
                  color: "white",
                  backgroundColor: "#333",
                  border: "1px solid #555",
                  padding: "10px",
                  borderRadius: "5px",
                  resize: "none",
                }}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <div className="mt-4">
            {post.comments.map((comment) => (
              <div
                key={comment._id}
                className="mb-2"
                style={{ color: "white" }}
              >
                <img
                  src={comment.author.profileImage}
                  alt={comment.author.name}
                  width="30"
                  height="30"
                />
                <strong>
                  {comment.author.name} ({comment.author.role})
                </strong>
                : {comment.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default PostDetail;
