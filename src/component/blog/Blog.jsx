import { useEffect, useState } from 'react'
import "../../assets/css/style.css"
import "../../assets/css/bootstrap.css"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import axios from 'axios';
import { Link } from 'react-router-dom';

const URL = 'https://66e9e19287e41760944afe0c.mockapi.io/blog';

function Blog() {
  const [blogs, setBlogs] = useState([]);

  const getListBlog = async () => {
    const res = await axios.get(`${URL}`);
    if (res.status === 200) {
      setBlogs(res.data);
    }
  }

  useEffect(() => {
    getListBlog();
  }, []);

  return (
    <divv>

      <div className="card-deck text-center row mt-5">
        <h1>Blogs</h1>
        {blogs.map(blog => (
          <div className="col-sm-3 col-6 place-grid" key={blog.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  defaultValue={blog.image}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" >
                    {blog.title}
                  </Typography>
                  {/* <Typography variant="body2" sx={{ color: 'text.secondary' }} >
                    {blog.content}
                  </Typography> */}

                  <Typography variant="body2" sx={{ color: 'text.secondary' }} >
                    {blog.date_published}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
              <Link to={`/readBlog/${blog.id}`}><button>See more</button></Link>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </divv>

  );
}
export default Blog;