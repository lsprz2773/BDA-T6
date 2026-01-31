import express, { Application } from 'express';

const app: Application = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando' });
});

export default app;
