const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const cors = require('cors');
const { verifyTokenMiddleware } = require('./middleware/authMiddleware');

const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/homeRoutes');
const koiRoutes = require('./routes/koiRoutes');
const koiGrowthRoutes = require('./routes/koiGrowthRoutes');
const pondRoutes = require('./routes/pondRoutes');
const productRoutes = require('./routes/productRoutes');
const waterValueRoutes = require('./routes/waterValueRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const newsBlogRoutes = require('./routes/newsBlogRoutes');
const waterParamRoutes = require('./routes/waterParamRoutes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./koi_swagger.yaml');
const dashboardRoutes = require('./routes/dashboardRoutes');
const db = require("./config/db");

dotenv.config({ path: './.env' });
const app = express();

app.use(cors());

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use('/auth', authRoutes); 
app.use('/', homeRoutes); 
app.use('/koi', verifyTokenMiddleware, koiRoutes); 
app.use('/koiGrowth', verifyTokenMiddleware, koiGrowthRoutes); 
app.use('/pond', verifyTokenMiddleware, pondRoutes); 
app.use('/product', verifyTokenMiddleware, productRoutes); 
app.use('/waterValue', verifyTokenMiddleware, waterValueRoutes); 
app.use('/cart', verifyTokenMiddleware, cartRoutes); 
app.use('/order', verifyTokenMiddleware, orderRoutes); 
app.use('/newsBlog', verifyTokenMiddleware, newsBlogRoutes); 
app.use('/dashboard', verifyTokenMiddleware, dashboardRoutes); 
app.use('/waterParam', verifyTokenMiddleware, waterParamRoutes);
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("MYSQL Connected")
    }
});

const port = process.env.PORT||80

app.listen(port, () => {
    console.log("Server started on Port: ", port);
});