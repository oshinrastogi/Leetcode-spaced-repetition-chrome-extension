import express from 'express'
import { addProblem } from '../controllers/problemController.js';

const router = express.Router();

// routes
//add-problem
router.post('/add-problem',addProblem);

export default router;

