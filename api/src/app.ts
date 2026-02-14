import express from 'express';
import dotenv from 'dotenv';
import viewsRoutes from './routes/views-routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use('/api/views', viewsRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});