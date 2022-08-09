import type { Request, Response } from "express";
import express from "express";
import studentRoutes from "./student.route";

const router = express.Router();

/**
 * GET status
 */
router.get('/status', (req: Request, res: Response) => res.send('OK'));

router.use('/students', studentRoutes);

export default router;
