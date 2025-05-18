import express from 'express';
import cors from 'cors';
import { knapsackRoutes } from './routes/knapsack';

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
}

app.use(express.json());
app.use(cors(corsOptions));

app.use('/api', knapsackRoutes);

app.listen(8080, () => 'server running on port 8080');