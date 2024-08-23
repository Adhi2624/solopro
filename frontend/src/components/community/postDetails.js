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
  Card,
  CardContent,
  IconButton,
  Box,
} from "@mui/material";
import { styled, createTheme } from "@mui/material/styles";
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import "bootstrap/dist/css/bootstrap.min.css";

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
      // setPost((prevPost) => ({
      //   ...prevPost,
      //   likes: prevPost.likes + 1,
      // }));
      fetchPost(); 
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ backgroundColor: "#040F15", minHeight: "100vh", padding: 3 }}>
        {isStudent ? <Nav1 /> : <Navinvmen />}
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={8} md={6}>
            <Card sx={{ backgroundColor: "#1a1a1a", color: "white", mb: 3 }}>
              <CardContent>
              <img src={`data:image/jpeg;base64,`+post.images[0]} alt={post.authorName} style={{ width: '100%', borderRadius: '8px' }} />
                <Typography variant="h3" align="center">
                  {post.title}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {post.content}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                  <IconButton onClick={handleLike} color="primary">
                    <FavoriteIcon /> {post.likes}
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ backgroundColor: "#1a1a1a", color: "white", mb: 3 }}>
              <CardContent>
                <Typography variant="h5">Comments</Typography>
                <form onSubmit={handleCommentSubmit} style={{ marginTop: "1rem" }}>
                  <CustomTextField
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    endIcon={<SendIcon />}
                    sx={{ mt: 2 }}
                  >
                    Submit
                  </Button>
                </form>
                <Box sx={{ mt: 3 }}>
                  {post.comments.map((comment) => (
                    <Card
                      key={comment._id}
                      sx={{ backgroundColor: "#333", color: "white", mb: 2 }}
                    >
                      <CardContent>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            src={comment.author.profileImage}
                            alt={comment.author.name}
                            sx={{ mr: 2 }}
                          />
                          <Typography variant="body1">
                            <strong>{comment.author.name} ({comment.author.role})</strong>
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {comment.content}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default PostDetail;
