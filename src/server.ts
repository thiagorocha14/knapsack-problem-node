import express from 'express';
import { knapsackRoutes } from './routes/knapsack';

const app = express();

app.use(express.json());
app.use('/api', knapsackRoutes);

app.listen(8080, () => 'server running on port 8080');