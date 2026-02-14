import express from 'express';
import viewsRoutes from './routes/views-routes';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', viewsRoutes);

const PORT = process.env.API_PORT;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});