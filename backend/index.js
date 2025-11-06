import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDb } from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

const __dirname = path.resolve();

app.use('/api/products', productRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'frontend/dist')));
}


app.listen(PORT, () => {
    connectDb();
    console.log("Server is running on port http://localhost:" + PORT);
});

