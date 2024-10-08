import "../assets/css/style.css"
import "../assets/css/bootstrap.css"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";


const URL = 'https://66e9e19287e41760944afe0c.mockapi.io/Product';

function Home() {

    const [products, setProducts] = useState([]);

    const getListProduct = async () => {
        const res = await axios.get(`${URL}`);
        if (res.status === 200) {
            setProducts(res.data);
        }
    }

    useEffect(() => {
        getListProduct();
    }, []);

    // Limit to the first three articles
    const limitedArticles = products.slice(0, 4);

    return (
        <div>
            <div className="card-deck text-center row mt-5">
                <h1>My Products</h1>
                {limitedArticles.map(product => (
                    <div className="col-sm-3 col-6 place-grid" key={product.id} >
                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    defaultValue={product.image}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" >
                                        {product.name}
                                    </Typography>
                                    {/* <Typography variant="body2" sx={{ color: 'text.secondary' }} >
                                        {product.content}
                                    </Typography> */}

                                    <Typography variant="body2" sx={{ color: 'text.secondary' }} >
                                        Price: {product.price}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Link to={`/productDetail/${product.id}`}><button>Buy</button></Link>
                            </CardActions>
                        </Card>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Home