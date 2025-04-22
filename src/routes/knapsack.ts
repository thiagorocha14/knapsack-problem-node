import express, { Request, Response, Router } from 'express';
const router = Router();
import KnapsackService from '../services/knapsack_service';
import SolveKnapsackController from '../controllers/solve_knapsack_controller';

const knapsackService = new KnapsackService();
const solveKnapsackController = new SolveKnapsackController(knapsackService);

router.post('/solve', async (req: Request, res: Response) => {
    await solveKnapsackController.solve(req, res);
});

export { router as knapsackRoutes };