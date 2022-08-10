import type { Request, Response } from "express";
import express from "express";
import groupRoutes from "./group.route";
import studentRoutes from "./student.route";

const router = express.Router();

// Health check
router.get('/status', (req: Request, res: Response) => res.send('OK'));

router.use('/groups', groupRoutes);
router.use('/students', studentRoutes);

export default router;
